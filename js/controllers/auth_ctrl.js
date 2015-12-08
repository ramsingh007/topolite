angular.module('topolite.auth_ctrl', [])

.controller('AuthCtrl', function($http,$timeout,$ionicSideMenuDelegate, $state, $stateParams, $scope, $rootScope, webService, $localStorage) {
  


  $scope.msg = ''; 		//display custom message
  $scope.signin = {};	// moel for signin form inputs
  $scope.geoFlag = false;
 
  $scope.signIn = function() {
    
    if(!$scope.geoFlag){
      webService.showPopup('Please enable location access and restart application!', $rootScope.title_close);
    }else{

          $scope.msg = '';
          if ($scope.signin.email == null) {
          $scope.msg = 'Please enter correct username!';
          } else if ($scope.signin.password == null) {
          $scope.msg = 'Please enter correct password!';
          }
          if ($scope.msg != '') {
          webService.showPopup($scope.msg, $rootScope.title_ok);
          } else {

          //$state.go('dashboard.home');

          webService.showIonLoader();  //show ionic loading

          var urlParam = 'LoginService/UserLoginService.svc/UserLogin/'+$scope.signin.email+'/'+$scope.signin.password;
          var methodType = 'GET'
          var dataJson = JSON.stringify({});
          webService.webCall(urlParam,methodType,dataJson)
          	 .then(function(respone){
                
                webService.hideIonLoader();//hide ionic loading
                if(respone.data.LoginUserResult.LoginMessage.Success){
          $rootScope.currentUser.UserDetails = $localStorage.currentUser.UserDetails = respone.data.LoginUserResult.UserDetails;

          // console.log($scope.signin.basicCheckValue);


          if ($scope.signin.basicCheckValue == true) {
          console.log($scope.signin.basicCheckValue);
          window.localStorage.setItem("username", $localStorage.currentUser.UserDetails.LoginName);
          window.localStorage.setItem("password", $localStorage.currentUser.UserDetails.LoginName);

          };

                    $state.go('dashboard.home');
                }else{
                    webService.showPopup(respone.data.LoginUserResult.LoginMessage.ErrorMsg, $rootScope.title_close);
                }

              },function(error){
          	  		webService.hideIonLoader();  //show ionic loading
          	  		webService.showPopup('Something went wrong! Please login again', $rootScope.title_close);
          	  });

          }

  }

  };


    $scope.onGeoSuccess = function(position) {
              var le ='';
              $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
                le = res.data.results[0].address_components.length;
                 $scope.geoFlag = true;
                 $scope.signin.email=window.localStorage.getItem("password");
                 $scope.signin.password=window.localStorage.getItem("password");
                 //console.log($scope.signin.email);
                 
                 if($scope.signin.email != null &&  $scope.signin.password != null) {
                      $scope.signIn();
                  }

                } ,function(err){
                  webService.showPopup('Network error!', $rootScope.title_close);
              });
             }

    $scope.onGeoError= function(error) {
      $scope.geoFlag = false;
        
webService.showPopup('Please enable location access and restart application!', $rootScope.title_ok)
 .then(function(respone){

  ionic.Platform.exitApp();

});


    } 

       $scope.getGeoLoc= function(){
        $scope.geoFlag = false;
            var options1 = {timeout: 2000, enableHighAccuracy: true }; // also try with false.
            navigator.geolocation.getCurrentPosition($scope.onGeoSuccess, $scope.onGeoError, options1);
        }

        
       // $timeout($scope.getGeoLocation(),1000);


  //event on beforeEnter
  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.getGeoLoc();

  });


});

