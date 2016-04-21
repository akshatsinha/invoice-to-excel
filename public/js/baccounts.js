var app = angular.module('I2E');

app.controller('BAcctCtrl', function($http) {
    var bacct = this;
    bacct.showCreateBusinessForm = false;
    bacct.showEditAccount = false;

    bacct.showCreateForm = function() {
        console.log('clicked');
        bacct.showEditAccount = false;
        bacct.showCreateBusinessForm = true;
    }

    bacct.editBA = function(id) {
        bacct.showCreateBusinessForm = false;
        console.log(id)
        $http.get('/baccounts/edit/' + id)
        .then(function(response) {
            bacct.editAccountData = response.data
            console.log('== ', bacct.editAccountData);
            bacct.showEditAccount = true;
        })
    }
})