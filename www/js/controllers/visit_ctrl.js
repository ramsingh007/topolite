angular.module('topolite.VisitCtrl', [])

.controller('visit_Ctrl', function($state, $localStorage,$http,$stateParams, $scope, $rootScope, webService) {

	//visit search//



	$scope.Visitsearch = function(){
    
     $state.go('dashboard.visitList');
  	
    }


    
	$scope.Add_visit = function(){
    
     $state.go('dashboard.visitDetails');
  	
    }
  
});

