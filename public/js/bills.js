var app = angular.module('I2E');

app.controller('BillsCtrl', function($scope, $http, $uibModal) {
    var bills = this;

    bills.showCreateForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/bills/template/create',
            controller: 'CreateBillCtrl',
            controllerAs: 'cbill'
        });
    }
})


app.controller('CreateBillCtrl', function($scope, $uibModalInstance, $http, $window) {
    var cbill = this;

    cbill.submitCreate = function() {
        var createBillObj = Object.keys(cbill.createBillData).reduce(function(a,k){a.push(k+'='+encodeURIComponent(cbill.createBillData[k]));return a},[]).join('&')
        $http({
            url: '/bills/create/',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: createBillObj
        }).success(function(response) {
            $window.location.reload();
        })
    }

    cbill.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})