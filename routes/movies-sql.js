'use strict';

const express = require('express');
const router = express.Router();
const moviesService = require('./movies-service-sql.js');

router.get('/:id', function(req, res) {
    let id = req.params.id;

    moviesService.get(id, (err, movie) => {
        if (err || movie == null)
            res.status(500).send({ msg: err });
        else if (movie != null)
            res.status(200).send(movie);
    });
});

router.get('/', function(req, res) {
    moviesService.getAll((err, movies) => {
        if (err || movies == null)
            res.status(500).send({
                msg: err
            });
        else
            res.status(200).send(movies);
    });
});

router.post('/', function(req, res) {
    let movie = req.body;

    moviesService.add(movie, (err, movie) => {
        if (err || movie == null)
            res.status(500).send({
                msg: err
            });
        else
            res.status(202).send({
                msg: 'Movie created!'
            });
    });
});

router.put('/:id', function(req, res) {
    let id = req.params.id;
    let updatedMovie = req.body;

    moviesService.update(id, updatedMovie, (err, movie) => {
        if (err || movie == null)
            res.status(500).send({
                msg: err
            });
        else
            res.status(200).send({
                msg: 'Movie updated!'
            });
    });
});

router.delete('/:id', function(req, res) {
    let id = req.params.id;

    moviesService.delete(id, (err, movie) => {
        if (err)
            res.status(500).send({
                msg: err
            });
        else if (movie != null)
            res.status(200).send({
                msg: 'Movie deleted!'
            });
    });
});

router.delete('/', function(req, res) {
    moviesService.deleteAll((err, movies) => {
        if (err || movies == null)
            res.status(500).send({
                msg: err
            });
        else
            res.status(200).send({
                msg: 'Movie deleted!'
            });
    });
});

module.exports = router;