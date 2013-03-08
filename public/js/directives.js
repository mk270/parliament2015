var app = angular.module('parliament2015.directives', [])

app.controller('test', function ($scope) {
    $scope.test = function () {
        alert("Hey")
    }
})