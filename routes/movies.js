'use strict';

const express = require('express');
const router = express.Router();
const moviesService = require('./movies-service');
const encryption = require('./encrypt.js');


/*********** /movies ***********/

router.get('/', function(req, res) {
    moviesService.getAll((err, movies) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else if (movies === null) {
            res.status(500).send({
                msg: "movies null"
            });
        } else {
            let result = [];
            movies.forEach(m => {
                let aux = encryption.decrypt(m.object);
                aux._id = m._id;
                result.push(aux)
            });
            res.status(200).send(result);
        }
    });
});

router.post('/', function(req, res) {
    let movie = req.body;
    let object = { object: encryption.encrypt(movie) };
    moviesService.add(object, (err, result) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else if (result !== null) {
            req.app.io.emit('newFilm', 'A new film has been added! Refresh them :)');
            res.status(201).send({
                msg: 'Film created!'
            });
        }
    });
});

router.delete('/', function(req, res) {
    moviesService.removeAll((err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Films deleted!'
            });
        }
    });
});

/*********** /movies/:_id ***********/

router.get('/:_id', function(req, res) {
    let _id = req.params._id;
    moviesService.get(_id, (err, movie) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else if (movie === null) {
            res.status(500).send({
                msg: "movies null"
            });
        } else {
            let result = [];
            movie.forEach(m => {
                let aux = encryption.decrypt(m.object);
                aux._id = m._id;
                result.push(aux)
            });
            res.status(200).send(result);
        }
    });
});

router.put('/:_id', function(req, res) {
    let _id = req.params._id;
    let updatedMovie = req.body;
    moviesService.update(_id, updatedMovie, (err, numUpdates) => {
        if (err || numUpdates === 0) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Film updated!'
            });
        }
    });
});

router.delete('/:_id', function(req, res) {
    let _id = req.params._id;
    moviesService.remove(_id, (err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Film deleted!'
            });
        }
    });
});

module.exports = router;