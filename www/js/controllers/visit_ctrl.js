angular.module('topolite.VisitCtrl', [])

.controller('visit_Ctrl', function($state, $localStorage,$http,$stateParams, $scope, $rootScope, webService) {

	//visit search//



	$scope.Visitsearch = function(){
    
     $state.go('dashboard.visitList');
  	
    }

	$scope.Add_visit = function(){

      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('dashboard.visitDetails');
  	
      });

    }

    $scope.save_product = function(){
     webService.showPopup('Product added successfully', $rootScope.title_ok).then(function() {
         $state.go('dashboard.visitDetails');
      });

    }

    $scope.save_info = function(){
     webService.showPopup('Aditional info  added successfully', $rootScope.title_close).then(function() {
    $state.go('dashboard.visitDetails');
   });
  	
    }
  
});

