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
    },
    // Used to fetch the index of json through uniqueID of json
      findInJson: function(key1, value, object) { //pass it the desired matching key value pairs
          var i = 0;
          for (var key in object) { //this will iterate through key1 - key3
              var current = object[key];
              if (current[key1] == value) {
                  console.log(key);
                  return i; //return the index
              }
              i++; //increment if no found
          }
          return -1;
      }
  };
  return webService;
});