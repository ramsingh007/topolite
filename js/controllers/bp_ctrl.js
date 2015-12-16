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

.controller('BPctrl', function($ionicSideMenuDelegate,$state, $timeout,$stateParams,$location,$ionicScrollDelegate,$scope, $rootScope, webService,$localStorage,$http ) {
  
  $scope.params = $stateParams;

  //console.log($scope.params);
$scope.Currency={};

  $scope.bpModel = {};
  $scope.bp_contact = {};
  // $scope.bp_contact.EMAIL='';


  //fine element 

 



  $scope.initbpContactModel = function(){
      $scope.bp_contact.CONTACT_PERSON='';
      $scope.bp_contact.DESIGNATION='';
      $scope.bp_contact.EMAIL='';
      $scope.bp_contact.MOBILE_NO='';

      //console.log($scope.bp_contact);
  }


  

  
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

  $scope.clearBpModel=function(){

 $scope.initbpModel();

  }


 $scope.initbpModel = function(){
       //$scope.visitModel = {};
          $scope.bpModel.ADDRESS1='';
          $scope.bpModel.ADDRESS2='';
          $scope.bpModel.AREA_CODE='';
          $scope.bpModel.BP_Code='';   
          $scope.bpModel.CITY='';
          $scope.bpModel.COUNTRY='';
          $scope.bpModel.CURRENCY='';
          $scope.bpModel.Company_NO='';     
          $scope.bpModel.EMAIL_ID='';   
          $scope.bpModel.Location_NO='';
          $scope.bpModel.NAME='';
          $scope.bpModel.PAN_NO='';
          
          $scope.bpModel.STATE='';
          $scope.bpModel.TIN_GRN='';
          $scope.bpModel.LOCATION='';
          $scope.bpModel.SALES_PERSON_NO= $rootScope.currentUser.UserDetails.LoginName;
          $scope.bpModel.CST_NO='';
          $scope.bpModel.PHONE_NO='';
          $scope.bpModel.Zip='';

          $scope.bpModel.Company_NO = $rootScope.currentUser.UserDetails.Company_No;
          $scope.bpModel.Location_NO = $rootScope.currentUser.UserDetails.Location_No;
          $scope.bpModel.PARENT_VENDOR = 'CST123';
          $scope.bpModel.PAYTERM = 'PT20';

     }
      

  /********************  BP Search ends    *********************/

/* Email Validation */
$scope.ValidateEmail = function(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    webService.showPopup('You have entered an invalid email address!', $rootScope.title_ok);
    return (false)
}

  /********************  BP Detail Starts    *********************/
  $scope.bpDetail = [];
  $scope.bpMap = '';
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
             $scope.bpContacts=respone.data.GetAllBPResult.BPSetContact;

           $rootScope.bpContactssss=$scope.bpContacts.length;

           $scope.bpModel.LOCATION = $scope.bpModel.VISIT_LOCATION;

   
     
    
     

        if($scope.bpModel.VISIT_LOCATION!=''){
          $scope.bpMap = $scope.bpModel.VISIT_LOCATION;
        }else if($scope.bpModel.COUNTRY!=''){
          $scope.bpMap = $scope.bpModel.ADDRESS1
                         +','+$scope.bpModel.ADDRESS2
                         +','+$scope.bpModel.CITY
                         +','+$scope.bpModel.STATE
                         +','+$scope.bpModel.COUNTRY;
        }
        

		    }else{
		        webService.showPopup(respone.data.GetAllBPResult.BPMesssage.ErrorMsg, $rootScope.title_close);
		    }

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

       
  if($scope.params.bpId!='' && $.inArray($state.current.name, ['bp.bpCreate']) !== -1 ){

      var cIdx = webService.findInJson('Currency',$scope.bpModel.CURRENCY,$scope.Currency);
   
$scope.Currency[cIdx]={};
   // $scope.Currency[0]
       $scope.bpModel.CURRENCY=$scope.Currency[cIdx].Key;

       // cIdx.toString();


   
         }

   
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


  $scope.BPAddUpdate = function(){
    
       console.log($scope.bpModel);
       // alert(anchor);

       // alert($scope.bpModel.CST_NO);
    var msg ='';
    var eleId = '';

    if($scope.bpModel.BP_Code == ''){
      msg = "Please enter BP Code!";
      eleId = 'bpcode';
    
    }else if($scope.bpModel.NAME =='' ){
      msg = "Please enter name!";
      eleId = 'bpname';
    
    }else if($scope.bpModel.ADDRESS1 =='' ){
      msg = "Please enter address1!";
      eleId = 'address';

    }else if($scope.bpModel.CITY =='' ){
      msg = "Please enter city!";
      eleId = 'city';

    }else if($scope.bpModel.AREA_CODE ==''){
      msg = "Please enter area code !";
      eleId = 'areacode';

    }else if($scope.bpModel.EMAIL_ID!='' && !webService.ValidateEmail($scope.bpModel.EMAIL_ID)){
       msg = 'Please enter correct email!';

       eleId = 'emailid';
    } else if($scope.bpModel.PHONE_NO =='' ){
      msg = "Please enter mobile no!";
        eleId = 'mobile';
      
    } else if($scope.bpModel.LOCATION ==''){
      msg = "Please enter location";
      eleId = 'location';
      
    }
    

    if(msg!='' ){
        var p = webService.showPopup(msg, $rootScope.title_ok);
        p.then(function(res){
            $location.hash(eleId);
            $ionicScrollDelegate.anchorScroll([1]);
        })
    }else{

      webService.showIonLoader(); 

      if($scope.params.bpId !=''){
        var urlParam = 'BPService/GetAllBPService.svc/ModifyAllBP';  
        var methodType = 'PUT';
      }else{
        var urlParam = 'BPService/GetAllBPService.svc/SetAllBP';  
        var methodType = 'POST';
      }
      
     console.log($scope.bpModel.AREA_CODE);
    // $scope.bpModel.AREA_CODE=$scope.bpModel.AREA_CODE;

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
        //"PAY_TERM": $scope.bpModel.PAYTERM,       
        "STATE": $scope.bpModel.STATE,
        "TIN_GRN": $scope.bpModel.TIN_GRN,
        "LOCATION":$scope.bpModel.LOCATION,
        "SALES_PERSON_NO": $scope.bpModel.SALES_PERSON_NO,
        "CST_NO": $scope.bpModel.CST_NO,
        "PHONE_NO": $scope.bpModel.PHONE_NO,
        "Zip": $scope.bpModel.Zip
    });



      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             
             if($scope.params.bpId !=''){
                
                if(respone.data.ModifyBPResult.Success){
                  webService.showPopup(respone.data.ModifyBPResult.ErrorMsg, $rootScope.title_close).then(function(res){
                      $state.go('bp.bpDetail',{bpId:$scope.params.bpId})
                   });
                 }else{
                    webService.showPopup(respone.data.ModifyBPResult.ErrorMsg, $rootScope.title_close);
                 }

             }else{
                if(respone.data.BPSetResult.Success){
                  webService.showPopup(respone.data.BPSetResult.ErrorMsg, $rootScope.title_close).then(function(res){
                      $state.go('bp.bpDetail',{bpId:$scope.bpModel.BP_Code})
                   });
                 }else{
                    webService.showPopup(respone.data.BPSetResult.ErrorMsg, $rootScope.title_close);
                 }
             }            
             

             
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });
       }

  }

  


  $scope.getSalesID = function (query) {

    if(query!=null){

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
                 var x = [];
                 var dat = respone.data.GetBPSalesPersonResult.BPResult;
                 for(var i in dat){
                    x.push({'SALES_PERSON_NO':dat[i]['SALES_PERSON_NO'],'NAME':dat[i]['NAME'],'label':dat[i]['SALES_PERSON_NO']+' ( '+dat[i]['NAME']+' )'});
                 }
                 return x;
            }

            /*else{
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

///get group

$scope.getGroupID = function (query) {

    if(query!=null){

        webService.showIonLoader();  //show ionic loading
        var urlParam = 'BPService/GetAllBPService.svc/GetArea/'
                +$rootScope.currentUser.UserDetails.Company_No
                +'/'+$rootScope.currentUser.UserDetails.Location_No
                +'/'+query;

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();


               if(respone.data.GetBPAreaResult.BPMessage.Success){
                 var x = [];
                 var dat = respone.data.GetBPAreaResult.BPResult;
                 for(var i in dat){
                    x.push({'AREA_CODE':dat[i]['AREA_CODE'],'AREA_NAME':dat[i]['AREA_NAME'],'label':dat[i]['AREA_CODE']+' ( '+dat[i]['AREA_NAME']+' )'});
                 }
                 return x;
            }


            

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
      }
      return [];
    };

$scope.getGroupClicked = function (callback) {
    console.log(callback.item);

    $scope.bpModel.AREA_CODE = callback.item.AREA_CODE;

    //$scope.bpModel.SALES_PERSON_NO = callback.item.SALES_PERSON_NO;
};
$scope.getGroupRemoved = function (callback) {
   console.log(callback.item);
   $scope.bpModel.AREA_CODE = '';

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

$scope.save_contact = function(process){

 

    var msg ='';
    var elid='';
        // $scope.initbpContactModel();
 
         

    if($scope.bp_contact.CONTACT_PERSON == ''){
      msg = "Please enter contact person!";
      elid='contactp';
    }else if($scope.bp_contact.DESIGNATION ==''){
      msg = "Please enter designation!";
      elid='designation';

    }else if($scope.bp_contact.EMAIL!='' && !webService.ValidateEmail($scope.bp_contact.EMAIL)){
       msg = 'Please enter correct email!';
       elid = 'email';
    }

    else if($scope.bp_contact.MOBILE_NO ==''){
      msg = "Please enter mobile no!";
      elid='mobile';
    }

    if(msg!=''){
       
 var p2 = webService.showPopup(msg, $rootScope.title_ok);
        p2.then(function(res){
            $location.hash(elid);
            $ionicScrollDelegate.anchorScroll([1]);
        })


    }else{


          webService.showIonLoader(); 
       
        if(process == 'Add'){
          var urlParam = 'BPService/GetAllBPService.svc/SetBPContact';  
          var methodType = 'POST';

            $rootScope.contactlen =  $rootScope.bpContactssss+1;

        }else if(process == 'Update'){
            var urlParam = 'BPService/GetAllBPService.svc/ModifyBPContact';  
          var methodType = 'PUT';

          $rootScope.contactlen = $scope.bp_contact.LI_NO;
        }

        
        

        
        var dataJson =JSON.stringify({
     "USER_ID":$rootScope.currentUser.UserDetails.UserId,
     "BP_Code":$scope.params.bpId,
     "COMPANY_NO":$rootScope.currentUser.UserDetails.Company_No,
     "LOCATION_NO":$rootScope.currentUser.UserDetails.Location_No,
     "CONTACT_PERSON": $scope.bp_contact.CONTACT_PERSON,
    "DESIGNATION": $scope.bp_contact.DESIGNATION,
    "EMAIL": $scope.bp_contact.EMAIL,
    "LI_NO":$rootScope.contactlen,
    "MOBILE_NO":$scope.bp_contact.MOBILE_NO});
     

   webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             
             
             if($scope.params.lId !=''){
                var err = respone.data.ModifyBPResult.ErrorMsg;
             }else{
                var err = respone.data.BPSetResult.ErrorMsg;
             }   
                
             
 webService.showPopup(err, $rootScope.title_close).then(function(res){


                // $state.go('bp.bpSearch')
               $state.go('bp.bpDetail',{bpId:$scope.params.bpId})

             });
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });
    }
	 
	}






  /********************  BP view contact ends    *********************/

$scope.BPSearchPerson = function (query,fieldName) {

  if (query!=null) {
        webService.showIonLoader();  

    
     if(fieldName == 'name'){   
     var urlParam = 'BPService/GetAllBPService.svc/GetBPName/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+'null'
            +'/'+query;
      }else{
          var urlParam = 'BPService/GetAllBPService.svc/GetBPName/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+query
            +'/null';
      }      
          
        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading

            if(respone.data.GetBPByNameResult.BPMesssage.Success){
                 var x = [];
                 var dat = respone.data.GetBPByNameResult.BPResult
                 for(var i in dat){
                    x.push({'BP_Code':dat[i]['BP_Code'],'NAME':dat[i]['NAME'],'label':dat[i]['BP_Code']+' ( '+dat[i]['NAME']+' )'});
                 }
                 return x;
            }
          
        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
    }
    return[];
    };
      

$scope.BPSearchPersonClicked = function (callback,fieldName) {
    console.log(callback.item);

    if(fieldName == 'name'){
      $scope.bpSearch.cp_name = callback.item.NAME;
      $scope.bpSearch.bp_code = callback.item.BP_Code;
    }else{
      $scope.bpSearch.bp_code = callback.item.BP_Code;
      $scope.bpSearch.cp_name = callback.item.NAME;
    }
    
};
$scope.BPSearchPersonRemoved = function (callback,fieldName) {
   console.log(callback.item);
 
      $scope.bpSearch.cp_name = '';
      $scope.bpSearch.bp_code = '';

    
};



$scope.$on('$ionicView.beforeEnter', function() {
      
      //Call method when on bpDetail screen 
      if (($.inArray($state.current.name, ['bp.bpDetail']) !== -1) || ($.inArray($state.current.name, ['bp.bpCreate']) !== -1 && $scope.params.bpId!='') ) {
        webService.showIonLoader();
      }


  


});





  $scope.$on('$ionicView.afterEnter', function() {

    if (($.inArray($state.current.name, ['bp.bpDetail']) !== -1)  || ($.inArray($state.current.name, ['bp.bpCreate']) !== -1 && $scope.params.bpId!='') || ($.inArray($state.current.name, ['bp.addcontact']) !== -1  && $scope.params.lId!='')) {
        
 $scope.initbpModel();
      
       $scope.BPgetDetail();
        $scope.getCurrency();

     
 }

       if ($.inArray($state.current.name, ['bp.bpCreate']) !== -1) {
         $scope.initbpModel();
    
         
      }
  
    //Call method when on bpDetail screen  


       if (($.inArray($state.current.name, ['bp.bpCreate']) !== -1 && $scope.params.bpId=='')) {
         $scope.bpModel.CURRENCY='1';
        $scope.getCurrency();


      }
    
      if ($.inArray($state.current.name, ['bp.addcontact']) !== -1) {
        
      
          $scope.initbpContactModel();


          //console.log($scope.params);
         if($scope.params.lineData){
          //console.log($scope.params.bpId);
          $rootScope.dtdttd=$scope.params.lineData;


          // $scope.ram=$scope.params.bpId;
            $scope.bp_contact.CONTACT_PERSON = $scope.params.lineData.CONTACT_PERSON;
            $scope.bp_contact.DESIGNATION =$scope.params.lineData.DESIGNATION;
            $scope.bp_contact.EMAIL = $scope.params.lineData.EMAIL;
            $scope.bp_contact.LI_NO = $scope.params.lineData.LI_NO ;
            $scope.bp_contact.MOBILE_NO = $scope.params.lineData.MOBILE_NO ;
         
          }


      }


      //Call method when on bpDetail screen 
     
    
    });

  

});

 