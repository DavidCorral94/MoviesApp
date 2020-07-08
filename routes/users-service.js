'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectID;
const Users = function() {};

Movies.prototype.connectDb = function(callback) {
    MongoClient.connect("mongodb+srv://test:test123@ief-2020-dcp.58msp.mongodb.net/MoviesApp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
        function(err, database) {
            if (err) {
                callback(err);
            }

            db = database.db('MoviesApp').collection('users');

            callback(err, database);
        });
};
