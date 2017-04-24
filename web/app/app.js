(function () {
    angular
        .module('schoolap', ['ngRoute', 'ngSanitize'])
        .constant('appConfig', {
            APIENDPOINT: 'http://localhost/schoolap/trunk/server/request.php',
            version: 'v0.0.0.1'
    });
})();