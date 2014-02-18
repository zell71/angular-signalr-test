// Define you service here. Services can be added to same module as 'main' or a seperate module can be created.

var angularStartServices = angular.module('angularStart.services', ['ngResource']);     //Define the services module

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