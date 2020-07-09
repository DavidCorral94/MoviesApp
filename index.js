const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const usersService = require('./routes/users-service');
const jwt = require('jsonwebtoken');
require('./auth.js');


app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

const moviesService = require('./routes/movies-service');
const movies = require('./routes/movies');

const moviesServiceSQL = require('./routes/movies-service-sql');
const moviesSQL = require('./routes/movies-sql');

app.use('/movies', passport.authenticate('jwt', { session: false }), movies);
app.use('/moviesSQL', passport.authenticate('jwt', { session: false }), moviesSQL);

app.use('/', express.static(path.join(__dirname + '/public')));

app.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});

app.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                const error = new Error('An Error occurred')
                return next(error);
            } else if (!user) {
                return res.json(info);
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the email and id
                const body = { _id: user._id, email: user.email };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({ user: body }, 'top_secret');
                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

app.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    //We'll just send back the user details and the token
    res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
    })
});

const server = http.createServer(app);
const io = require('socket.io')(server);
app.io = io;

io.on('connection', (socket) => {
  console.log('a user connected');
});

usersService.connectDb((err) => {
    if (err) {
        console.log('Could not connect with MongoDB – usersService', err);
        process.exit(1);
    }

    moviesService.connectDb((err) => {
        if (err) {
            console.log('Could not connect with MongoDB – moviesService', err);
            process.exit(1);
        }

        /*moviesServiceSQL.connectDb((err) => {
            if (err) {
                console.log('Could not connect with MySQL - moviesServiceSQL', err);
                process.exit(1);
            }*/

        server.listen(PORT, () => {
            console.log('Server up and running on localhost:' + PORT);
        });
        //});
    });
});