const passport = require('passport');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
const usersService = require('./routes/users-service');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        let user = { email: email, password: password };
        await usersService.add(user);
        return done(null, user);
    } catch (error) {
        done(error);
    }
}));