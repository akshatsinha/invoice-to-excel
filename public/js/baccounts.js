var app = angular.module('I2E');

app.controller('BAcctCtrl', function($scope, $http, $uibModal) {
    var bacct = this;

    bacct.showCreateForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/baccounts/template/create',
            controller: 'CreateBAcctCtrl',
            controllerAs: 'cbacct'
        });
    }

    bacct.editBA = function(id) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/baccounts/template/edit',
            controller: 'EditBAcctCtrl',
            controllerAs: 'ebacct',
            resolve: {
                id: function() {
                    return id
                }
            }
        });
    }
})



app.controller('CreateBAcctCtrl', function($scope, $uibModalInstance, $http, $window) {
    var cbacct = this;

    cbacct.submitCreate = function() {
        var createAccountObj = Object.keys(cbacct.createAccountData).reduce(function(a,k){a.push(k+'='+encodeURIComponent(cbacct.createAccountData[k]));return a},[]).join('&')
        $http({
            url: '/baccounts/create/',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: createAccountObj
        }).success(function(response) {
            $window.location.reload();
        })
    }

    cbacct.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})



app.controller('EditBAcctCtrl', function($scope, $uibModalInstance, $http, $window, id) {
    var ebacct = this;
    $http.get('/baccounts/edit/' + id)
    .then(function(response) {
        ebacct.editAccountData = response.data;
    })

    ebacct.submitEdit = function() {
        console.log('submitted')
        var editAccountData = Object.keys(ebacct.editAccountData).reduce(function(a,k){a.push(k+'='+encodeURIComponent(ebacct.editAccountData[k]));return a},[]).join('&')
        $http({
            url: '/baccounts/edit/' + id,
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: editAccountData
        }).success(function(response) {
            $window.location.reload();
        })
    }

    ebacct.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

})