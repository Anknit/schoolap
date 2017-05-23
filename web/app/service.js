(function () {
    angular
        .module('schoolap')
        .service('appLogService', appLogService)
        .service('alertService', alertService)
        .service('userAuthService', userAuthService)
        .service('schoolListService', schoolListService)
        .service('stateListService', stateListService)
        .service('compareSchoolService', compareSchoolService)
        .service('geoLocationService', geoLocationService)
        .service('ratingService', ratingService)
        .service('localStorageService', localStorageService)
        .service('articleListService', articleListService);

//  Service for list of schools
    schoolListService.$inject = ['$http', 'appConfig', 'appLogService', 'localStorageService'];
    function schoolListService ($http, appConfig, appLogService, localStorageService) {
        this.getSchoolListByType = getSchoolByType;
        this.getSchoolBySlug = getSchoolBySlug;
        this.getSchoolsByCategory = getSchoolsByCategory;
  
        function getSchoolByType(type, count, start) {
            var requestUri = appConfig.APIENDPOINT + '?request=school_list&type=' + type;
            if( typeof(count) !== "undefined" && count) {
                requestUri += '&count=' + count;
            }
            if( typeof(start) !== "undefined" && start) {
                requestUri += '&start=' + start;
            }
            var userLoc = localStorageService.getData('userLocation', true);
            if(userLoc.status) {
                requestUri += '&lat=' + userLoc.data.lat;
                requestUri += '&long=' + userLoc.data.long;
            }
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, error.data);
            });
        }

        function getSchoolBySlug(slug) {
            var requestUri = appConfig.APIENDPOINT + '?request=school_data&slug=' + slug;
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, error.data);
            });
        }
        
        function getSchoolsByCategory(catSlug, start){
            var requestUri = appConfig.APIENDPOINT + '?request=school_list&type=category&category=' + catSlug;
            if( typeof(start) !== "undefined" && start) {
                requestUri += '&start=' + start;
            }
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, error.data);
            });
        }
    }
    
//  Service for list of states    
    stateListService.$inject = ['$http', 'appConfig', 'appLogService'];
    function stateListService ($http, appConfig, appLogService) {
        this.getStateList = getStateList;
        this.list = [];
        function getStateList() {
            if(this.list.length == 0) {
                var requestUri = appConfig.APIENDPOINT + '?request=state_list';
                return $http.get(requestUri, {}).then(function (response){
                    if(response.data.status) {
                        this.list = response.data;
                        return response.data;
                    }
                }, function(error){
                    appLogService.logerror(error, error.data);
                });
            } else {
                return this.list;
            }
        }
        
    }
    
//  Service for list of articles
    articleListService.$inject = ['$http', 'appConfig', 'appLogService'];
    function articleListService ($http, appConfig, appLogService) {
        this.getFeaturedArticles = getFeaturedArticles;
        this.getArticleById = getArticleById;
            
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

        function getArticleById(id, slug) {
            var requestUri = appConfig.APIENDPOINT + '?request=article_data&id=' + id + '&slug=' + slug;
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                }
            }, function(error){
                appLogService.logerror(error, error.data);
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
            return $http.post(appConfig.APIENDPOINT + '?request=user_login', data, {}).then(function (response){
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
            return $http.post(appConfig.APIENDPOINT + '?request=user_register', data, {}).then(function (response){
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
            return $http.post(appConfig.APIENDPOINT + '?request=user_forgot_password', data, {}).then(function (response){
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
    
//  Service for handling location of user
    geoLocationService.$inject = ['$window', 'appLogService', 'appConfig', '$http'];
    function geoLocationService ($window, appLogService, appConfig, $http) {
        var self = this;
        self.getLocationDetail = getLocationDetail;
        self.getLocation = getLocation;

        function getLocation (success, error) {
            var options = {maximumAge:60000, timeout:5000, enableHighAccuracy:true};
            if ($window.navigator.geolocation) {
                $window.navigator.geolocation.getCurrentPosition(success, error, options);
            } else {
                appLogService.logerror("Geolocation is not supported by this browser.");
                alertService.alert("Geolocation is not supported by this browser.");
            }
        }

        function getLocationDetail(coords){
            var endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?';
            if(coords.lat != '' && coords.long) {
                endpoint += 'latlng=' + coords.lat + ',' + coords.long;
            } else {
                return false;
            }
            if(appConfig.GMAPAPIKEY && appConfig.GMAPAPIKEY != '') {
                endpoint += '&key' + appConfig.GMAPAPIKEY;
            } else {
                return false;
            }
            $http.get(endpoint, {}).then(function(response) {
                appLogService.logerror(response);
            }, function(error) {
                appLogService.logerror(error);
            });
        }
    };
    
//  Service for rating and review
    ratingService.$inject = ['$http', 'appConfig', 'appLogService']
    function ratingService ($http, appConfig, appLogService) {
        var self = this;
        self.rateSchool = rateSchool;
        
        function rateSchool (schoolId, rateVal) {
            var requestUri = appConfig.APIENDPOINT + '?request=rate_school';
            if(schoolId && schoolId != '' && rateVal && rateVal != '') {
                requestUri += '&id=' + schoolId + '&val=' + rateVal;
            }
            return $http.get(requestUri, {}).then(function (response){
                if(response.data.status) {
                    return response.data;
                } else{
                    appLogService.logerror(response.data);
                }
            }, function (error){
                appLogService.logerror(error);
            })
        }
    }
    
//  Service for alerts and prompts in application
    alertService.$inject = ['$window'];
    function alertService ($window) {
        this.alert = function (msg) {
            $window.alert(msg);
        }
    }
    
    localStorageService.$inject = ['$window'];
    function localStorageService ($window) {
        var self = this;
        self.getData = function(key, isJSON) {
            var response, localData = $window.localStorage.getItem(key);
            if(typeof (localData) != "undefined" && localData != '' && localData != null) {
                if(isJSON) {
                    localData = angular.fromJson(localData);
                }
                response = {status: true, data: localData};
            } else {
                response = {status: false};
            }
            return response;
        };
        self.setData = function(key, data, isJSON) {
            if(isJSON) {
                data = angular.toJson(data);
            }
            $window.localStorage.setItem(key, data);
        }
    }
})();