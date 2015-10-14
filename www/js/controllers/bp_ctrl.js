angular.module('topolite.bp_ctrl', [])

.controller('BPctrl', function($state, $stateParams, $scope, $rootScope, webService ) {
  
  /********************  BP Search Starts    *********************/
  $scope.bpSearch = {};
  $scope.bpSearch.bp_code = null;
  $scope.bpSearch.cp_name = null;

  $scope.BPsearch = function(){
  	$rootScope.bpResults.length = 0; //empty the BP Result

  		webService.showIonLoader();  //show ionic loading
		var urlParam = 'BPService/GetAllBPService.svc/GetBPName/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+$scope.bpSearch.bp_code
						+'/'+$scope.bpSearch.cp_name;

		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetBPByNameResult.BPMesssage.Success){
		    	$rootScope.bpResults = respone.data.GetBPByNameResult.BPResult;
		    	$state.go('dashboard.bpMaster');
		    }else{
		        webService.showPopup(respone.data.GetBPByNameResult.BPMesssage.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Something went wrong! Please login again', $rootScope.title_close);
		});
  }

  /********************  BP Search ends    *********************/


  /********************  BP Create Starts    *********************/
  $scope.bpModel = {};
  
  $scope.BPCreate = function(){
  	console.log($scope.bpModel);
  }

  /********************  BP Create ends    *********************/


});

