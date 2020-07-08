'use strict';

const MySQL = require('mysql');
let db;
const Movies = function() {};

Movies.prototype.connectDb = function(callback) {
    db = MySQL.createConnection({ host: "localhost", user: "testSQL", password: "testSQL", database: "ief2020" });

    db.connect(function(err) {
        callback(err);

        db.query("CREATE TABLE IF NOT EXISTS movies (id INT(11) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), director VARCHAR(255), age INT(11), category VARCHAR (255))",
            function(err, result) {
                if (err)
                    throw err;
                console.log("Table created (if not existed)");
            });
    });
};

Movies.prototype.getAll = function(callback) {
    db.query("SELECT * FROM movies", function(err, result, fields) {
        if (err)
            callback(err, null);
        else
            callback(false, result);
    });
};

Movies.prototype.get = function(id, callback) {
    db.query("SELECT * FROM movies WHERE id = " + MySQL.escape(id), function(err, result, fields) {
        if (err)
            callback(err, null);
        else
            callback(false, result);
    });
};

Movies.prototype.getTitle = function(title, callback) {
    db.query("SELECT * FROM movies WHERE title LIKE '" + MySQL.escape(title) + "'", function(err, result, fields) {
        if (err)
            callback(err, null);
        else
            callback(false, result);
    });
};

Movies.prototype.add = function(movie, callback) {
    db.query("INSERT INTO movies (title, director, age, category) VALUES (?,?,?,?)", Object.values(movie), function(err, result, fields) {
        if (err)
            callback(err, null);
        else
            callback(false, result);
    });
};

Movies.prototype.update = function(id, updatedMovie, callback) {
    let values = Object.values(updatedMovie);
    values.push(id);
    db.query("UPDATE movies SET title = ?, director = ?, age = ?, category = ? WHERE id = ?", values, function(err, result, fields) {
        if (err)
            callback(err, null);
        else
            callback(false, result);
    });
};

Movies.prototype.delete = function(id, callback) {
    db.query("DELETE FROM movies WHERE id = " + MySQL.escape(id), function(err, result, fields) {
        if (err)
            callback(err, null);
        else
            callback(false, result);
    });
};

Movies.prototype.deleteAll = function(callback) {
    db.query("DELETE FROM movies", function(err, result, fields) {
        if (err)
            callback(err, null);
        else
            callback(false, result);
    });
};

module.exports = new Movies();