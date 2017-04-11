(function () {
    angular
        .module('schoolap')
        .config(config);

    config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];

    function config($routeProvider, $locationProvider, $httpProvider) {


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
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
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
