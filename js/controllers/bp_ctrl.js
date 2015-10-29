angular.module('topolite.bp_ctrl', [])

 .controller('NavController', function($state,$scope,$rootScope, $ionicSideMenuDelegate,$localStorage,webService) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
	  
	  $scope.logout= function() {
  			 window.localStorage.removeItem("username");
			  window.localStorage.removeItem("password");
			 $state.go('signIn');
			 webService.showPopup("You have been logout Successfully", $rootScope.title_ok);

		}
	    

})

.controller('BPctrl', function($ionicSideMenuDelegate, $state, $stateParams, $scope, $rootScope, webService,$localStorage,$http ) {
  
  $scope.params = $stateParams;
  $scope.bpModel = {};


  /********************  BP Search Starts    *********************/
  $scope.bpSearch = {};
  $scope.bpSearch.bp_code = null;
  $scope.bpSearch.cp_name = null;

  $scope.BPsearchCall = function(){
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
		  		webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
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
          $scope.bpModel = respone.data.GetAllBPResult.BPResult;
          $scope.bpModel.Company_NO = $rootScope.currentUser.UserDetails.Company_No;
          $scope.bpModel.Location_NO = $rootScope.currentUser.UserDetails.Location_No;
          $scope.bpModel.PARENT_VENDOR = 'CST123';
          $scope.bpModel.PAYTERM = 'PT20';


		    }else{
		        webService.showPopup(respone.data.GetAllBPResult.BPMesssage.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
		});
  }


  /********************  BP Detail ends    *********************/




  /********************  BP Create/Update Starts    *********************/
  $scope.bpModel.Company_NO = $rootScope.currentUser.UserDetails.Company_No;
  $scope.bpModel.Location_NO = $rootScope.currentUser.UserDetails.Location_No;
  $scope.bpModel.PARENT_VENDOR = 'CST123';
  $scope.bpModel.PAYTERM = 'PT20';

  $scope.BPAddUpdate = function(){

      webService.showIonLoader(); 

      if($scope.params.bpId !=''){
        var urlParam = 'BPService/GetAllBPService.svc/ModifyAllBP';  
        var methodType = 'PUT';
      }else{
        var urlParam = 'BPService/GetAllBPService.svc/SetAllBP';  
        var methodType = 'POST';
      }
      

      var dataJson =JSON.stringify({
        "ADDRESS1": $scope.bpModel.ADDRESS1,
        "ADDRESS2": $scope.bpModel.ADDRESS2,
        "AREA_CODE": $scope.bpModel.AREA_CODE,
        "BP_Code": $scope.bpModel.BP_Code,       
        "CITY": $scope.bpModel.CITY,
        "COUNTRY":$scope.bpModel.COUNTRY,
        "CURRENCY": $scope.bpModel.CURRENCY,
        "Company_NO": $scope.bpModel.Company_NO,        
        "EMAIL": $scope.bpModel.EMAIL_ID,       
        "Location_NO":$scope.bpModel.Location_NO,
        "NAME": $scope.bpModel.NAME,
        "PAN_NO": $scope.bpModel.PAN_NO,
        "PARENT_VENDOR": $scope.bpModel.PARENT_VENDOR,
        "PAY_TERM": $scope.bpModel.PAYTERM,       
        "STATE": $scope.bpModel.STATE,
        "TIN_GRN": $scope.bpModel.TIN_GRN,
        "Zip": $scope.bpModel.Zip
    });
      //webService.hideIonLoader(); 
      //console.log(dataJson);
      //return;

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             
             if($scope.params.bpId !=''){
                var err = respone.data.ModifyBPResult.ErrorMsg;
             }else{
                var err = respone.data.BPSetResult.ErrorMsg;
             }            
             

             webService.showPopup(err, $rootScope.title_close).then(function(res){

                $state.go('dashboard.bpSearch')

             });
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
         });

  }

  $scope.clearBpModel = function(){
    $scope.bpModel = {};
    $scope.bpModel.Company_NO = $rootScope.currentUser.UserDetails.Company_No;
    $scope.bpModel.Location_NO = $rootScope.currentUser.UserDetails.Location_No;
    $scope.bpModel.PARENT_VENDOR = 'CST123';
    $scope.bpModel.PAYTERM = 'PT20';
  }


  /********************  BP Create/Update ends    *********************/




  /********************  BP view contact Starts    *********************/

	$scope.add_contact = function(){

		 $state.go('dashboard.addcontact');
		     
	  //webService.showPopup('Contact Added Successfully', $rootScope.title_close);

	}
	$scope.save_contact = function(bp_contact){


	  
	  console.log(bp_contact);   


	//  webService.showPopup('Contact Added Successfully', $rootScope.title_close);

	 // webService.showPopup('Contact Added Successfully', $rootScope.title_close);

	 // $state.go('dashboard.bpDetail');
	 
	}

	
	// $scope.BPCreate = function(){

   
	// 	// $scope.BPgetDetail();
	// 	 webService.showPopup('BP Added Successfully', $rootScope.title_close).then(function() {
 //        $state.go('dashboard.bpMaster');
 //          });

	// 	// //  ng-click="goToState('dashboard.bpDetail',{bpId:list.BP_Code})"
		
	// }




  /********************  BP view contact ends    *********************/



   // On Before Enter event
   $scope.$on('$ionicView.beforeEnter', function() {
    	
    	//Call method when on bpDetail screen	
    	if (($.inArray($state.current.name, ['dashboard.bpDetail']) !== -1)  || ($.inArray($state.current.name, ['dashboard.bpCreate']) !== -1 && $scope.params.bpId!='') ) {
    		$scope.BPgetDetail();
    	}
    
    });
  

});

