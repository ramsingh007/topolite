angular.module('topolite.auth_ctrl', [])

.controller('AuthCtrl', function($state, $stateParams, $scope, $rootScope, webService, $localStorage) {
  


  $scope.msg = ''; 		//display custom message
  $scope.signin = {};	// moel for signin form inputs
 
  $scope.signIn = function() {




    $scope.msg = '';
    if ($scope.signin.email === '') {
      $scope.msg = 'Please enter correct email!';
    } else if ($scope.signin.password === '') {
      $scope.msg = 'Please enter correct password!';
    }
    if ($scope.msg !== '') {
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
  };

  //event on beforeEnter
  $scope.$on('$ionicView.beforeEnter', function() {
     $scope.signin = {};
     $scope.signin.email=window.localStorage.getItem("password");
     $scope.signin.password=window.localStorage.getItem("password");
     console.log($scope.signin.email);

  if($scope.signin.email != null &&  $scope.signin.password != null) {

            $scope.signIn();
        } else {
            return false;
        }
  });


});

