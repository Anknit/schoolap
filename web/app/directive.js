(function () {
    angular
        .module('schoolap')
        .directive('mainNav', mainNav)
        .directive('inlineSchoolsList', inlineSchoolsList)
        .directive('schoolListItem', schoolListItem)
        .directive('featuredSchools', featuredSchools)
        .directive('siteFooter', siteFooter)
        .directive('authModal', authModal)
        .directive('locationButton', locationButton)
        .directive('pollsSection', pollsSection)
        .directive('featuredPrograms', featuredPrograms)
        .directive('eventsArea', eventsArea)
        .directive('featuredArticles', featuredArticles);

    function mainNav () {
        var DDO = {
            restrict: 'E',
            templateUrl: 'template/directives/main-nav.html'
        };
        return DDO;
    }
    
    inlineSchoolsList.$inject = ['schoolListService'];
    function inlineSchoolsList (schoolListService) {
        var DDO = {
            restrict: 'E',
            scope:true,
            templateUrl: 'template/directives/inline-school-list.html',
            link: function (scope, elem, attr) {
                scope.list = {
                    label: attr.label,
                    schoolData: []
                };
                schoolListService.getSchoolListByType(attr.type, 4, 0).then(function(response){
                    if(response.status) {
                        if(response.data) {
                            scope.list.schoolData = response.data;
                        }
                    }
                });
            }
        };
        return DDO;
    }

    function schoolListItem (){
        var DDO = {
            restrict: 'EA',
            templateUrl: 'template/directives/school-list-item.html'
        };
        return DDO;
    }
    
    function featuredSchools () {
        var DDO = {
            restrict: 'E',
            templateUrl: 'template/directives/featured-schools.html'
        };
        return DDO;
    }

    function siteFooter () {
        var DDO = {
            restrict: 'E',
            templateUrl: 'template/directives/site-footer.html'
        };
        return DDO;
    }
    
    authModal.$inject = ['userAuthService'];
    function authModal (userAuthService) {
        var DDO = {
            restrict: 'E',
            templateUrl: 'template/directives/auth-modal.html',
            link: function (scope, elem, attr) {
                scope.auth ={
                    type: 'login',
                    label: 'Login'
                };
                scope.login = {
                    username: '',
                    password: ''
                };
                scope.register = {
                    username: ''
                };
                scope.loginUser = function (loginObj) {
                    var data = {
                        username: loginObj.username,
                        password: loginObj.password
                    }
                    userAuthService.loginUser(data).then(function(response){
                        if(response.status) {
                            
                        } else {
                            
                        }
                    });
                };
                scope.registerUser = function (registerObj) {
                    userAuthService.registerUser(registerObj.username).then(function(response){
                        if(response.status) {
                            
                        } else {
                            
                        }
                    });
                };
                scope.forgotPassword = function (loginObj) {
                    userAuthService.forgotPasswd(loginObj.username).then(function(response){
                        if(response.status) {
                            
                        } else {
                            
                        }
                    });
                }
            }
        };
        return DDO;
    }
    
    locationButton.$inject = ['geoLocationService', 'localStorageService', '$rootScope'];
    function locationButton (geoLocationService, localStorageService) {
        var DDO = {
            restrict: 'AC',
            link: function (scope, elem, attr){
                elem.on('click', function(){
                    geoLocationService.getLocation(function (position) {
                        localStorageService.setData('userLocation', {lat:position.coords.latitude, long: position.coords.longitude}, true);
                        $rootScope.$broadcast('userLocationUpdated', position);
                    }, function(error) {
                        console.log(error);
                    });
                })
            }
        };
        return DDO;
    }
    
    function pollsSection () {
        var DDO = {
            restrict: 'E',
            templateUrl: 'template/directives/polls-section.html'
        };
        return DDO;
    }

    function featuredPrograms () {
        var DDO = {
            restrict: 'E',
            templateUrl: 'template/directives/featured-programs.html'
        };
        return DDO;
    }

    function eventsArea () {
        var DDO = {
            restrict: 'E',
            templateUrl: 'template/directives/events-area.html'
        };
        return DDO;
    }

    featuredArticles.$inject = ['articleListService'];
    function featuredArticles (articleListService) {
        var DDO = {
            restrict: 'E',
            scope:true,
            templateUrl: 'template/directives/featured-articles.html',
            link: function (scope, elem, attr){
                articleListService.getFeaturedArticles(10 , 0).then(function(response){
                    if(response.status) {
                        if(response.data) {
                            scope.articles = response.data;
                        }
                    }
                });
            }
        };
        return DDO;
    }

})();