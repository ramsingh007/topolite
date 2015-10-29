angular.module('topolite.Attendctrl', [])

.controller('attend_Ctrl', function($ionicSideMenuDelegate, $state, $localStorage,$http,$stateParams, $scope, $rootScope, webService) {


    $scope.time_in = function(){
     webService.showPopup('Time in  successfully', $rootScope.title_close);
  	
    }

    $scope.time_out = function(){
     webService.showPopup('Time Out successfully', $rootScope.title_close);
 
    }
  
});

