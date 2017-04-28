(function () {
    angular
        .module('schoolap', ['ngRoute', 'ngSanitize', 'uiGmapgoogle-maps'])
        .constant('appConfig', {
            APIENDPOINT: 'http://localhost/schoolap/trunk/server/request.php',
            GMAPAPIKEY: 'AIzaSyByW3u9ykUCK8W4s8rbRwLDVuh6XBoQVEM',
            version: 'v0.0.0.1'
    });
})();