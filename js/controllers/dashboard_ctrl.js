angular.module('topolite.dashboard_ctrl', [])

.controller('DashboardCtrl', function($ionicNavBarDelegate, $ionicSideMenuDelegate, $state, $localStorage, $http, $stateParams, $scope, $rootScope, webService) {
	 
$ionicNavBarDelegate.showBackButton(false);

 $scope.Company_No=$localStorage.currentUser.UserDetails.Company_No+'-'+$localStorage.currentUser.UserDetails.Location_No;

	 $scope.selLoc = {'Comp_Location':$scope.Company_No};

 $scope.UserLocation = [];
 // $scope.Company_No=$localStorage.currentUser.UserDetails.Company_No+'-'+$localStorage.currentUser.UserDetails.Location_No;


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
          webService.showPopup('Network problem!', $rootScope.title_close);
      });
     }
    var onError= function(error) {
        webService.showPopup(error, $rootScope.title_close);
    }

	$scope.getGeoLocation= function(){
    	var options = {timeout: 2000, enableHighAccuracy: true }; // also try with false.
	    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	}

$scope.$on('$ionicView.beforeEnter', function() {
	$scope.autoSignIn();  
});




});

