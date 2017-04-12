(function () {
    angular
        .module('schoolap')
        .controller('homeController', homeController)
        .controller('compareController', compareController)
        .controller('discoverController', discoverController)
        .controller('browseController', browseController)
        .controller('aboutController', aboutController);
    
/*
    compareController.$inject = ['$http'];
*/

    function homeController () {
        var self = this;
    }
    
    compareController.$inject = ['compareSchoolService', 'alertService'];
    function compareController (compareSchoolService, alertService) {
        var self =this;
        self.states = [];
        self.cities = [];
        self.areas = [];
        self.schools = [];
        self.compareData = [];

        // Get List of states
        compareSchoolService.getStateList().then(function(response){
            if(response.status) {
                if(response.data) {
                    self.states = response.data;
                }
            }
        });

        // Get List of cities on state change
        self.getStateCities = function (){
            compareSchoolService.getCityList(self.state.id).then(function(response){
                if(response.status) {
                    if(response.data) {
                        self.cities = response.data;
                    }
                }
            });
        };

        // Get List of areas on city change
        self.getCityAreas = function (){
            compareSchoolService.getAreaList(self.city.id).then(function(response){
                if(response.status) {
                    if(response.data) {
                        self.areas = response.data;
                    }
                }
            });
        };

        // Get List of schools on area change
        self.getAreaSchools = function (){
            compareSchoolService.getSchoolList(self.area.id).then(function(response){
                if(response.status) {
                    if(response.data) {
                        self.schools = response.data;
                    }
                }
            });
        };

        // Get comparison result of schools
        self.compareSchools = function (){
            var schoolIdArr = [];
            if(self.school1.id) {
                schoolIdArr.push(self.school1.id);
            }
            if(self.school2.id && (schoolIdArr.indexOf(self.school2.id) == -1)) {
                schoolIdArr.push(self.school2.id);
            }
            if(self.school3.id && (schoolIdArr.indexOf(self.school3.id) == -1)) {
                schoolIdArr.push(self.school3.id);
            }
            if(schoolIdArr.length <= 1) {
                alertService.alert('Please select at least two unique schools to compare');
            } else {
                compareSchoolService.compareSchools(schoolIdArr).then(function(response){
                    if(response.status) {
                        if(response.data) {
                            self.compareData = response.data;
                        }
                    }
                });
            }
        };
    }

    function discoverController () {
        var self = this;
    }
    
    function browseController () {
        var self = this;
    }
    
    function aboutController () {
        var self =this;
    }
})();