const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
//https://pastebin.com/r1wT3LKv
const moviesService = require('./routes/movies-service');
const movies = require('./routes/movies');

const moviesServiceSQL = require('./routes/movies-service-sql');
const moviesSQL = require('./routes/movies-sql');

app.use('/movies', movies);
app.use('/moviesSQL', moviesSQL);

app.use('/', express.static(path.join(__dirname + '/public')));

const server = http.createServer(app);

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