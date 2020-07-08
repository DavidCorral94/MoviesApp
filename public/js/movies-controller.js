angular.module("MoviesApp").controller("MoviesController", function($scope, $http) {

    $scope.movieId = "";
    $scope.movie;
    $scope.movies = [];

    $scope.loadMovies = function() {
        console.log('Loading all movies');
        $http.get("/movies")
            .then(function(response) {
                console.log('Movies retrieved', response.data);
                $scope.movies = response.data;
            }, function(error) {
                console.log('Error retrieving movies', error);
                alert("Ups! Something went wrong when recovering the movies");
            });
    }

    $scope.loadOneMovie = function() {
        console.log('Loading one movie by id: ', $scope.movieId);
        if ($scope.movieId != "") {
            $http.get("/movies/" + $scope.movieId)
                .then(function(response) {
                    console.log('Movie retrieved', response.data);
                    $scope.movie = response.data[0];
                }, function(error) {
                    console.log('Error retrieving movies', error);
                    alert("Ups! Something went wrong when recovering the movie");
                });
        }
    }

    $scope.newMovie = {};

    $scope.addMovie = function() {
        if ($scope.newMovie.title != undefined && $scope.newMovie.director != undefined && $scope.newMovie.year != undefined && $scope.newMovie.category != undefined) {
            $http.post("/movies", $scope.newMovie)
                .then(function(response) {
                    console.log('Movie added', response);
                    $scope.newMovie = {};
                    alert('Movie created!');
                }, function(error) {
                    console.log('Error adding movie', error);
                    alert("Ups! Something went wrong when creating the movie");
                });
        } else {
            alert('All fields have to be completed!');
        }
    }

    $scope.removeOneMovie = function() {
        console.log('Removing a movie by id: ', $scope.movieId);
        if ($scope.movieId != "") {
            $http.delete("/movies/" + $scope.movieId)
                .then(function(response) {
                    console.log('Movie removed', response.data);
                    alert('Movie has been removed!')
                }, function(error) {
                    console.log('Error removing the movie', error);
                    alert("Ups! Something went wrong when removing the movie");
                });
        }
    }

    $scope.removeAllMovies = function() {
        console.log('Removing all movies');
        $http.delete("/movies")
            .then(function(response) {
                console.log('Movies removed', response.data);
                alert('All movies have been removed!')
            }, function(error) {
                console.log('Error removing the movies', error);
                alert("Ups! Something went wrong when removing the movies");
            });
    }

});