var app = angular.module('I2E');

app.controller('BAcctCtrl', function() {
    var bacct = this;
    bacct.showCreateBusinessForm = false;

    bacct.showCreateForm = function() {
        console.log('clicked');
        bacct.showCreateBusinessForm = true;
    }
})