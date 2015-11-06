angular.module('topolite.dashboard_ctrl', [])

.controller('DashboardCtrl', function($ionicNavBarDelegate,$filter, $ionicSideMenuDelegate, $state, $localStorage, $http, $stateParams, $scope, $rootScope, webService) {
	 
$ionicNavBarDelegate.showBackButton(false);

 $scope.Company_No=$localStorage.currentUser.UserDetails.Company_No+'-'+$localStorage.currentUser.UserDetails.Location_No;

	 $scope.selLoc = {'Comp_Location':$scope.Company_No};

 $scope.UserLocation = [];
  $scope.ADDRESSl=[];
 // $scope.Company_No=$localStorage.currentUser.UserDetails.Company_No+'-'+$localStorage.currentUser.UserDetails.Location_No;
$scope.Attendence={};
$scope.Attendence.TimeIn='';
$scope.Attendence.Timeout='';


$scope.change_location= function() {

	var value =$scope.selLoc.Comp_Location;
	var values = value.split("-");
	$scope.COMPANY = values[0];
	$scope.LOCATION = values[1];

	$rootScope.currentUser.UserDetails.Location_No=$localStorage.currentUser.UserDetails.Location_No=$scope.LOCATION;
	$rootScope.currentUser.UserDetails.Company_No=$localStorage.currentUser.UserDetails.Company_No=$scope.COMPANY;
	//console.log($scope.selLoc);
	webService.showPopup('Location updated', $rootScope.title_ok);
}



   $scope.autoSignIn = function(){

		webService.showIonLoader();  //show ionic loading
		var urlParam = 'LoginService/UserLoginService.svc/GetLocation/'+$rootScope.currentUser.UserDetails.UserId;
		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetCompanyLocationResult.LoginMessage.Success){
		        $scope.UserLocation = respone.data.GetCompanyLocationResult.UserLocation;
		    }else{
		        webService.showPopup(respone.data.GetCompanyLocationResult.LoginMessage.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
		});
	}
	
	var onSuccess = function(position) {
		console.log('works');
      var le ='';
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
        le = res.data.results[0].address_components.length;
         
        } ,function(err){
          webService.showPopup('Network error!', $rootScope.title_close);
      });
     }
    var onError= function(error) {
        webService.showPopup(error, $rootScope.title_close);
    }
   $scope.getGeoLocation= function(){
    var options = {timeout: 2000, enableHighAccuracy: true }; // also try with false.
    webService.showIonLoader();  //show ionic loading
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}
     
     var onSuccess = function(position) {
      var le ='';
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
        le = res.data.results[0].address_components.length;
         
        $rootScope.attend = res.data.results[0].formatted_address;
         //alert($rootScope.ADDRESSl);
          webService.hideIonLoader();//hide ionic loading
        } ,function(err){
          webService.hideIonLoader();//hide ionic loading
          webService.showPopup('Network error!', $rootScope.title_close);
      });
     }
    var onError= function(error) {
        webService.hideIonLoader();//hide ionic loading
        webService.showPopup(error, $rootScope.title_close);
    }
  $scope.time_In= function(){
  	
		webService.showIonLoader();  //show ionic loading
		 var urlParam ='/AttendanceService/AttendanceService.svc/ModifyAttendance';  
    $scope.In_Location=$rootScope.attend;
    $scope.In_Time = $filter('date')($scope.Attendence.TimeIn, 'hh:mm');
// alert($scope.In_Location);
		var methodType ='PUT'
		var dataJson = JSON.stringify({
		 "ASS_Code":$rootScope.currentUser.UserDetails.LoginName,
        "In_Time":$scope.In_Time,
        "Out_Time":'00:00',
        "In_Location":$scope.In_Location,
        "Out_Location":'null'
        });

		 console.log(dataJson);
      
     

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             console.log(respone);

             if(respone.data.Messsage.Success){

              webService.showPopup(respone.data.Messsage.ErrorMsg, $rootScope.title_ok).then(function(success){
                //$state.go('visit.visitDetail', {vid:respone.data.Messsage.VisitCode});
              })

             }else{
                webService.showPopup(respone.data.Messsage.ErrorMsg, $rootScope.title_close);
             }

         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
		});
	}
	$scope.time_out= function(){
		webService.showIonLoader();  //show ionic loading
		 $scope.Out_Location=$rootScope.attend;
    $scope.Timeout = $filter('date')($scope.Attendence.Timeout, 'hh:mm');
		 var urlParam ='/AttendanceService/AttendanceService.svc/ModifyAttendance';  
        
		var methodType ='PUT'
	 var dataJson = JSON.stringify({
      "ASS_Code":$rootScope.currentUser.UserDetails.LoginName,
        "In_Time":'00:00',
        "Out_Time":$scope.Timeout,
        "In_Location":'null',
        "Out_Location":$scope.Out_Location
        });
    
  webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             console.log(respone);

             if(respone.data.Messsage.Success){

              webService.showPopup(respone.data.Messsage.ErrorMsg, $rootScope.title_ok).then(function(success){
                //$state.go('visit.visitDetail', {vid:respone.data.Messsage.VisitCode});
              })

             }else{
                webService.showPopup(respone.data.Messsage.ErrorMsg, $rootScope.title_close);
             }

         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
		});
	}
	
$scope.$on('$ionicView.beforeEnter', function() {
	 $scope.autoSignIn();
	


});




});

