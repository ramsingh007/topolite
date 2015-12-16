angular.module('topolite.report_ctrl', [])
.controller('ReportCtrl', function($filter,$state,$scope,$rootScope, $ionicSideMenuDelegate,$localStorage,webService) {
 $scope.report={};
  $scope.Outstanding={};
  $scope.pending={};
 // $scope.CurrYear = new Date();
 $scope.CurrYear = $filter('date')(new Date(),'yyyy');//2014 like

 $scope.report.Year =$scope.CurrYear;
 $scope.report.Period='';
  $scope.report.Range='';
  $scope.report.FromsalesPerson='';
  $scope.report.TosalesPerson='';
  $scope.Outstanding.OUTFromCustomer='';
  $scope.Outstanding.OUTToCustomer='';
 $scope.Outstanding.date=new Date();
 $scope.pending.FromDate=new Date();
 $scope.pending.ToDate=new Date();




 

 $scope.GetPeriod = function(){
  		webService.showIonLoader();  //show ionic loading
		var urlParam = 'ReportService/ReportServices.svc/GetPeriod/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
				


		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    console.log(respone.data.GetTargetPeriodResult.Result);
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetTargetPeriodResult.Message.Success){
		    
		    $scope.Period=respone.data.GetTargetPeriodResult.Result;

		    }else{
		        webService.showPopup(respone.data.GetTargetPeriodResult.Message.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
		});
  }


$scope.Getyear = function(){
  		webService.showIonLoader();  //show ionic loading
		var urlParam = 'ReportService/ReportServices.svc/GetYear/'
					+$rootScope.currentUser.UserDetails.Company_No
				    +'/'+$rootScope.currentUser.UserDetails.Location_No;
				


		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    console.log(respone.data.GetTargetYearResult.Result);
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetTargetYearResult.Message.Success){
		    
		    $scope.year=respone.data.GetTargetYearResult.Result;

		    }else{
		        webService.showPopup(respone.data.GetTargetYearResult.Message.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
		});
  }




$scope.GetSalesPerson = function(){
  		webService.showIonLoader();  //show ionic loading
		var urlParam = 'ReportService/ReportServices.svc/GetSalesPerson/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+'null'
						+'/'+'null'
						+'/'+$rootScope.currentUser.UserDetails.UserId;
				


		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    console.log(respone.data.GetTargetPersonResult.Result);
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetTargetPersonResult.Message.Success){
		    
		    $scope.Period=respone.data.GetTargetPersonResult.Result;

		    }else{
		        webService.showPopup(respone.data.GetTargetPersonResult.Message.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
		});
  }

$scope.GetSalesPerson = function (query) {
		if (query!='') {
        webService.showIonLoader();  
   	 var urlParam = 'ReportService/ReportServices.svc/GetSalesPerson/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+query
						+'/'+'null'
						+'/'+$rootScope.currentUser.UserDetails.UserId;

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetTargetPersonResult.Message.Success){
                 return respone.data.GetTargetPersonResult.Result;
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
    }
    };
      

$scope.GetSalesPersonClicked = function (callback) {
    console.log(callback.item);
    // $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    // $scope.fillVisitArea();
};
$scope.GetSalesPersonRemoved = function (callback) {
   console.log(callback.item);
   // $scope.visitModel.CUSTOMER_NAME = '';
   // $scope.fillAreaArr.length = 0;
};
$scope.GetTOSalesPerson = function (query) {
	if (query!='') {
        webService.showIonLoader();  

        
   	 var urlParam = 'ReportService/ReportServices.svc/GetSalesPerson/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+'null'
						+'/'+query
						+'/'+$rootScope.currentUser.UserDetails.UserId;

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetTargetPersonResult.Message.Success){
                 return respone.data.GetTargetPersonResult.Result;
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
    }
    return[];
    };
      

$scope.GetTOSalesPersonClicked = function (callback) {
    console.log(callback.item);
    // $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    // $scope.fillVisitArea();
};
$scope.GetTOSalesPersonRemoved = function (callback) {
   console.log(callback.item);
   // $scope.visitModel.CUSTOMER_NAME = '';
   // $scope.fillAreaArr.length = 0;
};

 

$scope.GetRange = function(){
  		webService.showIonLoader();  //show ionic loading
		var urlParam = 'ReportService/ReportServices.svc/GetRange/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+$scope.report.Year
						+'/'+$scope.report.Period;
				


		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    console.log(respone.data.GetTargetRangeResult.Result);
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetTargetRangeResult.Message.Success){
		    
		    $scope.range=respone.data.GetTargetRangeResult.Result;

		    }else{
		        // webService.showPopup(respone.data.GetTargetRangeResult.Message.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
		});
  }


