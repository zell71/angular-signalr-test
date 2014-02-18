angular.module('main')
    .controller('AboutController', ['$scope', 'TestService', function ($scope, testService) {
        $scope.callTestService = testService.doWork();
    }]);