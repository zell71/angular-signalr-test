angular.module('main')
    .controller('MainController', ['$scope', 'IssuuService', function ($scope, issuuService) {
        var action = "issuu.documents.list";
        var responseParams = "name,documentId,title,description";
        
        $scope.signature = issuuService.getMd5Hash(action, responseParams);
        
        issuuService.getDocumentArrayList(action, responseParams, $scope.signature, function (data) {
            $scope.data = data.rsp._content.result._content;
        });


        console.log($scope.signature);
        
    }])
    .directive("publication", function() {
        return {
            replace: true,
            templateUrl: '../../Views/Temmplates/publication.html'            
        };
    });