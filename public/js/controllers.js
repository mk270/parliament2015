'use strict'


function eventList($scope, $http) {

    $scope.getEventInfo = function() {

            $scope.newEvent = {
                start_date: $scope.newEvent.start_date,
                end_date: $scope.newEvent.end_date,
                headline: $scope.newEvent.headline,
                event_body: $scope.newEvent.text,
                media: $scope.newEvent.media,
                credit: $scope.newEvent.credit,
                userid: $scope.user.username,
                photo: $scope.user.screen_name


            }
            $http.post('/newevent', $scope.newEvent).success(function(data) {

            })


    }
    $scope.test = function () {
        console.log("working")
    }
    $scope.user = ''
    $http.get('/auth/twitter/user').success(function (data) {

        $scope.user = data;
        console.log($scope.user.screen_name)
    })
}