$scope.TargetResult = function(){

   console.log($scope.report);





	
 var msg='';

    if($scope.report.Period ==''){
      msg = "Please select Period!";
 
    
    }else if($scope.report.Range =='' && $scope.report.Period !=1 ){
    
     msg = "Please select Range!";
     
   }
    // else if($scope.bpModel.SALES_PERSON_NO ==''){
    //   msg = "Please enter Sales person";
    // }
    

    if(msg!='' ){

       webService.showPopup(msg, $rootScope.title_ok);
    
      
    }else{




 if($scope.report.TosalesPerson ==''){

$scope.report.TosalesPerson='null';

 }
if($scope.report.FromsalesPerson=='' ){

$scope.report.FromsalesPerson='null';

 }
 if ($scope.report.Period ==1) {

      $scope.report.Range =0; 

       };
	
	
			webService.showIonLoader();  //show ionic loading
		var urlParam = 'ReportService/ReportServices.svc/GetTarget/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+$scope.report.Year
						+'/'+'S'
						+'/'+$scope.report.Period
						+'/'+$scope.report.Range
						+'/'+$scope.report.FromsalesPerson
						+'/'+$scope.report.TosalesPerson
						+'/'+$rootScope.currentUser.UserDetails.UserId;

		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetTargetDataResult.Message.Success){
		    	
		    	 $rootScope.targetResult = respone.data.GetTargetDataResult.Result;
		    	 $state.go('report.target_acchievement_table');
		    }else{

              $scope.report.FromsalesPerson='';
  $scope.report.TosalesPerson='';
		        webService.showPopup(respone.data.GetTargetDataResult.Message.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
		});
  }


  }
//for search from cutomer

 $scope.FromCustomer = function (query) {
	if (query!='') {
        webService.showIonLoader();  

        
   	 var urlParam = 'ReportService/ReportServices.svc/GetFromCustomer/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
					    +'/'+query
					    +'/'+'null';
						

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetCustomerCodeResult.Message.Success){
                 return respone.data.GetCustomerCodeResult.Result;
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
    }
    return[];
    };
      

