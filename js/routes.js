'use strict';
angular.module('topolite', ['ngCookies', 'ngStorage','ionic', 'ui.router', 'topolite.base_ctrl', 'topolite.auth_ctrl','topolite.Attendctrl', 'topolite.dashboard_ctrl', 'topolite.bp_ctrl','topolite.visit_ctrl','topolite.report_ctrl','topolite.services', 'topolite.directives'])

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
    templateUrl: 'templates/layouts/index.html'
  })
 .state('dashboard.home', {
    url: '/home',
    views: {
		'dashboard': {
			templateUrl: 'templates/layouts/dashboard/home.html',
			controller: 'DashboardCtrl',
			title: 'Dashboard'
		}
	}
  })

 
 .state('bp', {
    abstract: true,
    url: '/bp',
    templateUrl: 'templates/layouts/index.html'
  })
 .state('bp.bpSearch', {
    url: '/bp_search',
	views: {
		'dashboard': {
			templateUrl: 'templates/layouts/bp/bp_search.html',
			controller: 'BPctrl',
			title: 'BPSearch'
		}
	}
  })
 .state('bp.bpMaster', {
    url: '/bp_master',
	 views: {
		'dashboard': {
			templateUrl: 'templates/layouts/bp/bp_master.html',
			controller: 'BPctrl',
			title: 'BPResults'
		}
	}
  })
 .state('bp.bpDetail', {
    url: '/bp_detail/:bpId',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/bp/bp_detail.html',
			controller: 'BPctrl',
			title: 'BPDetail'
		}
	}
  })
 .state('bp.bpCreate', {
    url: '/bp_create/:bpId',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/bp/bp_create.html',
			controller: 'BPctrl',
			title: 'BPCreateUpdate'
		}
	}
  })
 .state('bp.addcontact', {
    url: '/add_contact/:bpId/:ID',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/bp/add_contact.html',
			controller: 'BPctrl',
			title: 'BPContactCreateUpdate'
		}
	}
  })


 .state('visit', {
    abstract: true,
    url: '/visit',
    templateUrl: 'templates/layouts/index.html'
  })
 .state('visit.visitSearch', {
    url: '/visit_search',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/visit_search.html',
			controller: 'VisitCtrl',
			title: 'Visit Search'
		}
	}
    
  })
 .state('visit.visitList', {
    url: '/visit_list',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/visit_list.html',
			controller: 'VisitCtrl',
			title: 'Visit List'
		}
	}
   
  })
 .state('visit.visitDetail', {
    url: '/visit_detail/:vId',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/visit_details.html',
			controller: 'VisitCtrl',
			title: 'Visit Details'
		}
	}
    
  })
 .state('visit.addVisit', {
    url: '/add_visit',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/add_visit.html',
			controller: 'VisitCtrl',
			title: 'Add Visit'
		}
	}
   
  })
 .state('visit.updateVisit', {
    url: '/update_visit/:vId',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/add_info.html',
			controller: 'VisitCtrl',
			title: 'Update Visit'
		}
	}
   
  })

 .state('visit.add_salesperson', {
    url: '/add_salesperson/:vid/:lid',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/add_salesperson.html',
			controller: 'VisitCtrl',
			title: 'Update Visit'
		}
	}
   
  })



 .state('visit.addSales', {
    url: '/add_sales/:vid/:pId',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/add_info.html',
			controller: 'VisitCtrl',
			title: 'Update Sales'
		}
	}
    
  })

.state('visit.addContact', {
   url: '/add_contact/:vid/:cid',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/add_contact.html',
			controller: 'VisitCtrl',
			title: 'Update Contact'
		}
	}
   
  })

   

 .state('visit.addProduct', {
 url: '/add_product/:vid/:pId',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/add_product.html',
			controller: 'VisitCtrl',
			title: 'Add / Update Product'
		}
	}

  })

 .state('visit.addInfo', {
    url: '/add_info/:vid/:infoId',

	views: {
		'dashboard': {
			templateUrl:'templates/layouts/visit/add_info.html',
			controller: 'VisitCtrl',
			title: 'Add / Update info'
		}
	}
   
  })
 
 
 .state('dashboard.attendance', {
    url: '/attendance',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/attendance/attendance.html',
			controller: 'attend_Ctrl',
			title:'attendance'
		}
	}
   
  })
  
  
 .state('report', {
    abstract: true,
    url: '/report',
    templateUrl: 'templates/layouts/index.html'
  })
   .state('report.home', {
    url: '/home',
	views: {
		'dashboard': {
			templateUrl: 'templates/layouts/reports/reports.html',
			controller: 'ReportCtrl',
			title: 'Report'
		}
	}
  })
  .state('report.customer_report', {
    url: '/customer_report',
	views: {
		'dashboard': {
			templateUrl: 'templates/layouts/reports/customer_report.html',
			controller: 'ReportCtrl',
			title: 'Customer report'
		}
	}
  })
 .state('report.customer_report_table', {
    url: '/customer_report_table',
	 views: {
		'dashboard': {
			templateUrl: 'templates/layouts/reports/customer_report_table.html',
			controller: 'ReportCtrl',
			title: 'Customer report table'
		}
	}
  })
 .state('report.pending_report', {
    url: '/pending_report',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/reports/pending_report.html',
			controller: 'ReportCtrl',
			title: 'Pending report'
		}
	}
  })
 .state('report.pending_report_table', {
    url:'/pending_report_table',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/reports/pending_report_table.html',
			controller: 'ReportCtrl',
			title: 'Pending reports table'
		}
	}
  })
 .state('report.target_acchievement', {
    url: '/target_acchievement',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/reports/target_acchievement.html',
			controller: 'ReportCtrl',
			title:'target achievement'
		}
	}
  })
  .state('report.target_acchievement_table', {
    url: '/target_acchievement_table',
	views: {
		'dashboard': {
			templateUrl:'templates/layouts/reports/target_acchievement_table.html',
			controller: 'ReportCtrl',
			title: 'target achievement table'
		}
	}
  })
  
  
  

})

.run(function($rootScope,$state,$localStorage,$http, webService) {
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

.run(function($ionicPlatform,$state) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

});