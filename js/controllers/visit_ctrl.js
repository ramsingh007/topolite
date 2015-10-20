angular.module('topolite.VisitCtrl', [])

.controller('visit_Ctrl', function($state, $localStorage,$http,$stateParams, $scope, $rootScope, webService) {

	//visit search//
  $scope.visitSearch = {};
  $scope.visitSearch.visitId = null;


	$scope.Visitsearch = function(){
    
    $rootScope.visitResults.length = 0; //empty the BP Result

    if( $scope.visitSearch.visitId== ''){
      $scope.visitSearch.visitId = null;
    }

      webService.showIonLoader();  //show ionic loading
    var urlParam = 'VisitService/VisitRecord.svc/GetVisitRecord/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+$scope.visitSearch.visitId;

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.GetVisitDataResult.Messsage.Success){
          $rootScope.visitResults = respone.data.GetBPByNameResult.BPResult;
          $state.go('dashboard.visitList');
        }else{
            webService.showPopup(respone.data.GetVisitDataResult.Messsage.ErrorMsg, $rootScope.title_close);
        }

    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
    });

     
  	
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

