angular.module('main')
    .controller('MainController', ['$scope', 'signalRSvc', '$rootScope', function($scope, signalRSvc, $rootScope) {

        $scope.text = "";
        $scope.data = [];

        $scope.greetAll = function() {
            signalRSvc.sendRequest();
        }

        updateGreetingMessage = function(text) {
            $scope.text = text;
            $scope.data.push(text + " arraylength:"+ $scope.data.length);
        }

        signalRSvc.initialize(updateGreetingMessage);
    }]);