(function () {
    angular
        .module('schoolap')
        .controller('homeController', homecontroller);
    
    homecontroller.$inject = ['$http'];
    
    function homecontroller ($http) {
        var self = this;
    }
})();