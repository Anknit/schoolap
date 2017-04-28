(function () {
    angular
        .module('schoolap')
        .controller('homeController', homeController)
        .controller('compareController', compareController)
        .controller('discoverController', discoverController)
        .controller('browseController', browseController)
        .controller('schoolListController', schoolListController)
        .controller('schoolHomeController', schoolHomeController)
        .controller('articleHomeController', articleHomeController)
        .controller('aboutController', aboutController);

    function homeController() {
        var self = this;
    }

    compareController.$inject = ['compareSchoolService', 'alertService'];

    function compareController(compareSchoolService, alertService) {
        var self = this;
        self.states = [];
        self.cities = [];
        self.areas = [];
        self.schools = [];
        self.compareData = [];

        // Get List of states
        compareSchoolService.getStateList().then(function (response) {
            if (response.status) {
                if (response.data) {
                    self.states = response.data;
                }
            }
        });

        // Get List of cities on state change
        self.getStateCities = function () {
            compareSchoolService.getCityList(self.state.id).then(function (response) {
                if (response.status) {
                    if (response.data) {
                        self.cities = response.data;
                    }
                }
            });
        };

        // Get List of areas on city change
        self.getCityAreas = function () {
            compareSchoolService.getAreaList(self.city.id).then(function (response) {
                if (response.status) {
                    if (response.data) {
                        self.areas = response.data;
                    }
                }
            });
        };

        // Get List of schools on area change
        self.getAreaSchools = function () {
            compareSchoolService.getSchoolList(self.area.id).then(function (response) {
                if (response.status) {
                    if (response.data) {
                        self.schools = response.data;
                    }
                }
            });
        };

        // Get comparison result of schools
        self.compareSchools = function () {
            var schoolIdArr = [];
            if (self.school1.id) {
                schoolIdArr.push(self.school1.id);
            }
            if (self.school2.id && (schoolIdArr.indexOf(self.school2.id) == -1)) {
                schoolIdArr.push(self.school2.id);
            }
            if (self.school3.id && (schoolIdArr.indexOf(self.school3.id) == -1)) {
                schoolIdArr.push(self.school3.id);
            }
            if (schoolIdArr.length <= 1) {
                alertService.alert('Please select at least two unique schools to compare');
            } else {
                compareSchoolService.compareSchools(schoolIdArr).then(function (response) {
                    if (response.status) {
                        if (response.data) {
                            self.compareData = response.data;
                        }
                    }
                });
            }
        };
    }

    function discoverController() {
        var self = this;
    }

    browseController.$inject = ['$routeParams', 'stateListService'];

    function browseController($routeParams, stateListService) {
        var self = this;
        self.browseType = $routeParams.browseType;
        self.states = [];

        if (self.browseType == 'states') {
            stateListService.getStateList().then(function (response) {
                self.states = response.data;
            });
        }
    }

    schoolListController.$inject = ['$routeParams', 'schoolListService', 'stateListService'];

    function schoolListController($routeParams, schoolListService, stateListService) {
        var self = this;
        self.listFilterType = $routeParams.filterType;
        self.listFilterValue = $routeParams.filterValue;
        self.schools = [];
        self.schoolStart = 0;
        if (self.listFilterType == "state") {
            schoolListService.getSchoolsByCategory(self.listFilterValue, self.schoolStart).then(function (response) {
                self.schools = response.data;
            });
        }
    }

    function aboutController() {
        var self = this;
    }

    schoolHomeController.$inject = ['schoolListService', '$routeParams', 'uiGmapGoogleMapApi', '$log'];

    function schoolHomeController(schoolListService, $routeParams, uiGmapGoogleMapApi, $log) {
        var self = this,
            slugName = $routeParams.slug;
        self.schoolData = [];
        self.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 13
        };
        uiGmapGoogleMapApi.then(function (maps) {
        self.marker = {
            id: 1,
            coords: {
                latitude: 45,
                longitude: -73
            },
            options: {
                draggable: true
            },
            events: {
                dragend: function (marker, eventName, args) {
                    $log.log('marker dragend');
                    var lat = marker.getPosition().lat();
                    var lon = marker.getPosition().lng();
                    $log.log(lat);
                    $log.log(lon);

                    self.marker.options = {
                        draggable: true,
                        labelContent: "lat: " + self.marker.coords.latitude + ' ' + 'lon: ' + self.marker.coords.longitude,
                        labelAnchor: "100 0",
                        labelClass: "marker-labels"
                    };
                }
            }
        };
        });
        schoolListService.getSchoolBySlug(slugName).then(function (response) {
            if (response.status) {
                if (response.data) {
                    self.schoolData = response.data[0];
                }
            }
        });
    }

    articleHomeController.$inject = ['articleListService', '$routeParams']

    function articleHomeController(articleListService, $routeParams) {
        var self = this,
            slugName = $routeParams.slug,
            articleId = $routeParams.id;
        self.articleData = [];
        articleListService.getArticleById(articleId, slugName).then(function (response) {
            if (response.status) {
                if (response.data) {
                    self.articleData = response.data;
                }
            }
        });
    }
})();
