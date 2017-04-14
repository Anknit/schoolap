(function () {
    angular
        .module('schoolap')
        .service('appLogService', appLogService)
        .service('alertService', alertService)
        .service('userAuthService', userAuthService)
        .service('schoolListService', schoolListService)
        .service('compareSchoolService', compareSchoolService)
        .service('articleListService', articleListService);

//  Service for list of schools
    schoolListService.$inject = ['$http', 'appConfig', 'appLogService'];
    function schoolListService ($http, appConfig, appLogService) {
        this.getSchoolListByType = getSchoolByType;
            
        function getSchoolByType(type, count, start) {
            var requestUri = appConfig.APIENDPOINT + '?request=school_list&type=' + type;
            if( typeof(count) !== "undefined" && count) {
                requestUri += '&count=' + count;
            }
            if( typeof(start) !== "undefined" && start) {
                requestUri += '&start=' + start;
            }
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, response.data);
            });
        }
    }
    
//  Service for list of articles
    articleListService.$inject = ['$http', 'appConfig', 'appLogService'];
    function articleListService ($http, appConfig, appLogService) {
        this.getFeaturedArticles = getFeaturedArticles;
            
        function getFeaturedArticles(count, start) {
            var requestUri = appConfig.APIENDPOINT + '?request=featured_articles';
            if( typeof(count) !== "undefined" && count) {
                requestUri += '&count=' + count;
            }
            if( typeof(start) !== "undefined" && start) {
                requestUri += '&start=' + start;
            }
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, response.data);
            });
        }
    }
    
//  Service for user authentication
    userAuthService.$inject = ['$http', 'appConfig', 'appLogService'];
    function userAuthService ($http, appConfig, appLogService) {
        this.loginUser = loginUser;
        this.registerUser = registerUser;
        this.forgotPasswd = forgotPasswd;
        
        function loginUser (credObj) {
            var data= {
                user: credObj.username,
                pswd: credObj.password
            };
            return $http.post(appConfig.APIENDPOINT + '?request=userLogin', data, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error);
            });
        }

        function registerUser (email) {
            var data= {
                username: email
            };
            return $http.post(appConfig.APIENDPOINT + '?request=userRegister', data, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error);
            });
        }

        function forgotPasswd (email) {
            var data= {
                username: email
            };
            return $http.post(appConfig.APIENDPOINT + '?request=forgotPassword', data, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error);
            });
        }
    }
    
//  Service for comparing schools
    compareSchoolService.$inject = ['$http', 'appConfig', 'appLogService'];
    function compareSchoolService ($http, appConfig, appLogService) {
        this.getStateList = getStateList;
        this.getCityList = getCityList;
        this.getAreaList = getAreaList;
        this.getSchoolList = getSchoolList;
        this.compareSchools = compareSchools;
            
        function getStateList () {
            var requestUri = appConfig.APIENDPOINT + '?request=school_state_list';
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, response.data);
            });
        }
        function getCityList (stateId) {
            var requestUri = appConfig.APIENDPOINT + '?request=state_city_list';
            if(typeof(stateId) !== "undefined" && stateId) {
                requestUri += '&stateId=' + stateId;
            }
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, response.data);
            });
        }
        function getAreaList (cityId) {
            var requestUri = appConfig.APIENDPOINT + '?request=city_area_list';
            if(typeof(cityId) !== "undefined" && cityId) {
                requestUri += '&cityId=' + cityId;
            }
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, response.data);
            });
        }
        function getSchoolList (areaId) {
            var requestUri = appConfig.APIENDPOINT + '?request=area_school_list';
            if(typeof(areaId) !== "undefined" && areaId) {
                requestUri += '&areaId=' + areaId;
            }
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, response.data);
            });
        }
        function compareSchools(schoolIdArray) {
            var requestUri = appConfig.APIENDPOINT + '?request=compare_schools';
            var data = {
                data: schoolIdArray
            }
            return $http.post(requestUri, data, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, response.data);
            });
        }
    }
    
//  Service for application error and event logging
    appLogService.$inject = ['$log'];
    function appLogService ($log) {
        this.logerror = function (error, data) {
            $log.error(error);
        }
    }
    
//  Service for alerts and prompts in application
    alertService.$inject = ['$window'];
    function alertService ($window) {
        this.alert = function (msg) {
            $window.alert(msg);
        }
    }
    
})();