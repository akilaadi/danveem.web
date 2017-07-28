var app = angular.module('DanveemModule', ['ngAnimate','ngRoute','ngSanitize']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/app/pages/home.html",
        controller: 'homeController'
    })   
    .when("/editBoard/:id", {
        templateUrl : "/app/pages/editBoard.html",
        controller: 'editBoardController'
    })
    .when("/viewBoard/:id", {
        templateUrl : "/app/pages/viewBoard.html",
        controller: 'viewBoardController'
    })    
    .otherwise({
        redirectTo: '/'
    });
});