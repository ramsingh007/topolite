angular.module('topolite.services', [])

.service('webService', function($ionicLoading, $ionicPopup, $http, myConfig, $rootScope, $timeout) {
  var webService;
  webService = {
    webCall: function(urlParam, methodType, dataJson) {
      return $http({
        url: myConfig.apiUrl + urlParam,
        method: methodType,
        data: dataJson,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      });
    },
    showIonLoader: function() {
      $ionicLoading.show({
        template: 'Processing ...',
        animation: 'fade-in',
        noBackdrop: false,
        delay: 0
      });
    },
    hideIonLoader: function() {
      $ionicLoading.hide();
    },
    showPopup: function(title, btext) {
      return $ionicPopup.show({
        title: title,
        buttons: [
          {
            text: btext,
            type: 'button-positive'
          }
        ]
      });
    }
  };
  return webService;
});