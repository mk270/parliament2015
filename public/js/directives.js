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



app.directive('timeline', function($http) {
    var controller = function($scope) {
        $http.get('/events').success(function(data) {
            console.log(data)
            $scope.events = data
        })
    }

    var linker = function(scope) {
        setTimeout(function() {
            createStoryJS({
                type:   'timeline',
                width:  '100%',
                height: '640',
                source: scope.events,
                embed_id:   'my-timeline',
                font: 'Arvo-PTSans'
            })
        }, 500)
    }

    return {
        restrict: "E",
        controller: controller,
        link: linker

    }
})
