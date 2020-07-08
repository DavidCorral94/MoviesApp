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
});