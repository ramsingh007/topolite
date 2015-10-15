angular.module('topolite.bp_ctrl', [])

.controller('BPctrl', function($state, $stateParams, $scope, $rootScope, webService ) {
  
  $scope.params = $stateParams;


  /********************  BP Search Starts    *********************/
  $scope.bpSearch = {};
  $scope.bpSearch.bp_code = null;
  $scope.bpSearch.cp_name = null;

  $scope.BPsearch = function(){
  	$rootScope.bpResults.length = 0; //empty the BP Result

  	if($scope.bpSearch.bp_code == ''){
  		$scope.bpSearch.bp_code = null;
  	}


  	if($scope.bpSearch.cp_name == ''){
  		$scope.bpSearch.cp_name = null;
  	}

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


  /********************  BP Detail Starts    *********************/
  $scope.bpDetail = [];

  $scope.BPgetDetail = function(){
  		webService.showIonLoader();  //show ionic loading
		var urlParam = 'BPService/GetAllBPService.svc/GetBP/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+$scope.params.bpId;

		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetAllBPResult.BPMesssage.Success){
		    	$scope.bpDetail = respone.data.GetAllBPResult;
		    }else{
		        webService.showPopup(respone.data.GetAllBPResult.BPMesssage.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Something went wrong! Please login again', $rootScope.title_close);
		});
  }


  /********************  BP Detail ends    *********************/




  /********************  BP Create Starts    *********************/
  $scope.bpModel = {};
  
  $scope.BPCreate = function(){
  	console.log($scope.bpModel);
  }

  /********************  BP Create ends    *********************/



  /********************  BP view contact Starts    *********************/

	$scope.add_contact = function(){

		 $state.go('dashboard.addcontact');
		     
	  //webService.showPopup('Contact Added Successfully', $rootScope.title_close);

	}
	$scope.save_contact = function(bp_contact){
	  
	  // console.log(bp_contact.c_person);   


	//  webService.showPopup('Contact Added Successfully', $rootScope.title_close);

	 webService.showPopup('Contact Added Successfully', $rootScope.title_close);

	 // $state.go('dashboard.bpDetail');
	 
	}

	$scope.editContact = function(){
		$state.go('dashboard.editContact');
	}



  /********************  BP view contact ends    *********************/



   // On Before Enter event
   $scope.$on('$ionicView.beforeEnter', function() {
    	
    	//Call method when on bpDetail screen	
    	if ($.inArray($state.current.name, ['dashboard.bpDetail']) !== -1) {
    		$scope.BPgetDetail();
    	}
    
    });
  

});

