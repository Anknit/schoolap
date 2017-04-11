(function () {
    angular
        .module('schoolap')
        .directive('mainNav', mainNav)
        .directive('inlineSchoolsList', inlineSchoolsList)
        .directive('featuredSchools', featuredSchools)
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
    
    function inlineSchoolsList () {
        var DDO = {
            restrict: 'E',
            scope:true,
            templateUrl: 'template/directives/inline-school-list.html',
            link: function (scope, elem, attr) {
                scope.list = {
                    label: attr.label    
                };
            }
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

    function featuredArticles () {
        var DDO = {
            restrict: 'E',
            templateUrl: 'template/directives/featured-articles.html'
        };
        return DDO;
    }

})();