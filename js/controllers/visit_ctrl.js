angular.module('topolite.visit_ctrl', [])

.controller('VisitCtrl', function($ionicSideMenuDelegate, $state, $stateParams, $scope, $rootScope, webService,$localStorage,$http,$filter) {

   $scope.params = $stateParams;

   $scope.visitModel = {};
   $scope.visitModel.DOC_SERIES = '';
   
   
   $scope.fillAreaArr = [];
   $scope.fillContactArr = [];
   $scope.fillSalesArr = [];
   
   
   $scope.fillVisitDoc = function(){
	   webService.showIonLoader();  //show ionic loading
		 var urlParam = 'VisitService/VisitRecord.svc/GetDocSeries/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/43';

		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.DocSeriesResult.Messsage.Success){
		    	$scope.visitModel.DOC_SERIES = respone.data.DocSeriesResult.Num_Type.DocNo;
        }else{
		        webService.showPopup(respone.data.GetBPByNameResult.Messsage.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
		});
   }
   
   
   
   $scope.fillVisitSalesObj = function(){
	   webService.showIonLoader();  //show ionic loading
		var urlParam = 'VisitService/VisitRecord.svc/GetSalesPerson/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+$rootScope.currentUser.UserDetails.LoginName
						+'/null'
						+'/'+$rootScope.currentUser.UserDetails.LoginName

		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.SalePersonDetailResult.Messsage.Success){
		    	$scope.fillSalesArr = respone.data.SalePersonDetailResult.Result;
        }else{
		        webService.showPopup(respone.data.SalePersonDetailResult.Messsage.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
		});
   }
   $scope.setVisitSelSales = function(idx){
    var id = webService.findInJson('SALES_PERSON_NO',$scope.visitModel.Sales[idx]['SALES_PERSON_NO'],$scope.fillSalesArr);
      $scope.visitModel.Sales[idx]['SALES_PERSON_NAME'] = $scope.fillSalesArr[id]['SALES_PERSON_NAME'];
  }
   
  $scope.$on('$ionicView.beforeEnter', function() {
      //Call method when on bpDetail screen 
      if ($.inArray($state.current.name, ['visit.addVisit']) !== -1) {
        $scope.fillVisitDoc();
        $scope.fillVisitSalesObj();
      }
  });


  $scope.showArea = true;
  $scope.fillVisitArea = function(){
      $scope.showArea = true;
      webService.showIonLoader();  //show ionic loading
      var urlParam = 'VisitService/VisitRecord.svc/GetCustomerLocation/'
              +$rootScope.currentUser.UserDetails.Company_No
              +'/'+$rootScope.currentUser.UserDetails.Location_No
              +'/'+$scope.visitModel.CUSTOMER_NO

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.CustomerLocationResult.Messsage.Success){
          $scope.fillAreaArr = respone.data.CustomerLocationResult.VisitLocation;
          $scope.showArea = false;
        }else{
            webService.showPopup(respone.data.CustomerLocationResult.Messsage.ErrorMsg, $rootScope.title_close);
        }

    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
    });
   }


   $scope.showContact = true;
   $scope.fillVisitContacts = function(arCode){
    $scope.showContact = true;

    $scope.visitModel.Contact = [{'CUST_CONTACT_PERSON':null,
                                  'CONTACT_POSITION':null,
                                  'MOBILE':null,
                                  'EMAIL':null,
                                 }];


      webService.showIonLoader();  //show ionic loading
      var urlParam = 'VisitService/VisitRecord.svc/GetContactPerson/'
              +$rootScope.currentUser.UserDetails.Company_No
              +'/'+$rootScope.currentUser.UserDetails.Location_No
              +'/'+$scope.visitModel.CUSTOMER_NO
              +'/'+arCode
              +'/null';

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.ContactPersonDetailResult.Messsage.Success){
          $scope.fillContactArr = respone.data.ContactPersonDetailResult.Result;
          $scope.showContact = false;
        }else{
            webService.showPopup(respone.data.ContactPersonDetailResult.Messsage.ErrorMsg, $rootScope.title_close);
        }

    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
    });
   }

   $scope.setVisitSelContact =  function(idx){
    var id = webService.findInJson('CONTACT_PERSON',$scope.visitModel.Contact[idx]['CUST_CONTACT_PERSON'],$scope.fillContactArr);
    $scope.visitModel.Contact[idx]['CONTACT_POSITION'] = $scope.fillContactArr[id]['DESIGNATION'];
    $scope.visitModel.Contact[idx]['EMAIL'] = $scope.fillContactArr[id]['EMAIL']; 
    $scope.visitModel.Contact[idx]['MOBILE'] = $scope.fillContactArr[id]['MOBILE'];
   }




  $scope.getCustomID = function (query) {

    if(query!=''){

        webService.showIonLoader();  //show ionic loading
        var urlParam = 'VisitService/VisitRecord.svc/GetCustomer/'
                +$rootScope.currentUser.UserDetails.Company_No
                +'/'+$rootScope.currentUser.UserDetails.Location_No
                +'/'+query
                +'/null'
                +'/'+$rootScope.currentUser.UserDetails.LoginName

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetCustomerIDResult.Messsage.Success){
                 return respone.data.GetCustomerIDResult.Result;
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
        });

        return modelItem;
      }
      return [];
    };

