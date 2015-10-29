angular.module('topolite.dashboard_ctrl', [])

.controller('DashboardCtrl', function($state, $localStorage, $http, $stateParams, $scope, $rootScope, webService) {
  	 


	 $scope.Company_No=$localStorage.currentUser.UserDetails.Company_No+'-'+$localStorage.currentUser.UserDetails.Location_No;

  	 $scope.selLoc = {'Comp_Location':$scope.Company_No};

	 $scope.UserLocation = [];
	 $scope.Company_No=$localStorage.currentUser.UserDetails.Company_No+'-'+$localStorage.currentUser.UserDetails.Location_No;


    $scope.change_location= function() {

 var value =$scope.selLoc.Comp_Location;
    var values = value.split("-");
    $scope.COMPANY = values[0];
    $scope.LOCATION = values[1];
  

   $rootScope.currentUser.UserDetails.Location_No=$localStorage.currentUser.UserDetails.Location_No=$scope.LOCATION;
   $rootScope.currentUser.UserDetails.Company_No=$localStorage.currentUser.UserDetails.Company_No=$scope.COMPANY;
    	

    	console.log($scope.selLoc);

		webService.showPopup('Location has been changed', $rootScope.title_ok);
    }



    $scope.$on('$ionicView.beforeEnter', function() {

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
		  		webService.showPopup('Something went wrong! Please try again', $rootScope.title_close);
		});

	});




});

