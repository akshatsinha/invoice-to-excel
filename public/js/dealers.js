var app = angular.module('I2E');

app.controller('DealerCtrl', function($scope, $http, $uibModal) {
    var dlr = this;

    dlr.showCreateForm = function() {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/dealers/template/create',
            controller: 'CreateDealercctCtrl',
            controllerAs: 'cdlr'
        });
    }

    dlr.editDealer = function(id) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/dealers/template/edit',
            controller: 'EditDealerCtrl',
            controllerAs: 'edlr',
            resolve: {
                id: function() {
                    return id
                }
            }
        });
    }

    dlr.deleteDealer = function(id) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/dealers/template/delete',
            controller: 'DeleteDealerCtrl',
            controllerAs: 'ddlr',
            resolve: {
                id: function() {
                    return id
                }
            }
        });
    }
})



app.controller('CreateDealercctCtrl', function($scope, $uibModalInstance, $http, $window) {
    var cdlr = this;

    cdlr.submitCreate = function() {
        var createDealerObj = Object.keys(cdlr.createDealerData).reduce(function(a,k){a.push(k+'='+encodeURIComponent(cdlr.createDealerData[k]));return a},[]).join('&')
        $http({
            url: '/dealers/create/',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: createDealerObj
        }).success(function(response) {
            $window.location.reload();
        })
    }

    cdlr.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})



app.controller('DeleteDealerCtrl', function($scope, $uibModalInstance, $http, $window, id) {
    var ddlr = this;
    $http.get('/dealers/get/' + id)
    .then(function(response) {
        ddlr.dname = response.data.dname
    })

    ddlr.delete = function() {
        $http.get('/dealers/delete/' + id)
        .then(function(response) {
            $window.location.reload();
        })
    }

    ddlr.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
})



app.controller('EditDealerCtrl', function($scope, $uibModalInstance, $http, $window, id) {
    var edlr = this;
    $http.get('/dealers/edit/' + id)
    .then(function(response) {
        edlr.editDealerData = response.data;
    })

    edlr.submitEdit = function() {
        var editDealerData = Object.keys(edlr.editDealerData).reduce(function(a,k){a.push(k+'='+encodeURIComponent(edlr.editDealerData[k]));return a},[]).join('&')
        $http({
            url: '/dealers/edit/' + id,
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: editDealerData
        }).success(function(response) {
            $window.location.reload();
        })
    }

    edlr.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

})