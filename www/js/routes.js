'use strict';
angular.module('topolite', ['ngCookies', 'ngStorage','ionic', 'ui.router', 'topolite.base_ctrl', 'topolite.auth_ctrl', 'topolite.dashboard_ctrl', 'topolite.bp_ctrl', 'topolite.services', 'topolite.directives'])

.constant('myConfig', {
  'apiUrl': 'http://122.176.122.143:81/'
})


.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

   $httpProvider.defaults.useXDomain = true;
   delete $httpProvider.defaults.headers.common['X-Requested-With'];
 $urlRouterProvider.otherwise('/sign_in');

 return $stateProvider.state('signIn', {
    url: '/sign_in',
    templateUrl: 'templates/layouts/sign_in.html',
    controller: 'AuthCtrl',
    title: 'Sign In'
  })
 .state('dashboard', {
    abstract: true,
    url: '/dashboard',
    templateUrl: 'templates/layouts/dashboard/index.html'
  })
 .state('dashboard.home', {
    url: '/home',
    templateUrl: 'templates/layouts/dashboard/home.html',
    controller: 'DashboardCtrl',
    title: 'Dashboard'
  })
 .state('dashboard.bpSearch', {
    url: '/bp_search',
    templateUrl: 'templates/layouts/bp/bp_search.html',
    controller: 'BPctrl',
    title: 'dashboard2s'
  })
 .state('dashboard.bpMaster', {
    url: '/bp_master',
    templateUrl: 'templates/layouts/bp/bp_master.html',
    controller: 'BPctrl',
    title: 'dashboard2s'
  })
 .state('dashboard.bpCreate', {
    url: '/bp_create',
    templateUrl: 'templates/layouts/bp/bp_create.html',
    controller: 'BPctrl',
    title: 'dashboard2s'
  })
 .state('dashboard.editContact', {
    url: '/edit_contact',
    templateUrl: 'templates/layouts/edit_contact.html',
    // controller: 'BaseCtrl',
    title: 'dashboard2'
  })

 .state('dashboard.visitSearch', {
    url: '/visit_search',
    templateUrl: 'templates/layouts/visit_record1.html',
    // controller: 'BaseCtrl',
    title: 'Visit Search'
  })


/*
 .state('bpSearch', {
    url: '/bp_search',
    templateUrl: 'templates/layouts/bp_search.html',
    controller: 'BaseCtrl',
    title: 'New Page'
  }).state('editContact', {
    url: '/edit_contact',
    templateUrl: 'templates/layouts/edit_contact.html',
    controller: 'BaseCtrl',
    title: 'New Page'
  }).state('viewDetail', {
    url: '/view_detail',
    templateUrl: 'templates/layouts/view_detail.html',
    controller: 'BaseCtrl',
    title: 'New Page'
  }).state('contact', {
    url: '/contact',
    templateUrl: 'templates/layouts/contact.html',
    controller: 'BaseCtrl',
    title: 'New Page'
  }).state('bpMaster', {
    url: '/bp_master',
    templateUrl: 'templates/layouts/bp_master.html',
    controller: 'BaseCtrl',
    title: 'New Page'
  }).state('VisitRecord', {
    url: '/visit_record',
    templateUrl: 'templates/layouts/visit_record.html',
    controller: 'BaseCtrl',
    title: 'New Page'
  }).state('VisitRecord2', {
    url: '/visit_record2',
    templateUrl: 'templates/layouts/visit_record2.html',
    controller: 'BaseCtrl',
    title: 'New Page'
  }).state('VisitRecord3', {
    url: '/visit_record3',
    templateUrl: 'templates/layouts/visit_record3.html',
    controller: 'BaseCtrl',
    title: 'New Page'
  }).state('VisitRecord1', {
    url: '/visit_record1',
    templateUrl: 'templates/layouts/visit_record1.html',
    controller: 'BaseCtrl',
    title: 'New Page'
  })

*/
})

.run(function($rootScope,$state,$localStorage) {
  $rootScope.title_ok = 'Ok';
  $rootScope.title_close = 'Close';

  $rootScope.bpResults = [];


  $rootScope.currentUser = $localStorage.currentUser;
  $rootScope.$watch('currentUser', function() {
    if($rootScope.currentUser == undefined){
      $rootScope.currentUser = $localStorage.currentUser = {}
    }
  });


  //Global Method to traverse from view itself
  $rootScope.goToState = function(toState, param) {
    if (param === 'undefined') {
      $state.go(toState);
    } else {
      $state.go(toState, param);
    }
  };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});