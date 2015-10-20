angular.module('topolite.VisitCtrl', [])

.controller('visit_Ctrl', function($state, $stateParams, $scope, $rootScope, webService,$localStorage,$http) {

   $scope.params = $stateParams;


   $scope.visitModel = {};
   $scope.visitModel.VISIT_TIME_FROM = new Date();
   $scope.visitModel.VISIT_TIME_TO = new Date();
   $scope.visitModel.VISIT_DATE = new Date();
   
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
           $state.go('dashboard.visitList');
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

  $scope.visitArea = [{
          id: 1,
          label: 'aLabel',
          subItem: { name: 'aSubItem' }
        }, {
          id: 2,
          label: 'bLabel',
          subItem: { name: 'bSubItem' }
        }];


   $scope.SaveVisit = function(){

    console.log($scope.visitModel);

     /* webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('dashboard.visitDetails');
  	   });
*/

    }
  /********************  Visit Add (Visit, Customer, Sales) Ends    *********************/


  /********************  Visit Add (Additional Info) Starts    *********************/
   $scope.AddVisitInfo = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('dashboard.visitDetails');
       });

    }
  /********************  Visit Add (Additional Info) Ends    *********************/



  /********************  Visit Add (Products) Starts    *********************/
   $scope.AddVisitProd = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('dashboard.visitDetails');
       });

    }
  /********************  Visit Add (Products) Ends    *********************/




  /********************  Visit Update Starts    *********************/
   $scope.UpdateVisit = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('dashboard.visitDetails');
       });

    }
  /********************  Visit Update Ends    *********************/



  /********************  Visit Contact Update Starts    *********************/
   $scope.UpdateVisitContact = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('dashboard.visitDetails');
       });

    }
  /********************  Visit Contact Update Ends    *********************/


  /********************  Visit Sales Update Starts    *********************/
   $scope.UpdateVisitSales = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('dashboard.visitDetails');
       });

    }
  /********************  Visit Sales Update Ends    *********************/



  /********************  Visit Info Update Starts    *********************/
   $scope.UpdateVisitInfo = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('dashboard.visitDetails');
       });

    }
  /********************  Visit Info Update Ends    *********************/



  /********************  Visit Prod Update Starts    *********************/
   $scope.UpdateVisitProd = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('dashboard.visitDetails');
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
});

