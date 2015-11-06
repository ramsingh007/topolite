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
  //console.log($scope.params);


  $scope.bpModel = {};
  $scope.bp_contact={};
  
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
		    	$state.go('bp.bpMaster');
		    }else{
		        webService.showPopup(respone.data.GetBPByNameResult.BPMesssage.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
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
        $scope.bpContacts=respone.data.GetAllBPResult.BPSetContact;


		    }else{
		        webService.showPopup(respone.data.GetAllBPResult.BPMesssage.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
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
        // "PAY_TERM": $scope.bpModel.PAYTERM,       
        "STATE": $scope.bpModel.STATE,
        "TIN_GRN": $scope.bpModel.TIN_GRN,
        "LOCATION": "sdh",
        "SALES_PERSON_NO": "ADMIN",
        "CST_NO": "123265",
        "PHONE_NO": "123265",
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

                $state.go('bp.bpSearch')

             });
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });

  }

  $scope.clearBpModel = function(){

    $scope.bpModel = {};
    $scope.bpModel.Company_NO = $rootScope.currentUser.UserDetails.Company_No;
    $scope.bpModel.Location_NO = $rootScope.currentUser.UserDetails.Location_No;
    $scope.bpModel.PARENT_VENDOR = 'CST123';
    $scope.bpModel.PAYTERM = 'PT20';
  }



  $scope.getSalesID = function (query) {

    if(query!=''){

        webService.showIonLoader();  //show ionic loading
        var urlParam = 'BPService/GetAllBPService.svc/GetSalesPersonNo/'
                +$rootScope.currentUser.UserDetails.Company_No
                +'/'+$rootScope.currentUser.UserDetails.Location_No
                +'/'+query;

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetBPSalesPersonResult.BPMessage.Success){
                 return respone.data.GetBPSalesPersonResult.BPResult;
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetBPSalesPersonResult.BPMessage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
      }
      return [];
    };

$scope.getSalesIDClicked = function (callback) {
    console.log(callback.item);

    $scope.bpModel.SALES_PERSON_NO = callback.item.SALES_PERSON_NO;
};
$scope.getSalesIDRemoved = function (callback) {
   console.log(callback.item);
   $scope.bpModel.SALES_PERSON_NO = '';
};




  /********************  BP Create/Update ends    *********************/


/********************  Get location Starts   *********************/

 $scope.getGeoLocation= function(){
    var options = {timeout: 2000, enableHighAccuracy: true }; // also try with false.
    webService.showIonLoader();  //show ionic loading
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}
     
     var onSuccess = function(position) {
      var le ='';
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
        le = res.data.results[0].address_components.length;
          $scope.bpModel.LOCATION = res.data.results[0].formatted_address;
          webService.hideIonLoader();//hide ionic loading
        } ,function(err){
          webService.hideIonLoader();//hide ionic loading
          webService.showPopup('Network error!', $rootScope.title_close);
      });
     }
    var onError= function(error) {
      webService.hideIonLoader();//hide ionic loading
      webService.showPopup('Unable to access location!', $rootScope.title_close);
    }

