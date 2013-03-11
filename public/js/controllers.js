'use strict'


function eventList($scope, $http) {

    $scope.getEventInfo = function() {

            $scope.newEvent = {
                start_date: $scope.newEvent.start_date,
                end_date: $scope.newEvent.end_date,
                headline: $scope.newEvent.headline,
                event_body: $scope.newEvent.text,
                media: $scope.newEvent.media,
                credit: $scope.newEvent.credit

            }
            $http.post('/newevent', $scope.newEvent).success(function(data) {

            })
    }
    $scope.test = function () {
        console.log("working")
    }
}


