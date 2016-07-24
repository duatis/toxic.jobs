/**
 * Created by duatis on 21/07/16.
 */
var myApp = angular.module('toxicJobs',[]);myApp.controller('IndexController', ['$scope','$http', function($scope, $http) {
    $scope.greeting = 'Hola!';
    $http.get('/api/companies').then(function(data){
        $scope.companies = data.data;
    });

    $scope.getCompany = function(URID)
    {
        $http.get('/api/company/'+URID).then(function(data){
            $scope.company = data.data;
            $http.get('/api/company/'+URID+'/comments').then(function(data){
                $scope.company.comments = data.data;
            });
        });
    }

}]);