/********************  Get location  ends  *********************/






  /********************  BP view contact Starts    *********************/

	$scope.add_contact = function(){

    webService.showIonLoader();  //show ionic loading
        var urlParam = 'BPService/GetAllBPService.svc/GetBP/'
                +$rootScope.currentUser.UserDetails.Company_No
                +'/'+$rootScope.currentUser.UserDetails.Location_No
                +'/'+$scope.params.bpId;

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetAllBPResult.BPMesssage.Success){
              var countc=respone.data.GetAllBPResult.BPSetContact;

              $rootScope.contactlen=countc.length;
              console.log(countc.length);
                 $state.go('bp.addcontact');
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetBPSalesPersonResult.BPMessage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });


	

		     
	  //webService.showPopup('Contact Added Successfully', $rootScope.title_close);

	}

  



	$scope.save_contact = function(process){


          webService.showIonLoader(); 
       
        if(process == 'Add'){
          var urlParam = 'BPService/GetAllBPService.svc/SetBPContact';  
          var methodType = 'POST';
        }else if(process == 'Update'){
            var urlParam = 'BPService/GetAllBPService.svc/ModifyBPContact';  
          var methodType = 'PUT';
        }

        
        

        
        var dataJson =JSON.stringify({
     "USER_ID":$rootScope.currentUser.UserDetails.UserId,
     "BP_Code":$scope.params.bpId,
     "COMPANY_NO":$rootScope.currentUser.UserDetails.Company_No,
     "LOCATION_NO":$rootScope.currentUser.UserDetails.Location_No,
     "CONTACT_PERSON": $scope.bp_contact.CONTACT_PERSON,
    "DESIGNATION": $scope.bp_contact.DESIGNATION,
    "EMAIL": $scope.bp_contact.EMAIL,
    "LI_NO":$rootScope.contactlen+1,
    "MOBILE_NO":$scope.bp_contact.MOBILE_NO});
      //webService.hideIonLoader(); 
      //console.log(dataJson);
      //return;

   webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             
         
                var err = respone.data.BPSetResult.ErrorMsg;
                    
             

             webService.showPopup(err, $rootScope.title_close).then(function(res){

                // $state.go('bp.bpSearch')

             });
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });

	 
	}

 $scope.getCurrency=function(){

   webService.showIonLoader();  //show ionic loading
        var urlParam = 'BPService/GetAllBPService.svc/GetCurrency/'
                +$rootScope.currentUser.UserDetails.Company_No
                +'/'+$rootScope.currentUser.UserDetails.Location_No;
               

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetBPCurrencyResult.BPMessage.Success){
     $scope.Currency=respone.data.GetBPCurrencyResult.BPResult;
 
      $scope.bpModel.CURRENCY ='1';

              // $scope.bpModel.CURRENCY = $scope.Currency.Key;
              console.log($scope.Currency);
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetBPSalesPersonResult.BPMessage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });




 }
	

	// $scope.BPCreate = function(){

   
	// 	// $scope.BPgetDetail();
	// 	 webService.showPopup('BP Added Successfully', $rootScope.title_close).then(function() {
 //        $state.go('dashboard.bpMaster');
 //          });

	// 	// //  ng-click="goToState('dashboard.bpDetail',{bpId:list.BP_Code})"
		
	// }


  // $scope.visitInfo.CURRENCY = '';


  /********************  BP view contact ends    *********************/

$scope.BPSearchPerson = function (query) {
  if (query!='') {
        webService.showIonLoader();  

        
     var urlParam = 'BPService/GetAllBPService.svc/GetBPName/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+'null'
            +'/'+query;
          
        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetBPByNameResult.BPMesssage.Success){
                 return respone.data.GetBPByNameResult.BPResult;
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
    }
    return[];
    };
      

$scope.BPSearchPersonClicked = function (callback) {
    console.log(callback.item);
    // $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    // $scope.fillVisitArea();
};
$scope.BPSearchPersonRemoved = function (callback) {
   console.log(callback.item);
   // $scope.visitModel.CUSTOMER_NAME = '';
   // $scope.fillAreaArr.length = 0;
};

$scope.params =  $stateParams;


   // On Before Enter event
   $scope.$on('$ionicView.beforeEnter', function() {

     	 //Call method when on bpDetail screen  
      if ($.inArray($state.current.name, ['bp.bpCreate']) !== -1) {
         $scope.getCurrency();
      }
       if ($.inArray($state.current.name, ['bp.addcontact']) !== -1) {
         $scope.add_contact();

         if($scope.params.lineData !='undefined'){
          console.log($scope.params.bpId);



          $scope.ram=$scope.params.bpId;
             $scope.bp_contact.CONTACT_PERSON = $scope.params.lineData.CONTACT_PERSON;
            $scope.bp_contact.DESIGNATION =$scope.params.lineData.DESIGNATION;
            $scope.bp_contact.EMAIL = $scope.params.lineData.EMAIL;
            $rootScope.contactlen = $scope.bp_contact.LI_NO = $scope.params.lineData.LI_NO ;
            $scope.bp_contact.MOBILE_NO = $scope.params.lineData.MOBILE_NO ;
          }

      }

     


    	//Call method when on bpDetail screen	
    	if (($.inArray($state.current.name, ['bp.bpDetail']) !== -1)  || ($.inArray($state.current.name, ['bp.bpCreate']) !== -1 && $scope.params.bpId!='') ) {
    		$scope.BPgetDetail();

    	}
    
    });
  

});

 