$scope.getCustomIDClicked = function (callback) {
    console.log(callback.item);
    $scope.visitModel.CUSTOMER_NO = callback.item.CUSTOMER_NO;
    $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    $scope.fillVisitArea();
};
$scope.getCustomIDRemoved = function (callback) {
   console.log(callback.item);
   $scope.visitModel.CUSTOMER_NAME = '';
   $scope.fillAreaArr.length = 0;
};

$scope.getProductID = function (query) {
        webService.showIonLoader();  //show ionic loading
        // var urlParam = 'VisitService/VisitRecord.svc/GetCustomer/'
        //         +$rootScope.currentUser.UserDetails.Company_No
        //         +'/'+$rootScope.currentUser.UserDetails.Location_No
        //         +'/'+query
        //         +'/null'
        //         +'/'+$rootScope.currentUser.UserDetails.LoginName
      var urlParam = 'VisitService/VisitRecord.svc/GetItem/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No+'/null/null/null';

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetItemCodeResult.Messsage.Success){
                 return respone.data.GetItemCodeResult.Result;
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
        });

        return modelItem;
    };

$scope.getProductIDClicked = function (callback) {
    console.log(callback.item);
    // $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    // $scope.fillVisitArea();
};
$scope.getProductIDRemoved = function (callback) {
   console.log(callback.item);
   // $scope.visitModel.CUSTOMER_NAME = '';
   // $scope.fillAreaArr.length = 0;
};
$scope.getGroupID = function (query) {
        webService.showIonLoader();  //show ionic loading
        // var urlParam = 'VisitService/VisitRecord.svc/GetCustomer/'
        //         +$rootScope.currentUser.UserDetails.Company_No
        //         +'/'+$rootScope.currentUser.UserDetails.Location_No
        //         +'/'+query
        //         +'/null'
        //         +'/'+$rootScope.currentUser.UserDetails.LoginName
      var urlParam = 'VisitService/VisitRecord.svc/GetGroup/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+query;

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){

          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetGroupCodeResult.Messsage.Success){
                 return respone.data.GetGroupCodeResult.Result;

            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
        });

        return modelItem;
    };

$scope.getGroupIDClicked = function (callback) {
    console.log(callback.item);
    $scope.Productadd.DESCRIPTION= callback.item.Description;
    // $scope.fillVisitArea();
     console.log($scope.Productadd.DESCRIPTION);
};
$scope.getGroupIDRemoved = function (callback) {
   console.log(callback.item);
   $scope.Productadd.DESCRIPTION = '';
   // $scope.fillAreaArr.length = 0;
};




$scope.getCustomNAME = function (query) {
        if(query!=''){
        webService.showIonLoader();  //show ionic loading
        var urlParam = 'VisitService/VisitRecord.svc/GetCustomer/'
                +$rootScope.currentUser.UserDetails.Company_No
                +'/'+$rootScope.currentUser.UserDetails.Location_No
                +'/null'
                +'/'+query
                +'/'+$rootScope.currentUser.UserDetails.LoginName

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetCustomerIDResult.Messsage.Success){
                return respone.data.GetCustomerIDResult.Result;
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
        });

        return modelItem;
      }
      return [];
    };

$scope.getCustomNAMEClicked = function (callback) {
    //console.log(callback.item);
    $scope.visitModel.CUSTOMER_NO = callback.item.CUSTOMER_NO;
    $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    $scope.fillVisitArea();

};
$scope.getCustomNAMERemoved = function (callback) {
     //console.log(callback.item);
   $scope.visitModel.CUSTOMER_NO = '';
   $scope.fillAreaArr.length = 0;
};