$scope.FromCustomerClicked = function (callback) {
    console.log(callback.item);
    // $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    // $scope.fillVisitArea();
};
$scope.FromCustomerRemoved = function (callback) {
   console.log(callback.item);
   // $scope.visitModel.CUSTOMER_NAME = '';
   // $scope.fillAreaArr.length = 0;
};


 //for search TO customer


 $scope.ToCustomer = function (query) {
	if (query!='') {
        webService.showIonLoader();  

        
   	 var urlParam = 'ReportService/ReportServices.svc/GetFromCustomer/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
					    +'/'+'null'
					    +'/'+query;
						

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            if(respone.data.GetCustomerCodeResult.Message.Success){
                 return respone.data.GetCustomerCodeResult.Result;
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
    }
    return[];
    };
      

$scope.ToCustomerClicked = function (callback) {
    console.log(callback.item);
    // $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    // $scope.fillVisitArea();
};
$scope.ToCustomerRemoved = function (callback) {
   console.log(callback.item);
   // $scope.visitModel.CUSTOMER_NAME = '';
   // $scope.fillAreaArr.length = 0;
};
///out standing report customers

$scope.OUTFromCustomer = function (query) {
	if (query!='') {
        webService.showIonLoader();  

        
   	 var urlParam = 'ReportService/ReportServices.svc/GetFromCustomer/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
					    +'/'+query
					    +'/'+'null';
						

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading


            // if(respone.data.GetCustomerCodeResult.Message.Success){
            //      return respone.data.GetCustomerCodeResult.Result;
            // }

             if(respone.data.GetCustomerCodeResult.Message.Success){
                 var x = [];
                 var dat = respone.data.GetCustomerCodeResult.Result;
                 for(var i in dat){
                    x.push({'Customer_Code':dat[i]['Customer_Code'],'Customer_Name':dat[i]['Customer_Name'],'label':dat[i]['Customer_Code']+' ( '+dat[i]['Customer_Name']+' )'});
                 }
                 return x;
            }

            /*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
    }
    return[];
    };
      

$scope.OUTFromCustomerClicked = function (callback) {
    console.log(callback.item);
    // $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    // $scope.fillVisitArea();
};
$scope.OUTFromCustomerRemoved = function (callback) {
   console.log(callback.item);
   // $scope.visitModel.CUSTOMER_NAME = '';
   // $scope.fillAreaArr.length = 0;
};


 //for search TO customer


 $scope.OUTToCustomer = function (query) {
	if (query!='') {
        webService.showIonLoader();  

        
   	 var urlParam = 'ReportService/ReportServices.svc/GetFromCustomer/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
					    +'/'+'null'
					    +'/'+query;
						

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            // if(respone.data.GetCustomerCodeResult.Message.Success){
            //      return respone.data.GetCustomerCodeResult.Result;
            // }
             if(respone.data.GetCustomerCodeResult.Message.Success){
                 var x = [];
                 var dat = respone.data.GetCustomerCodeResult.Result;
                 for(var i in dat){
                    x.push({'Customer_Code':dat[i]['Customer_Code'],'Customer_Name':dat[i]['Customer_Name'],'label':dat[i]['Customer_Code']+' ( '+dat[i]['Customer_Name']+' )'});
                 }
                 return x;
            }

            /*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
    }
    return[];
    };
      

$scope.OUTToCustomerClicked = function (callback) {
    console.log(callback.item);
    // $scope.Outstanding.OUTFromCustomer = callback.item.Customer_Name;
    // $scope.fillVisitArea();
};
$scope.OUTToCustomerRemoved = function (callback) {
   console.log(callback.item);
   // $scope.visitModel.CUSTOMER_NAME = '';
   // $scope.fillAreaArr.length = 0;
};


$scope.OutstandingReport = function(Outstanding){
// alert($scope.Outstanding.OUTFromCustomer);

	if ($scope.Outstanding.OUTFromCustomer=='') {

       $scope.Outstanding.OUTFromCustomer='null';

	};

	if ($scope.Outstanding.OUTToCustomer=='') {

		$scope.Outstanding.OUTToCustomer='null';
	};
	
console.log($scope.Outstanding.OUTFromCustomer);
	$scope.newoutfromdate = $filter('date')($scope.Outstanding.date, 'yyyy-MM-dd');
	console.log($scope.newfromdate);
	

	  webService.showIonLoader();  //show ionic loading
		var urlParam = 'ReportService/ReportServices.svc/GetCustomer/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+$scope.newoutfromdate
						+'/'+$scope.Outstanding.OUTFromCustomer
						+'/'+$scope.Outstanding.OUTToCustomer
						+'/'+$rootScope.currentUser.UserDetails.UserId;

		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetCustomerDataResult.Message.Success){
		    	 $rootScope.sdReport = respone.data.GetCustomerDataResult.Result;
		   
         // console.log($rootScope.OutstandingReport);
		   $state.go('report.customer_report_table');
		    }else{
		      
            webService.showPopup(respone.data.GetCustomerDataResult.Message.ErrorMsg, $rootScope.title_close);
		    $scope.Outstanding.OUTFromCustomer=='';
        $scope.Outstanding.OUTToCustomer=='';
        }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
		});


  }








  


  //search c report

// {From_Date}/{To_Date}/{From_Customer}/{To_Customer}/{USER_ID}")]
$scope.CReport = function(pending){

	if ($scope.pending.FromCustomer= 'undefined') {

       $scope.pending.FromCustomer='null';

	};

	if ($scope.pending.ToCustomer='undefined') {

		$scope.pending.ToCustomer='null';
	};
	


	$scope.newfromdate = $filter('date')($scope.pending.FromDate, 'yyyy-MM-dd');
	$scope.newTOdate = $filter('date')($scope.pending.ToDate, 'yyyy-MM-dd');
	console.log($scope.newdate);
	
	
			webService.showIonLoader();  //show ionic loading
		var urlParam = 'ReportService/ReportServices.svc/GetCForm/'
						+$rootScope.currentUser.UserDetails.Company_No
						+'/'+$rootScope.currentUser.UserDetails.Location_No
						+'/'+$scope.newfromdate
						+'/'+$scope.newTOdate
						+'/'+$scope.pending.FromCustomer
						+'/'+$scope.pending.ToCustomer
					    +'/'+$rootScope.currentUser.UserDetails.UserId;

		var methodType = 'GET'
		var dataJson = JSON.stringify({});
		webService.webCall(urlParam,methodType,dataJson)
		.then(function(respone){
	    
		    webService.hideIonLoader();//hide ionic loading
		    if(respone.data.GetCFormDataResult.Message.Success){
		    	
		   $rootScope.CReportResult = respone.data.GetCFormDataResult.Result;
		   $state.go('report.pending_report_table');
		    }else{
            $scope.pending.FromCustomer='';
            $scope.pending.ToCustomer='';
		        webService.showPopup(respone.data.GetCFormDataResult.Message.ErrorMsg, $rootScope.title_close);
		    }

		},function(error){
		  		webService.hideIonLoader();  //show ionic loading
		  		webService.showPopup('Webservice response error!', $rootScope.title_close);
		});


  }


  // for out standing report


$scope.$on('$ionicView.beforeEnter', function() {

  	$scope.Getyear();
  	$scope.GetPeriod();
    $scope.report.FromsalesPerson='';
    $scope.report.TosalesPerson='';
    $scope.Outstanding.OUTFromCustomer='';
    $scope.Outstanding.OUTToCustomer='';
    $scope.pending.FromCustomer='';
    $scope.pending.ToCustomer='';  	
 
    	if ($.inArray($state.current.name, ['report.pending_report']) !== -1) {
    	
    		     
    		    
      
      }




 
    	//Call method when on bpDetail screen	
    	// if (($.inArray($state.current.name, ['bp.bpDetail']) !== -1)  || ($.inArray($state.current.name, ['bp.bpCreate']) !== -1 && $scope.params.bpId!='') ) {
    	// 	$scope.BPgetDetail();
    	// }
    
    });
  


});
