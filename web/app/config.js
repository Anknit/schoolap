(function () {
    angular
        .module('schoolap')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', 'uiGmapGoogleMapApiProvider'];

    function config($routeProvider, $locationProvider, $httpProvider, uiGmapGoogleMapApiProvider) {


        // routes
        $routeProvider
            .when('/', {
                templateUrl: 'template/views/home.html',
                controller: 'homeController',
                controllerAs: 'home'
            })
            .when('/compare', {
                templateUrl: 'template/views/compare.html',
                controller: 'compareController',
                controllerAs: 'compare'
            })
            .when('/discover', {
                templateUrl: 'template/views/discover.html',
                controller: 'discoverController',
                controllerAs: 'discover'
            })
            .when('/about', {
                templateUrl: 'template/views/about.html',
                controller: 'aboutController',
                controllerAs: 'about'
            })
            .when('/browse/:browseType', {
                templateUrl: 'template/views/browse.html',
                controller: 'browseController',
                controllerAs: 'browse'
            })
            .when('/school/:id/:slug', {
                templateUrl: 'template/views/schoolHome.html',
                controller: 'schoolHomeController',
                controllerAs: 'schoolHome'
            })
            .when('/article/:id/:slug', {
                templateUrl: 'template/views/articleHome.html',
                controller: 'articleHomeController',
                controllerAs: 'articleHome'
            })
            .when('/schools/:filterType/:filterValue', {
                templateUrl: 'template/views/schoolList.html',
                controller: 'schoolListController',
                controllerAs: 'schoolList'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
        
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyByW3u9ykUCK8W4s8rbRwLDVuh6XBoQVEM',
            v: '3.26', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    }

    angular
        .module('schoolap')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location'];

    function authInterceptor($rootScope, $q, $location) {

        return {

            // intercept every request
            request: function (config) {
                config.headers = config.headers || {};
                return config;
            },

            // Catch 404 errors
            responseError: function (response) {
                if (response.status === 404) {
                    $location.path('/');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }


    /**
     * Run block
     */
    angular
        .module('schoolap')
        .run(run);

    run.$inject = ['$rootScope', '$location'];

    function run($rootScope, $location) {

        // put here everything that you need to run on page load

    }


})()
