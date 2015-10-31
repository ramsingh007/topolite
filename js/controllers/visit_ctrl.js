angular.module('topolite.visit_ctrl', [])

.controller('VisitCtrl', function($ionicSideMenuDelegate, $state, $stateParams, $scope, $rootScope, webService,$localStorage,$http,$filter) {

   $scope.params = $stateParams;


   $scope.visitModel = {};
   $scope.visitModel.VISIT_TIME_FROM = new Date();
   $scope.visitModel.VISIT_TIME_TO = new Date();
   // $scope.date = new Date();
   // var date = new Date();
   //$scope.visitModel.VISIT_TIME_FROM = $filter('date')(new Date(), 'HH:mm');
	//console.log($scope.visitModel.VISIT_TIME_FROM);
   $scope.visitModel.VISIT_DATE = new Date();
   
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
		    	$scope.visitModel.DOC_SERIES = respone.data.DocSeriesResult.DocNo;
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
						+'/'+$rootScope.currentUser.UserDetails.LoginName;
						+'/null';
						+'/'+$rootScope.currentUser.UserDetails.LoginName;

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
   
  $scope.$on('$ionicView.beforeEnter', function() {
    //Call method when on bpDetail screen 
      if ($.inArray($state.current.name, ['visit.addVisit']) !== -1) {
        //$scope.fillVisitDoc();
        //$scope.fillVisitSalesObj();
      }
  });
   
   $scope.initVisitModel = function(){
       $scope.visitModel.Info = {};
   
       $scope.visitModel.Contact = [{
                                    'CUSTOMER_NAME':null,
                                    'DESIGNATION':null,
                                    'MOBILE':null,
                                    'EMAIL':null,
                                   }];
       
       $scope.visitModel.Sales = [{
                                    'SALES_PERSON_NO':null,
                                    'SALES_PERSON_NAME':null,
                                    'NEXT_ACTION':null,
                                    'NEXT_ACTION_DATE':null,
                                    'NEXT_ACTION_TIME':1,
                                    'ALERT_REQ':'yes',
                                    'ALERT_DATE':null,
                                    'ALERT_TIME':null,
                                   }];
       
       $scope.visitModel.Product = [];
   }

   $scope.initVisitModel();   



/********************  Get location Starts   *********************/

 $scope.getGeoLocation= function(){
    var options = {timeout: 2000, enableHighAccuracy: true }; // also try with false.
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}
     
     var onSuccess = function(position) {
      var le ='';
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
        le = res.data.results[0].address_components.length;
          $scope.visitModel.ADDRESS = res.data.results[0].formatted_address;
        } ,function(err){
          webService.showPopup('Can\'t get location now. Try again!', $rootScope.title_close);
      });
     }
    var onError= function(error) {
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


    // console.log($scope.visitModel.CUSTOMER_NAME);
    //           $scope.visitModel.CUSTOMER_NO
    //           $scope.visitModel.CUSTOMER_NAME
    //            $scope.visitModel.VISIT_TIME_TO
    //             $scope.visitModel.VISIT_DATE
    //              $scope.visitModel.REMARK
    //              $scope.visitModel.AREA_NAME
    //              $scope.visitModel.VISIT_TIME_TO
    //               $scope.visitModel.VISIT_TIME_FROM
                 



//         var urlParam = 'VisitService/VisitRecord.svc/SetAddInfoVisit';  
//         var methodType = 'POST';
//         var dataJson ={
//     "Company_no": "CBS",
//     "LOCATION_no": "Noida",
//     "USER_ID": "ADMIN",
//     "VISIT_DETAILS": "dfdf",
//     "ADDRESS": "Noida",
//     "ADD_ID": "1",
//     "CUSTOMER_NAME": $scope.visitModel.CUSTOMER_NAME,
//     "CUSTOMER_NO": $scope.visitModel.CUSTOMER_NO,
//     "NUM_TYPE_NO": $scope.visitModel.CUSTOMER_NO,
//     "REMARK": $scope.visitModel.CUSTOMER_NO,
//     "STATUS": $scope.visitModel.CUSTOMER_NO,
//     "VISIT_DATE": $scope.visitModel.VISIT_DATE,
//     "VISIT_ID": $scope.visitModel.CUSTOMER_NO,
//     "VISIT_TIME_FROM": $scope.visitModel.VISIT_TIME_FROM,
//     "VISIT_TIME_TO": $scope.visitModel.VISIT_TIME_TO,
//     "Sale": [
//         {
//             "ALERT": 1,
//             "ALERT_DATE": "10/10/2015",
//             "ALERT_TIME": "25",
//             "NEXT_ACTION": null,
//             "NEXT_ACTION_DATE": "10/10/2015",
//             "NEXT_ACTION_TIME": "45",
//             "SALES_PERSON_NAME": "Amrit Singh",
//             "SALES_PERSON_NO": "ASINGH",
//             "SALES_LI_NO": 1
//         },
//         {
//             "ALERT_DATE": "10/10/2015",
//             "ALERT_TIME": "8",
//             "NEXT_ACTION": "5",
//             "NEXT_ACTION_DATE": "10/10/2015",
//             "NEXT_ACTION_TIME": "8",
//             "SALES_PERSON_NAME": "Amrit Singh",
//             "SALES_PERSON_NO": "ASINGH",
//             "SALES_LI_NO": 2
//         }
//     ],
//     "SaleContact": [
//         {
//             "CUST_CONTACT_PERSON": "RGYTRGY",
//             "CONTACT_POSITION": "SADF",
//             "EMAIL": "7",
//             "MOBILE_NO": "8",
//             "CONTACT_LI_NO": 1
//         }
//     ]
// };



 

    
//       //webService.hideIonLoader(); 
//       //console.log(dataJson);
//       //return;

//       webService.webCall(urlParam,methodType,dataJson)
//          .then(function(respone){
//              webService.hideIonLoader(); 
             
//              if($scope.params.vid !=''){
//                 var err = respone.data.Messsage.ErrorMsg;
//              }else{
//                 var err = respone.data.Messsage.ErrorMsg;
//              }            
             

//              webService.showPopup(err, $rootScope.title_close).then(function(res){

//                 $state.go('dashboard.visitDetail',{vid:$scope.params.vid})

//              });
         
//          },function(error){
//             webService.hideIonLoader();  //show ionic loading
//             webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
//          });




//      /* webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
//            $state.go('dashboard.visitDetails');
//   	   });
// */

    }
  /********************  Visit Add (Visit, Customer, Sales) Ends    *********************/


  /********************  Visit Add (Additional Info) Starts    *********************/

   $scope.AddVisitInfo = function(info){


     if($scope.params.vid !=''){
        var urlParam = 'VisitService/VisitRecord.svc/SetAddInfoVisit';  
        var methodType = 'PUT';
      }else{
        var urlParam = 'VisitService/VisitRecord.svc/SetAddInfoVisit';  
        var methodType = 'POST';
      }
      


      var dataJson =JSON.stringify({
        "Company_NO": $rootScope.currentUser.UserDetails.Company_No,
        "LOCATION_NO": $rootScope.currentUser.UserDetails.Location_No,
        "User_ID": 'ADMIN',
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

               $state.go('dashboard.visitDetail',{vid:$scope.params.vid})

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
            +'/'+$scope.params.vId+'/ADMIN';

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

    $scope.$on('$ionicView.beforeEnter', function() {
      
      //Call method when on bpDetail screen 
      if (($.inArray($state.current.name, ['dashboard.visitDetail']) !== -1)  || ($.inArray($state.current.name, ['dashboard.bpCreate']) !== -1 && $scope.params.vId!='') ) {
        $scope.VisitDetail();
      }
    
    });

 $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', '49503', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
});

