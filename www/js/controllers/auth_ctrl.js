angular.module('topolite.auth_ctrl', [])

.controller('AuthCtrl', function($state, $stateParams, $scope, $rootScope, webService) {
  


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

    	$state.go('dashboard.home');

      /*webService.showIonLoader();  //show ionic loading

      var urlParam = 'login';
      var methodType = 'GET'
	  var dataJson = JSON.stringify({'email':$scope.signin.email,'pass':$scope.signin.password});
	  webService.webCall(urlParam,methodType,dataJson)
	  .then(function(respone){
	  	webService.hideIonLoader();  //show ionic loading

	  },function(error){
	  		webService.hideIonLoader();  //show ionic loading
	  		webService.showPopup('Something went wrong! Please login again', $rootScope.title_close);
	  });*/

    }
  };

  //event on beforeEnter
  $scope.$on('$ionicView.beforeEnter', function() {
     $scope.signin = {};
  });


});

