'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectID;
const Users = function() {};

Users.prototype.connectDb = function(callback) {
    MongoClient.connect("mongodb+srv://test:test123@ief-2020-dcp.58msp.mongodb.net/MoviesApp?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
        function(err, database) {
            if (err) {
                callback(err);
            }

            db = database.db('MoviesApp').collection('users');

            callback(err, database);
        });
};

Users.prototype.add = (user) => {
    return add(user);
};

async function add(user) {
    return db.insertOne(user);
}

Users.prototype.find = (user) => {
    return find(user);
};

async function find(user) {
    return new Promise((resolve, reject) => {
        db.find(user).toArray((err, data) => {
            err
                ?
                reject(err) :
                resolve(data);
        });
    });
}

module.exports = new Users();