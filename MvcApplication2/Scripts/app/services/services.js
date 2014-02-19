// Define you service here. Services can be added to same module as 'main' or a seperate module can be created.

var angularStartServices = angular.module('angularStart.services', ['ngResource']);     //Define the services module
angularStartServices.value('$', $);
angularStartServices.factory('TestService', [function () {
    var service = {};
    service.doWork = function () {
        console.log('Did some work !');
    }
    return service;
}]);

angularStartServices.factory('IssuuService', ['$http', function ($http) {
    var service = {};

    return service;
}]);


angularStartServices.factory('signalRSvc', function ($, $rootScope) {
    return {
        proxy: null,
        initialize: function (acceptGreetCallback) {
            //Getting the connection object
            connection = $.hubConnection();
            //Creating proxy
            this.proxy = connection.createHubProxy('helloWorldHub');
            //Attaching a callback to handle acceptGreet client call
            this.proxy.on('acceptGreet', function (message) {
                $rootScope.$apply(function () {
                    acceptGreetCallback(message);
                });
            });
            
            this.proxy.on('acceptTicker', function (message) {
                $rootScope.$apply(function () {
                    acceptGreetCallback(message);
                });
            });
            
            this.proxy.on('tickerStopped', function (message) {
                $rootScope.$apply(function () {
                    acceptGreetCallback(message);
                });
            });
            
            //Starting connection
            connection.start();
        },
        sendRequest: function (callback) {
            //Invoking greetAll method defined in hub
            this.proxy.invoke('greetAll');
        },
        startTicker: function(callback) {
            this.proxy.invoke('startTicker');
        },
        stopTicker: function (callback) {
            this.proxy.invoke('stopTicker');
        }
    }
});