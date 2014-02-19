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
    var apikey = "6k6y8je0z1ns6zcgrvbp8klm9dkzp86v";
    
    service.getMd5Hash = function (action, params) {
        var secret = "ohswkldq7p9rxd5evkxorz5pw31siyeq";
        return CryptoJS.MD5(secret + "accesspublicaction" + action + "apiKey" + apikey + "formatjsonresponseParams" + params);
    };

    service.getDocumentArrayList = function (action, params, signature, callback) {
        var url = "http://api.issuu.com/1_0?action=" + action + "&apiKey=" + apikey + "&access=public&responseParams=" + encodeURIComponent(params) + "&format=json&signature=" + signature;
        $http.get(url, { cache: true }).success(callback);
    };
    
    service.getEmbedDocumentArrayList = function (action, params, signature, callback) {
        var url = "http://api.issuu.com/1_0?action=" + action + "&apiKey=" + apikey + "&access=public&responseParams=" + encodeURIComponent(params) + "&format=json&signature=" + signature;
        $http.get(url, { cache: true }).success(callback);
    };

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