$scope.arCode = '';
$scope.getCustConatct = function(){
  console.log($scope.visitModel.AREA_NAME);
  $scope.arCode = $scope.visitModel.AREA_NAME.split('-')
  $scope.fillVisitContacts($scope.arCode[0]);
}

   $scope.initVisitModel = function(){
       $scope.visitModel = {};
       $scope.visitModel.VISIT_ID = '';
       $scope.visitModel.CUSTOMER_NO = '';
       $scope.visitModel.CUSTOMER_NAME = '';
       $scope.visitModel.AREA_NAME = '';
       $scope.visitModel.ADDRESS = '';
       $scope.visitModel.REMARK = '';
       //$scope.visitModel.VISIT_TIME_FROM = new Date();
       //$scope.visitModel.VISIT_TIME_TO = new Date();
       //$scope.visitModel.VISIT_DATE = new Date();
       //$scope.visitModel.Info = {};
   
       $scope.visitModel.Contact = [{
                                    'CUST_CONTACT_PERSON':null,
                                    'CONTACT_POSITION':null,
                                    'MOBILE':null,
                                    'EMAIL':null,
                                   }];
       
       $scope.visitModel.Sales = [{
                                    'SALES_PERSON_NO':null,
                                    'SALES_PERSON_NAME':null,
                                    'NEXT_ACTION':null,
                                    'NEXT_ACTION_DATE':null,
                                    'NEXT_ACTION_TIME':null,
                                    'ALERT':1,
                                    'ALERT_DATE':null,
                                    'ALERT_TIME':null
                                   }];
       
   }

   $scope.initVisitModel();   



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
          $scope.visitModel.ADDRESS = res.data.results[0].formatted_address;
          webService.hideIonLoader();//hide ionic loading
        } ,function(err){
          webService.hideIonLoader();//hide ionic loading
          webService.showPopup('Can\'t get location now. Try again!', $rootScope.title_close);
      });
     }
    var onError= function(error) {
        webService.hideIonLoader();//hide ionic loading
        webService.showPopup(error, $rootScope.title_close);
    }

