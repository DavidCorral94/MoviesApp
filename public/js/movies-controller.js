angular.module("MoviesApp").controller("MoviesController", function($scope, $http) {

    $scope.movieId = "";
    $scope.movie;
    $scope.movies = [];

    $scope.setToken = function() {
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.token;
    };

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
                    $scope.newMovie = response.data[0];
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
                    refresh();
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
                    //alert('Movie has been removed!')
                    refresh();
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

    $scope.loadMovieInForm = function() {
        console.log('Loading movie in form by id: ', $scope.movieId);
        if ($scope.movieId != "") {
            $http.get("/movies/" + $scope.movieId)
                .then(function(response) {
                    console.log('Movie retrieved', response.data);
                    $scope.newMovie = response.data[0];
                }, function(error) {
                    console.log('Error retrieving the movie', error);
                    alert("Ups! Something went wrong when recovering the movie");
                });
        }
    }

    $scope.updateMovie = function() {
        $http.put("/movies/" + $scope.newMovie._id, $scope.newMovie)
            .then(function(response) {
                console.log('Movie updated', response);
                $scope.newMovie = {};
                alert('Movie has been updated!');
            }, function(error) {
                console.log('Error updating movie', error);
                alert("Ups! Something went wrong when updating the movie");
            });
    }

    $scope.registerUser = function() {
        if ($scope.email != undefined && $scope.password != undefined) {
            $http.post("/signup", { email: $scope.email, password: $scope.password })
                .then(function(response) {
                    console.log('User added', response);
                    alert('User registered!');
                }, function(error) {
                    console.log('Error adding user', error);
                    alert("Ups! Something went wrong when creating the user");
                });
        } else {
            alert('All fields have to be completed!');
        }
    }

    $scope.loginUser = function() {
        if ($scope.email != undefined && $scope.password != undefined) {
            $http.post("/login", { email: $scope.email, password: $scope.password })
                .then(function(response) {
                    console.log('User logged', response);
                    $scope.token = response.data.token;
                    alert('User logged and token loaded in input!');
                }, function(error) {
                    console.log('Error adding movie', error);
                    alert("Ups! Something went wrong when loging the user");
                });
        } else {
            alert('All fields have to be completed!');
        }
    }

    function refresh() {
        $scope.loadMovies();
    }

});