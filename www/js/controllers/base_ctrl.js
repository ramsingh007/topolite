angular.module('topolite.base_ctrl', [])

.controller('BaseCtrl', function($state, $http,$stateParams, $scope, $rootScope, webService) {
  
$scope.back='sadsa';


 $scope.bpsearch = function() {

//  	webService.showIonLoader();  //show ionic loading

//       var urlParam = 'http://122.176.122.143:81/BPService/GetAllBPService.svc/GetBP/CBS/NOIDA/00002';
//       var methodType = 'GET'
// 	  var dataJson = JSON.stringify({'email':5,'pass':6});
// 	  webService.webCall(urlParam,methodType,dataJson)
// 	  .then(function(respone){
// 	  	webService.hideIonLoader();  //show ionic loading
// console.log(respone);
// 	  },function(error){
// 	  		webService.hideIonLoader();  //show ionic loading
// 	  		webService.showPopup('Something went wrong! Please login again', $rootScope.title_close);
// 	  });

delete $http.defaults.headers.common['X-Requested-With'];
$http.get('http://122.176.122.143:81/BPService/GetAllBPService.svc/GetBP/CBS/NOIDA/00002').success(function(data) {
    console.log(data);
});
}


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
});

