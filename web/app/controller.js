(function () {
    angular
        .module('schoolap')
        .controller('homeController', homeController)
        .controller('compareController', compareController)
        .controller('discoverController', discoverController)
        .controller('aboutController', aboutController);
    
/*
    compareController.$inject = ['$http'];
*/

    function homeController () {
        var self = this;
    }
    
    function compareController () {
        var self =this;
    }

    function discoverController () {
        var self = this;
    }
    
    function aboutController () {
        var self =this;
    }
})();