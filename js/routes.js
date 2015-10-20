'use strict';
angular.module('topolite', ['ngCookies', 'ngStorage','ionic', 'ui.router', 'topolite.base_ctrl', 'topolite.auth_ctrl','topolite.Attendctrl', 'topolite.dashboard_ctrl', 'topolite.bp_ctrl','topolite.VisitCtrl','topolite.services', 'topolite.directives'])

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
    title: 'BPSearch'
  })
 .state('dashboard.bpMaster', {
    url: '/bp_master',
    templateUrl: 'templates/layouts/bp/bp_master.html',
    controller: 'BPctrl',
    title: 'BPResults'
  })
 .state('dashboard.bpDetail', {
    url: '/bp_detail/:bpId',
    templateUrl: 'templates/layouts/bp/bp_detail.html',
   controller: 'BPctrl',
    title: 'BPDetail'
  })
 .state('dashboard.bpCreate', {
    url: '/bp_create/:bpId',
    templateUrl: 'templates/layouts/bp/bp_create.html',
    controller: 'BPctrl',
    title: 'BPCreateUpdate'
  })
  .state('dashboard.addcontact', {
    url: '/add_contact/:bpId/:ID',
    templateUrl: 'templates/layouts/bp/add_contact.html',
    controller: 'BPctrl',
    title: 'BPContactCreateUpdate'
  })
 .state('dashboard.visitSearch', {
    url: '/visit_search',
    templateUrl: 'templates/layouts/visit/visit_search.html',
    controller: 'visit_Ctrl',
    title: 'Visit Search'
  })
 .state('dashboard.visitList', {
    url: '/visit_list',
    templateUrl: 'templates/layouts/visit/visit_list.html',
    controller: 'visit_Ctrl',
    title: 'Visit List'
  })
 .state('dashboard.visitDetails', {
    url: '/visit_details',
    templateUrl: 'templates/layouts/visit/visit_details.html',
    controller: 'visit_Ctrl',
    title: 'Visit Details'
  })
 .state('dashboard.addvisit', {
    url: '/add_visit',
    templateUrl: 'templates/layouts/visit/add_visit.html',
    controller: 'visit_Ctrl',
    title: 'Add Visit'
  })
 .state('dashboard.addproduct', {
    url: '/add_product',
    templateUrl: 'templates/layouts/visit/add_product.html',
    controller: 'visit_Ctrl',
    title: 'Add Product'
  })
 .state('dashboard.addinfo', {
    url: '/add_info',
    templateUrl: 'templates/layouts/visit/add_info.html',
    controller: 'visit_Ctrl',
    title: 'Add info'
  })
 
 .state('dashboard.attendance', {
    url: '/attendance',
    templateUrl: 'templates/layouts/attendance/attendance.html',
    controller: 'attend_Ctrl',
    title: 'attendance'
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
   $rootScope.visitResults = [];


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