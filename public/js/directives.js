var app = angular.module('parliament2015.directives', [])

app.directive('slidetitle', function() {
    return {
        restrict: "A",
        link: function(scope, element) {
            setTimeout(function() {
                element.slideDown(1000)
                ,200
            })
        }
    }
})