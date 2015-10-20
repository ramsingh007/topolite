angular.module('topolite.bp_ctrl', [])

.controller('BPctrl', function($state, $stateParams, $scope, $rootScope, webService,$localStorage,$http ) {
  
  $scope.params = $stateParams;

  console.log($rootScope.bpResults);


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

   // console.log( angular.toJson($scope.bpModel)); 

   // console.log($scope.bpModel.bp_code);
   


       var urlParam = 'BPService/GetAllBPService.svc/SetAllBP';
      var methodType = 'POST'
	    var dataJson =JSON.stringify({
        "ADDRESS1": $scope.bpModel.address,
        "ADDRESS2": "",
        "AREA_CODE": $scope.bpModel.area_code,
        "BP_Code": $scope.bpModel.bp_code,       
        "CITY": $scope.bpModel.city,
        "COUNTRY":$scope.bpModel.country,
        "CURRENCY": $scope.bpModel.currency,
        "Company_NO": $scope.bpModel.cst_num,        
        "EMAIL": $scope.bpModel.email,       
        "Location_NO":$localStorage.currentUser.UserDetails.Location_No,
        "NAME": $scope.bpModel.cp_name,
        "PAN_NO": $scope.bpModel.bp_code,
        "PARENT_VENDOR": $scope.bpModel.bp_code,
        "PAY_TERM": $scope.bpModel.pay_term,       
        "STATE": $scope.bpModel.state,
        "TIN_GRN": $scope.bpModel.tin_no,
        "Zip": $scope.bpModel.zip
    });
	    webService.webCall(urlParam,methodType,dataJson)
      	 .then(function(respone){

    console.log(respone);
      	 });

  }

  /********************  BP Create ends    *********************/



  /********************  geo location Starts   *********************/

 $scope.geolocationFun = function(){



    var options = {timeout: 2000, enableHighAccuracy: true }; // also try with false.
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
   
   }
  


   var onSuccess = function(position) {
    var le ='';
 
    $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
      
       le = res.data.results[0].address_components.length;
     
      // $scope.bpModel.address = res.data.results[0].address_components[le-1].long_name;

      // // alert($scope.zip);

      // alert(res.data.results[0].formatted_address);
      $scope.bpModel.address = res.data.results[0].formatted_address;

        } ,

    
    function(err){

   
    });
   

     }
  var onError= function(error) {
    

     alert("error");
      
   }

    /********************  geo location  ends  *********************/




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

	$scope.edit_bp = function(){
		$state.go('dashboard.editContact');
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
    	if ($.inArray($state.current.name, ['dashboard.bpDetail']) !== -1) {
    		$scope.BPgetDetail();
    	}
    
    });
  

});

