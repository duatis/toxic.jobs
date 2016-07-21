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
/*
var companyData = function(urid)
{
    $.get('api/company/' + urid, function(data){
        $('#data').text( JSON.stringify(data));
        $.get('api/company/' + urid + '/comments', function(data){
            $('#data').append( JSON.stringify(data));
        } );
    } );
}
$(function() {
    $.get('api/companies', function (data) {
        for (company in data) {
            (function (_urid) {
                $('#data').append($('<div>').html(data[company].name).on('click', function () {
                    companyData(_urid);
                }));
            })(data[company].URID);
        }
    });
});*/