/********************  Get location  ends  *********************/

   



	/********************  Visit Search Starts    *********************/
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
            +'/'+$scope.visitSearch.visitId
            +'/'+$rootScope.currentUser.UserDetails.LoginName;

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.GetVisitRecordIDResult.Messsage.Success){
           $rootScope.visitResults = respone.data.GetVisitRecordIDResult.Result;
           $state.go('visit.visitList');
        }else{
            webService.showPopup(respone.data.GetVisitRecordIDResult.Messsage.ErrorMsg, $rootScope.title_close);
        }
    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
    });
  	
  }
  
  /********************  Visit Search Ends    *********************/

	


  /********************  Visit Add (Visit, Customer, Sales) Starts    *********************/

   $scope.SaveVisit = function(){

      var urlParam = 'VisitService/VisitRecord.svc/SetAllVisit';  
      var methodType = 'POST';
      var dataJson =angular.toJson({
                                    "Company_no": $rootScope.currentUser.UserDetails.Company_No,
                                    "LOCATION_no": $rootScope.currentUser.UserDetails.Location_No,
                                    "USER_ID": $rootScope.currentUser.UserDetails.LoginName,
                                    "VISIT_DETAILS": $scope.visitModel.VISIT_DETAILS,
                                    "ADDRESS": $scope.visitModel.ADDRESS,
                                    "ADD_ID": $scope.visitModel.AREA_NAME.split('-')[0],
                                    "CUSTOMER_NAME": $scope.visitModel.CUSTOMER_NAME,
                                    "CUSTOMER_NO": $scope.visitModel.CUSTOMER_NO,
                                    "NUM_TYPE_NO": $scope.visitModel.DOC_SERIES,
                                    "VISIT_ID": "",
                                    "REMARK": $scope.visitModel.REMARK,
                                    "VISIT_DATE": $filter('date')($scope.visitModel.VISIT_DATE, 'MM/dd/yyyy'),
                                    "VISIT_TIME_FROM": $scope.visitModel.VISIT_TIME_FROM,
                                    "VISIT_TIME_TO": $scope.visitModel.VISIT_TIME_TO,
                                    "Sale": webService.processObjectLine('Sales',$scope.visitModel.Sales),
                                    "SaleContact": webService.processObjectLine('Contact',$scope.visitModel.Contact)
                                });
    
      console.log(dataJson);

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             console.log(respone);

             if(respone.data.Messsage.Success){

              webService.showPopup(respone.data.Messsage.Success.ErrorMsg, $rootScope.title_ok).then(function(success){
                $state.go(visit.visitDetail, {vid:respone.data.Messsage.VisitCode});
              })

             }else{
                webService.showPopup(respone.data.Messsage.Success.ErrorMsg, $rootScope.title_close);
             }

         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
         });


  }
  /********************  Visit Add (Visit, Customer, Sales) Ends    *********************/


  /********************  Visit Add (Additional Info) Starts    *********************/

   $scope.AddVisitInfo = function(info){



        var urlParam = 'VisitService/VisitRecord.svc/SetAddInfoVisit';  
        var methodType = 'PUT';
        // var methodType = 'POST';
        var dataJson =JSON.stringify({
        "Company_NO": $rootScope.currentUser.UserDetails.Company_No,
        "LOCATION_NO": $rootScope.currentUser.UserDetails.Location_No,
        "User_ID": '1',
        "DOC_NO": $scope.params.vid,       
        "DEMO_PERFORMED": info.DEMO_PERFORMED,
        "ORDER_RECEIVED":info.ORDER_RECEIVED,
        "PRODUCT": 'sad',
        "PRODUCT_DEMO": info.PRODUCT_DEMO
    });


    
      //webService.hideIonLoader(); 
      //console.log(dataJson);
      //return;

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             
             if($scope.params.vid !=''){
                var err = respone.data.Messsage.ErrorMsg;
             }else{
                var err = respone.data.Messsage.ErrorMsg;
             }            
             

             webService.showPopup(err, $rootScope.title_close).then(function(res){

                $state.go('dashboard.visitDetail',{vid:$scope.params.vid})

             });
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
         });

    }
  /********************  Visit Add (Additional Info) Ends    *********************/



  /********************  Visit Add (Products) Starts    *********************/
   $scope.AddVisitProd = function(Productadd){

// alert(Productadd.ITEM_TYPE);
//    console.log($scope.Productadd.ITEM_TYPE);


//     console.log($scope.Productadd.VISIT_ID);

      // webService.showIonLoader(); 

      if($scope.params.pId !=''){
        var urlParam = 'BPService/GetAllBPService.svc/ModifyAllBP';  
        var methodType = 'PUT';
      }else{
        var urlParam = 'VisitService/VisitRecord.svc/SetProductVisit';  
        var methodType = 'POST';
      }
      


      var dataJson =JSON.stringify({
        "Company_no": $rootScope.currentUser.UserDetails.Company_No,
        "LOCATION_no": $rootScope.currentUser.UserDetails.Location_No,
        "USER_ID": 'ADMIN',
        "VISIT_ID": $scope.params.vid,       
        "DESCRIPTION": Productadd.DESCRIPTION,
        "ITEM_CODE":Productadd.ITEM_CODE,
        "ITEM_TYPE": Productadd.ITEM_TYPE,
        "QUANTITY": Productadd.QUANTITY,        
        "VISIT_REMARK":Productadd.VISIT_REMARK
    });
      //webService.hideIonLoader(); 
      //console.log(dataJson);
      //return;

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             
             if($scope.params.vid !=''){
                var err = respone.data.Messsage.ErrorMsg;
             }else{
                var err = respone.data.Messsage.ErrorMsg;
             }            
             

             webService.showPopup(err, $rootScope.title_close).then(function(res){

               $state.go('visit.visitDetail',{vid:$scope.params.vid})

             });
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
         });

      // webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
      //      $state.go('dashboard.visitDetails');
      //  });

    }
      $scope.AddSalesperson = function(){
    
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Add (Products) Ends    *********************/




  /********************  Visit Update Starts    *********************/
   $scope.UpdateVisit = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Update Ends    *********************/



  /********************  Visit Contact Update Starts    *********************/
   $scope.UpdateVisitContact = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Contact Update Ends    *********************/


  /********************  Visit Sales Update Starts    *********************/
   $scope.UpdateVisitSales = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Sales Update Ends    *********************/



  /********************  Visit Info Update Starts    *********************/
   $scope.UpdateVisitInfo = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Info Update Ends    *********************/



  /********************  Visit Prod Update Starts    *********************/
   $scope.UpdateVisitProd = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Prod Update Ends    *********************/

    /*$scope.save_product = function(){
     webService.showPopup('Product added successfully', $rootScope.title_ok).then(function() {
         $state.go('dashboard.visitDetails');
      });

    }

    $scope.save_info = function(){
     webService.showPopup('Aditional info  added successfully', $rootScope.title_close).then(function() {
    $state.go('dashboard.visitDetails');
   });
  	
    }
  */




  $scope.VisitDetail = function(){
      // webService.showIonLoader();  //show ionic loading
    var urlParam = 'VisitService/VisitRecord.svc/GetVisitDetail/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+$scope.params.vid+'/ADMIN';

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      console.log(respone);
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.GetVisitDataResult.Messsage.Success){

          $scope.visitdetailss = respone.data.GetVisitDataResult.Result;
          $scope.Saledetails= respone.data.GetVisitDataResult.Sale;
          $scope.SaleContact= respone.data.GetVisitDataResult.SaleContact;
          $scope.SaleProduct= respone.data.GetVisitDataResult.SaleProduct;
          $scope.VisitAdditional= respone.data.GetVisitDataResult.VisitAdditional;
  

          // $scope.bpModel = respone.data.GetAllBPResult.BPResult;
          // $scope.bpModel.Company_NO = $rootScope.currentUser.UserDetails.Company_No;
          // $scope.bpModel.Location_NO = $rootScope.currentUser.UserDetails.Location_No;
          // $scope.bpModel.PARENT_VENDOR = 'CST123';
          // $scope.bpModel.PAYTERM = 'PT20';


        }else{
            webService.showPopup(respone.data.GetAllBPResult.BPMesssage.ErrorMsg, $rootScope.title_close);
        }

    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
    });
  }



   $scope.itemDetails = function(Productadd){

// alert();
      // webService.showIonLoader();  //show ionic loading
 console.log(Productadd.ITEM_TYPE);
      if (Productadd.ITEM_TYPE=='E') {
    var urlParam = 'VisitService/VisitRecord.svc/GetItem/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No+'/null/null/null';


    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
     
 // $scope.Productadd.ITEM_TYPE = undefined;
    $scope.itemcode=[];
       
  $scope.itemdetailss = respone.data.GetItemCodeResult.Result;
      angular.forEach($scope.itemdetailss , function(value, key) {
 $scope.itemcode.push(value.Stock_NO);
    });
      
       console.log($scope.itemcode);
        // webService.hideIonLoader();//hide ionic loading
        // if(respone.data.GetVisitDataResult.Messsage.Success){

        //   $scope.visitdetailss = respone.data.GetVisitDataResult.Result;
        //   $scope.Saledetails= respone.data.GetVisitDataResult.Sale;
        //   $scope.SaleContact= respone.data.GetVisitDataResult.SaleContact;
        //   $scope.SaleProduct= respone.data.GetVisitDataResult.SaleProduct;
        //   $scope.VisitAdditional= respone.data.GetVisitDataResult.VisitAdditional;
  

        //   // $scope.bpModel = respone.data.GetAllBPResult.BPResult;
        //   // $scope.bpModel.Company_NO = $rootScope.currentUser.UserDetails.Company_No;
        //   // $scope.bpModel.Location_NO = $rootScope.currentUser.UserDetails.Location_No;
        //   // $scope.bpModel.PARENT_VENDOR = 'CST123';
        //   // $scope.bpModel.PAYTERM = 'PT20';


        // }else{
        //     webService.showPopup(respone.data.GetAllBPResult.BPMesssage.ErrorMsg, $rootScope.title_close);
        // }

    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
    });


};
  }


   // $scope.setPcode = function(site) {
   // $scope.selected="ss";
   //  };

    $scope.$on('$ionicView.beforeEnter', function() {
      
      //Call method when on bpDetail screen 
      if (($.inArray($state.current.name, ['visit.visitDetail']) !== -1)  || ($.inArray($state.current.name, ['dashboard.bpCreate']) !== -1 && $scope.params.vid!='') ) {
        $scope.VisitDetail();
      }
    
    });

    // $scope.model = "";
    // $scope.clickedValueModel = "";
    // $scope.removedValueModel = "";

    // $scope.getTestItems = function (query) {
    //     if (query) {
    //         return {
    //             items: [
    //                 {id: "1", name: query + "1", view: "view: " + query + "1"},
    //                 {id: "2", name: query + "2", view: "view: " + query + "2"},
    //                 {id: "3", name: query + "3", view: "view: " + query + "3"}]
    //         };
    //     }
    //     return {items: []};
    // };

    // $scope.itemsClicked = function (callback) {
    //     $scope.clickedValueModel = callback;
    // };
    // $scope.itemsRemoved = function (callback) {
    //     $scope.removedValueModel = callback;
    // };



  
   $scope.order = [{
        id: '-1',
        name: 'Select'},
    {
        id: 'C1',
        name: 'Yes'},
    {
        id: 'C2',
        name: 'No'}];

$scope.info= {};
$scope.info.ORDER_RECEIVED = '-1';
$scope.info.DEMO_PERFORMED = '-1';
  
  
       

});

