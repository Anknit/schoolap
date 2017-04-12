(function () {
    angular
        .module('schoolap')
        .service('appLogService', appLogService)
        .service('schoolListService', schoolListService)
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
    
//  Service for application error and event logging
    appLogService.$inject = ['$log'];
    function appLogService ($log) {
        this.logerror = function (error, data) {
            $log.error(error);
        }
    }
    
})();