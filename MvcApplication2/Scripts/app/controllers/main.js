angular.module('main')
    .controller('MainController', ['$scope', 'signalRSvc', '$rootScope', function($scope, signalRSvc, $rootScope) {

        $scope.text = "";
        $scope.data = [];
        var value = 0;
        $scope.test = "hello"
        $scope.greetAll = function () {
            if (value <= 20) {
                signalRSvc.sendRequest();
            } else {
                $scope.text = "Ding! Complete!"
            }
        }

        $scope.startTicker = function () {
            if (value <= 20) {
                signalRSvc.startTicker();
            } else {
                signalRSvc.stopTicker();
            }            
        }
        
        $scope.stopTicker = function () {
            signalRSvc.stopTicker();
        }

        updateGreetingMessage = function (text) {
            var type = "info";
            value = $scope.data.length;
            $scope.text = text;
            if (value < 5) {
                $scope.progresstext = "we are getting started!";
                type = "info";
            } else if (value < 10) {
                $scope.progresstext = "its warming up!";
                type = "warning";
            } else if (value < 20) {
                $scope.progresstext = "now were cooking!";
                type = "danger";
            } else if (value == 20) {
                $scope.progresstext = "put a fork in me, i'm done!!";
                type = "success";
            }
            if (value <= 20) {
                $scope.dynamic = $scope.data.length;
                $scope.value = value;
                $scope.type = type;
                $scope.data.push(text + " arraylength:" + $scope.data.length);
            } else {
                signalRSvc.stopTicker();
            }
        }

        signalRSvc.initialize(updateGreetingMessage);
    }]);