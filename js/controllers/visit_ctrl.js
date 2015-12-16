angular.module('topolite.visit_ctrl', [])

.controller('VisitCtrl', function($ionicSideMenuDelegate, $state,$ionicScrollDelegate, $location,$stateParams, $scope, $rootScope, webService,$localStorage,$http,$filter) {

   $scope.params = $stateParams;
   //console.log($scope.params);
   $scope.visitModel = {};
   $scope.visitModel.DOC_SERIES = '';
   // $scope.visitModel.SALES_PERSON_NO = $localStorage.currentUser.UserDetails.Company_No;
   $scope.currDate = new Date(); //$filter('date')(new Date(), 'dd/MM/yyyy');
   
   $scope.fillAreaArr = [];
   $scope.fillContactArr = [];
   $scope.fillSalesArr = [];
   
   
   $scope.fillVisitDoc = function(){
     webService.showIonLoader();  //show ionic loading
     var urlParam = 'VisitService/VisitRecord.svc/GetDocSeries/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/43';

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.DocSeriesResult.Messsage.Success){
          $scope.visitModel.DOC_SERIES = respone.data.DocSeriesResult.Num_Type.DocNo;
        }else{
            webService.showPopup(respone.data.GetBPByNameResult.Messsage.ErrorMsg, $rootScope.title_close);
        }

    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Webservice response error!', $rootScope.title_close);
    });
   }
   
   
   
  $scope.getVisitSalesID = function(query,idx){
      
      console.log(idx);

      if(query!=null){
        var urlParam = 'VisitService/VisitRecord.svc/GetSalesPerson/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+$rootScope.currentUser.UserDetails.LoginName
            +'/null'
            +'/'+$rootScope.currentUser.UserDetails.LoginName

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
          
            if(respone.data.SalePersonDetailResult.Messsage.Success){
                
                var x = [];
                 var dat = respone.data.SalePersonDetailResult.Result;
                 for(var i in dat){
                    x.push({'SALES_PERSON_NO':dat[i]['SALES_PERSON_NO'],'SALES_PERSON_NAME':dat[i]['SALES_PERSON_NAME'],'label':dat[i]['SALES_PERSON_NO']+' ( '+dat[i]['SALES_PERSON_NAME']+' )'});
                 }


                return x
            }/*else{
                return [{ 'CUSTOMER_NO':respone.data.GetCustomerIDResult.Messsage.ErrorMsg }];
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
      }
      return [];

}



$scope.getVisitSalesIDClicked = function (callback,idx) {
    //console.log(callback.item);
    //console.log(idx);
    $scope.visitModel.Sales[idx]['SALES_PERSON_NO'] = callback.item.SALES_PERSON_NO;
    $scope.visitModel.Sales[idx]['SALES_PERSON_NAME'] = callback.item.SALES_PERSON_NAME;
};

$scope.getVisitSalesIDRemoved = function (callback,idx) {
   //console.log(callback.item);
   //console.log(idx);
   $scope.visitModel.Sales[idx]['SALES_PERSON_NO'] = '';
   $scope.visitModel.Sales[idx]['SALES_PERSON_NAME'] = '';
};

  
  $scope.setVisitSelSales = function(idx){

    var id = webService.findInJson('SALES_PERSON_NO',$scope.visitModel.Sales[idx]['SALES_PERSON_NO'],$scope.fillSalesArr);
      $scope.visitModel.Sales[idx]['SALES_PERSON_NAME'] = $scope.fillSalesArr[id]['SALES_PERSON_NAME'];
  }
   
 

  $scope.showArea = true;
  $scope.fillVisitArea = function(){
      $scope.showArea = true;
      webService.showIonLoader();  //show ionic loading
      var urlParam = 'VisitService/VisitRecord.svc/GetCustomerLocation/'
              +$rootScope.currentUser.UserDetails.Company_No
              +'/'+$rootScope.currentUser.UserDetails.Location_No
              +'/'+$scope.visitModel.CUSTOMER_NO

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.CustomerLocationResult.Messsage.Success){
          $scope.fillAreaArr = respone.data.CustomerLocationResult.VisitLocation;
          $scope.showArea = false;
        }else{
            webService.showPopup(respone.data.CustomerLocationResult.Messsage.ErrorMsg, $rootScope.title_close);
        }

    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Webservice response error!', $rootScope.title_close);
    });
   }


   $scope.showContact = true;
   $scope.fillVisitContacts = function(arCode){
    $scope.showContact = true;

    $scope.visitModel.Contact = [{'CUST_CONTACT_PERSON':'',
                                  'CONTACT_POSITION':'',
                                  'MOBILE_NO':'',
                                  'EMAIL':'',
                                 }];


      webService.showIonLoader();  //show ionic loading
      var urlParam = 'VisitService/VisitRecord.svc/GetContactPerson/'
              +$rootScope.currentUser.UserDetails.Company_No
              +'/'+$rootScope.currentUser.UserDetails.Location_No
              +'/'+$scope.visitModel.CUSTOMER_NO
              +'/'+arCode
              +'/null';

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.ContactPersonDetailResult.Messsage.Success){
          $scope.fillContactArr = respone.data.ContactPersonDetailResult.Result;
          $scope.showContact = false;
        }else{
            // webService.showPopup(respone.data.ContactPersonDetailResult.Messsage.ErrorMsg, $rootScope.title_close);
        }

    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Webservice response error!', $rootScope.title_close);
    });
   }

   $scope.setVisitSelContact =  function(idx){
    var id = webService.findInJson('CONTACT_PERSON',$scope.visitModel.Contact[idx]['CUST_CONTACT_PERSON'],$scope.fillContactArr);
    $scope.visitModel.Contact[idx]['CONTACT_POSITION'] = $scope.fillContactArr[id]['DESIGNATION'];
    $scope.visitModel.Contact[idx]['EMAIL'] = $scope.fillContactArr[id]['EMAIL']; 
    $scope.visitModel.Contact[idx]['MOBILE_NO'] = $scope.fillContactArr[id]['MOBILE'];
   }




  $scope.getCustomID = function (query) {

    if(query!=null){

        webService.showIonLoader();  //show ionic loading
        var urlParam = 'VisitService/VisitRecord.svc/GetCustomer/'
                +$rootScope.currentUser.UserDetails.Company_No
                +'/'+$rootScope.currentUser.UserDetails.Location_No
                +'/'+query
                +'/null'
                +'/'+$rootScope.currentUser.UserDetails.LoginName

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading
            // if(respone.data.GetCustomerIDResult.Messsage.Success){
            //      return respone.data.GetCustomerIDResult.Result;
            // }


 if(respone.data.GetCustomerIDResult.Messsage.Success){
                 var x = [];
                 var dat = respone.data.GetCustomerIDResult.Result;
                 for(var i in dat){
                    x.push({'CUSTOMER_NO':dat[i]['CUSTOMER_NO'],'CUSTOMER_NAME':dat[i]['CUSTOMER_NAME'],'label':dat[i]['CUSTOMER_NO']+' ( '+dat[i]['CUSTOMER_NAME']+' )'});
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
      return [];
    };

$scope.getCustomIDClicked = function (callback) {
    console.log(callback.item);
    $scope.visitModel.CUSTOMER_NO = callback.item.CUSTOMER_NO;
    $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    $scope.fillVisitArea();
};
$scope.getCustomIDRemoved = function (callback) {
   console.log(callback.item);
   $scope.visitModel.CUSTOMER_NAME = '';
   $scope.fillAreaArr.length = 0;
};


$scope.getCustomNAME = function (query) {
        if(query!=null){
        webService.showIonLoader();  //show ionic loading
        var urlParam = 'VisitService/VisitRecord.svc/GetCustomer/'
                +$rootScope.currentUser.UserDetails.Company_No
                +'/'+$rootScope.currentUser.UserDetails.Location_No
                +'/null'
                +'/'+query
                +'/'+$rootScope.currentUser.UserDetails.LoginName

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          
            webService.hideIonLoader();//hide ionic loading

            // if(respone.data.GetCustomerIDResult.Messsage.Success){
            //     return respone.data.GetCustomerIDResult.Result;
            // }

if(respone.data.GetCustomerIDResult.Messsage.Success){
                 var x = [];
                 var dat = respone.data.GetCustomerIDResult.Result;
                 for(var i in dat){
                    x.push({'CUSTOMER_NO':dat[i]['CUSTOMER_NO'],'CUSTOMER_NAME':dat[i]['CUSTOMER_NAME'],'label':dat[i]['CUSTOMER_NO']+' ( '+dat[i]['CUSTOMER_NAME']+' )'});
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
      return [];
    };

$scope.getCustomNAMEClicked = function (callback) {
    //console.log(callback.item);
    $scope.visitModel.CUSTOMER_NO = callback.item.CUSTOMER_NO;
    $scope.visitModel.CUSTOMER_NAME = callback.item.CUSTOMER_NAME;
    $scope.fillVisitArea();

};
$scope.getCustomNAMERemoved = function (callback) {
     //console.log(callback.item);
   $scope.visitModel.CUSTOMER_NO = '';
   $scope.fillAreaArr.length = 0;
};

$scope.arCode = '';
$scope.getCustConatct = function(){
  console.log($scope.visitModel.AREA_NAME);
  $scope.arCode = $scope.visitModel.AREA_NAME.split('-')
  if($scope.arCode[0]!=''){
    $scope.fillVisitContacts($scope.arCode[0]);
  }
}

/* Email Validation */
$scope.ValidateEmail = function(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    webService.showPopup('You have entered an invalid email address!', $rootScope.title_ok);
    return (false)
}

   $scope.initVisitModel = function(){
       //$scope.visitModel = {};
       $scope.visitModel.VISIT_ID = '';
       $scope.visitModel.CUSTOMER_NO = '';
       $scope.visitModel.CUSTOMER_NAME = '';
       $scope.visitModel.AREA_NAME = '';
       $scope.visitModel.ADDRESS = '';
       $scope.visitModel.REMARK = '';
       $scope.visitModel.VISIT_DETAILS = '';
       $scope.visitModel.VISIT_DATE = $scope.currDate;
       $scope.visitModel.VISIT_TIME_FROM = '';
       $scope.visitModel.VISIT_TIME_TO = '';
   
       $scope.visitModel.Contact = [{
                                    'CUST_CONTACT_PERSON':'',
                                    'CONTACT_POSITION':'',
                                    'MOBILE_NO':'',
                                    'EMAIL':'',
                                   }];
       
       $scope.visitModel.Sales = [{
                                    'SALES_PERSON_NO':'',
                                    'SALES_PERSON_NAME':'',
                                    'NEXT_ACTION':'',
                                    'NEXT_ACTION_DATE':'',
                                    'NEXT_ACTION_TIME':'',
                                    'ALERT':'N',
                                    'ALERT_DATE':'',
                                    'ALERT_TIME':''
                                   }];

      //console.log($scope.visitModel);
    }  

   $scope.initVisitModel();   



/********************  Get location Starts   *********************/

 $scope.getGeoLocation= function(){
    var options = {timeout: 2000, enableHighAccuracy: true }; // also try with false.
    webService.showIonLoader();  //show ionic loading
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}
     
     var onSuccess = function(position) {
      var le ='';
      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true').then(function(res){
        le = res.data.results[0].address_components.length;
          $scope.visitModel.ADDRESS = res.data.results[0].formatted_address;
          webService.hideIonLoader();//hide ionic loading
        } ,function(err){
          webService.hideIonLoader();//hide ionic loading
          webService.showPopup('Network error!', $rootScope.title_close);
      });
     }
    var onError= function(error) {
        webService.hideIonLoader();//hide ionic loading
        webService.showPopup('Unable to access location!', $rootScope.title_close);
    }

/********************  Get location  ends  *********************/

   



  /********************  Visit Search Starts    *********************/
  $scope.visitSearch = {};
  $scope.visitSearch.visitId = null;

  $scope.Visitsearch = function(){
    $rootScope.visitResults.length = 0; //empty the BP Result

    if( $scope.visitSearch.visitId== ''){
      $scope.visitSearch.visitId = null;
    }

    webService.showIonLoader();  //show ionic loading
    var urlParam = 'VisitService/VisitRecord.svc/GetVisitRecord/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+$scope.visitSearch.visitId
            +'/'+$rootScope.currentUser.UserDetails.LoginName;

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.GetVisitRecordIDResult.Messsage.Success){
           $rootScope.visitResults = respone.data.GetVisitRecordIDResult.Result;
           $state.go('visit.visitList');
        }else{
            webService.showPopup(respone.data.GetVisitRecordIDResult.Messsage.ErrorMsg, $rootScope.title_close);
        }
    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Webservice response error!', $rootScope.title_close);
    });
    
  }


  $scope.getVisitID = function (query) {
        if(query!=null){
        webService.showIonLoader();  //show ionic loading
        var urlParam = 'VisitService/VisitRecord.svc/GetVisitRecord/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+query
            +'/'+$rootScope.currentUser.UserDetails.LoginName

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
            
            webService.hideIonLoader();//hide ionic loading
            // if(respone.data.GetVisitRecordIDResult.Messsage.Success){
            //    return respone.data.GetVisitRecordIDResult.Result;
            // }

 if(respone.data.GetVisitRecordIDResult.Messsage.Success){
                 var x = [];
                 var dat = respone.data.GetVisitRecordIDResult.Result;
                 for(var i in dat){
                    x.push({'VISIT_ID':dat[i]['VISIT_ID'],'CUSTOMER_NAME':dat[i]['CUSTOMER_NAME'],'label':dat[i]['VISIT_ID']+' ( '+dat[i]['CUSTOMER_NAME']+' )'});
                 }
                 return x;
            }




            /*else{
                webService.showPopup(respone.data.GetVisitRecordIDResult.Messsage.ErrorMsg, $rootScope.title_close);
            }*/

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

        return modelItem;
      }
      return [];
    };

$scope.getVisitIDClicked = function (callback) {
    //console.log(callback.item);
    $scope.visitSearch.visitId = callback.item.VISIT_ID;

};
$scope.getVisitIDRemoved = function (callback) {
     //console.log(callback.item);
   $scope.visitSearch.visitId = '';
};



  
  /********************  Visit Search Ends    *********************/

  


  /********************  Visit Add (Visit, Customer, Sales) Starts    *********************/

   $scope.SaveVisit = function(wsType){

    var msg ='';
    var ctMsg ='';
    var saleMsg ='';
     var eleId = '';
    
    if($scope.visitModel.CUSTOMER_NO == ''){
      msg = "Please enter customer no!";
      eleId = 'customerno';
    }else if($scope.visitModel.CUSTOMER_NAME ==''){
      msg = "Please enter customer name!";
      eleId = 'CUSTOMER_NAME';
    }else if($scope.visitModel.AREA_NAME ==''){
      msg = "Please select area!";
      eleId = 'AREA_NAME';
    }else if($scope.visitModel.ADDRESS ==''){
      msg = "Please enter address!";
      eleId = 'ADDRESS';
    }

    for(var j in $scope.visitModel.Contact){
        
        if($scope.visitModel.Contact[j]['CUST_CONTACT_PERSON'] == ''){
          ctMsg = "Please enter contact person!";
        }else if($scope.visitModel.Contact[j]['CONTACT_POSITION'] ==''){
          ctMsg = "Please enter designation!";
        }else if($scope.visitModel.Contact[j]['MOBILE_NO'] ==''){
          ctMsg = "Please enter mobile no!";
        }
        console.log($scope.visitModel.Contact);

        if(ctMsg!=''){break;}
        j++;
    }


    for(var i in $scope.visitModel.Sales){
        
        if($scope.visitModel.Sales[i]['SALES_PERSON_NO'] == ''){
          saleMsg = "Please select sales no!";
        }else if($scope.visitModel.Sales[i]['SALES_PERSON_NAME'] ==''){
          saleMsg = "Please enter sales name!";
        }else if($scope.visitModel.Sales[i]['NEXT_ACTION'] !='' && $scope.visitModel.Sales[i]['NEXT_ACTION_DATE'] == ''){
          saleMsg = "Please enter next action date!";
        }else if($scope.visitModel.Sales[i]['NEXT_ACTION'] !='' && $scope.visitModel.Sales[i]['NEXT_ACTION_TIME'] == ''){
          saleMsg = "Please enter next action time!";
        }else if($scope.visitModel.Sales[i]['ALERT'] =='1' && $scope.visitModel.Sales[i]['ALERT_DATE'] == ''){
          saleMsg = "Please enter alert date!";
        }else if($scope.visitModel.Sales[i]['ALERT'] =='1' && $scope.visitModel.Sales[i]['ALERT_TIME'] == ''){
          saleMsg = "Please enter alert time!";
        }

        if(saleMsg!=''){break;}
        i++;
    }


    if(msg!=''){
        var p = webService.showPopup(msg, $rootScope.title_ok);
        p.then(function(res){
            $location.hash(eleId);
            $ionicScrollDelegate.anchorScroll([1]);
        });
    }else if(ctMsg!=''){
        webService.showPopup(ctMsg, $rootScope.title_ok);
    }else if(saleMsg!=''){
        webService.showPopup(saleMsg, $rootScope.title_ok);
    }else{

      if(wsType == 'Add'){
        var urlParam = 'VisitService/VisitRecord.svc/SetAllVisit';  
        var methodType = 'POST';
        $scope.visitModel.VISIT_ID = '';
      }else if(wsType == 'Update'){
        var urlParam = 'VisitService/VisitRecord.svc/ModifyAllVisit';  
        var methodType = 'PUT';
      }else if(wsType == 'Authorize'){
        var urlParam = 'VisitService/VisitRecord.svc/AuthorizeAllVisit';  
        var methodType = 'PUT';
      }





      if($scope.visitModel.VISIT_TIME_FROM == ''){
        $scope.visitModel.VISIT_TIME_FROM = '0.00';
      }


      if($scope.visitModel.VISIT_TIME_TO == ''){
        $scope.visitModel.VISIT_TIME_TO = '0.00';
      }

      var dataJson =angular.toJson({
                                    "Company_no": $rootScope.currentUser.UserDetails.Company_No,
                                    "LOCATION_no": $rootScope.currentUser.UserDetails.Location_No,
                                    "USER_ID": $rootScope.currentUser.UserDetails.LoginName,
                                    "VISIT_DETAILS": $scope.visitModel.VISIT_DETAILS,
                                    "ADDRESS": $scope.visitModel.ADDRESS,
                                    "ADD_ID": $scope.visitModel.AREA_NAME.split('-')[0],
                                    "CUSTOMER_NAME": $scope.visitModel.CUSTOMER_NAME,
                                    "CUSTOMER_NO": $scope.visitModel.CUSTOMER_NO,
                                    "NUM_TYPE_NO": $scope.visitModel.DOC_SERIES,
                                    "VISIT_ID": $scope.visitModel.VISIT_ID,
                                    "REMARK": $scope.visitModel.REMARK,
                                    "VISIT_DATE": $filter('date')($scope.visitModel.VISIT_DATE, 'MM/dd/yyyy'),
                                    "VISIT_TIME_FROM": $scope.visitModel.VISIT_TIME_FROM,
                                    "VISIT_TIME_TO": $scope.visitModel.VISIT_TIME_TO,
                                    "Sale": webService.processObjectLine('Sales',$scope.visitModel.Sales),
                                    "SaleContact": webService.processObjectLine('Contact',$scope.visitModel.Contact)
                                });
    
      console.log(urlParam);
      console.log(methodType);
      console.log(dataJson);

      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             console.log(respone);

             if(respone.data.Messsage.Success){

              webService.showPopup(respone.data.Messsage.ErrorMsg, $rootScope.title_ok).then(function(success){
                $state.go('visit.visitDetail', {vid:respone.data.Messsage.VisitCode});
              })

             }else{
                webService.showPopup(respone.data.Messsage.ErrorMsg, $rootScope.title_close);
             }

         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });


    }


  }
  /********************  Visit Add (Visit, Customer, Sales) Ends    *********************/


  /********************  Visit Add (Additional Info) Starts    *********************/



  
   $scope.visitInfoOrder = [{
          id: '-1',
          name: 'Select'},
      {
          id: 'C1',
          name: 'Yes'},
      {
          id: 'C2',
          name: 'No'}];

  $scope.visitInfo= {};
  $scope.visitInfo.ORDER_RECEIVED = '-1';
  $scope.visitInfo.DEMO_PERFORMED = '-1';
  $scope.visitInfo.PRODUCT = '';
  $scope.visitInfo.PRODUCT_DEMO = '';
    
   

if($scope.params.infoId !=null){
    $scope.visitInfo = $scope.params.infoId;
}

  

   $scope.AddVisitInfo = function(){
    console.log($scope.visitInfo);
    var msg ='';
    
    if($scope.visitInfo.ORDER_RECEIVED == -1){
      msg = "Please select order received!";
    }else if($scope.visitInfo.DEMO_PERFORMED == -1){
      msg = "Please select demo received!";
    }else if($scope.visitInfo.DEMO_PERFORMED =='C1' && $scope.visitInfo.PRODUCT_DEMO ==''){
      msg = "Please enter Demo Product !";
    }



    if(msg!=''){
      webService.showPopup(msg, $rootScope.title_ok);
    }else{

        var urlParam = 'VisitService/VisitRecord.svc/SetAddInfoVisit';  
        var methodType = 'PUT';
        // var methodType = 'POST';
        var dataJson =JSON.stringify({
            "Company_NO": $rootScope.currentUser.UserDetails.Company_No,
            "LOCATION_NO": $rootScope.currentUser.UserDetails.Location_No,
            "User_ID": $rootScope.currentUser.UserDetails.UserId,
            "DOC_NO": $scope.params.vid,       
            "DEMO_PERFORMED": $scope.visitInfo.DEMO_PERFORMED,
            "ORDER_RECEIVED":$scope.visitInfo.ORDER_RECEIVED,
            "PRODUCT": $scope.visitInfo.PRODUCT,
            "PRODUCT_DEMO": $scope.visitInfo.PRODUCT_DEMO
        });

      webService.showIonLoader();
      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             
             webService.showPopup(respone.data.Messsage.ErrorMsg, $rootScope.title_close).then(function(res){
                $state.go('visit.visitDetail',{vid:$scope.params.vid})

             });
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });

      }   

    }
  /********************  Visit Add (Additional Info) Ends    *********************/



  /********************  Visit Add (Products) Starts    *********************/
$scope.ProdGroup = [];  // to fill Prod group on add/edit Product
$scope.ProdCode = [];   // to fill Prod Code on add/edit Product
$scope.ProdDesc = [];   // to fill Prod Code on add/edit Product


$scope.VisitProd = {};
$scope.VisitProd.ITEM_GROUP = '';
$scope.VisitProd.ITEM_TYPE = 'E';

$scope.VisitProd.DESCRIPTION ='';
$scope.VisitProd.ITEM_CODE ='';
$scope.VisitProd.QUANTITY ='';     
$scope.VisitProd.VISIT_REMARK ='';

$scope.showGroup = true;
$scope.showCode = true;
$scope.showDesc=true;


if($scope.params.pId !=null){
    $scope.VisitProd = $scope.params.pId;
    
    if($scope.VisitProd.ITEM_TYPE == 'M'){
        $scope.showGroup=false;
        $scope.showCode=false;
        $scope.showDesc=false;
      }else{
        $scope.showGroup=true;
        $scope.showCode=true;
        $scope.showDesc=true;
      }
}


$scope.callProdGroup = function () {
        
         //$scope.ProdGroup = [{'Group_Code':'Test','Description':'Desc','label':'test (Desc)'},{'Group_Code':'Test2','Description':'Desc2','label':'test2 (Desc2)'}]  

        webService.showIonLoader();  //show ionic loading
        var urlParam = 'VisitService/VisitRecord.svc/GetGroup/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/null';

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          webService.hideIonLoader();

            if(respone.data.GetGroupCodeResult.Messsage.Success){
                
               var x = [];
               var dat = respone.data.GetGroupCodeResult.Result;
               for(var i in dat){
                  x.push({'Group_Code':dat[i]['Group_Code'],'Description':dat[i]['Description'],'label':dat[i]['Group_Code']+' ( '+dat[i]['Description']+' )'});
               }
                $scope.ProdGroup = x;
                //console.log($scope.ProdGroup);

            }else{
                webService.showPopup(respone.data.GetGroupCodeResult.Messsage.ErrorMsg, $rootScope.title_close);
            }

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });

}





$scope.callProdCode = function () {
        
         //$scope.ProdCode = [{'Stock_NO':'Test','Description':'Desc','label':'test (Desc)'},{'Stock_NO':'Test2','Description':'Desc2','label':'test2 (Desc2)'}]  

      webService.showIonLoader();  //show ionic loading
        var urlParam = 'VisitService/VisitRecord.svc/GetItem/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+$scope.VisitProd.ITEM_GROUP
            +'/null/'
            +'/null';

        var methodType = 'GET'
        var dataJson = JSON.stringify({});
        var modelItem = webService.webCall(urlParam,methodType,dataJson)
        .then(function(respone){
          webService.hideIonLoader();
            if(respone.data.GetItemCodeResult.Messsage.Success){
              var x = [];
               var dat = respone.data.GetItemCodeResult.Result;
               for(var i in dat){
                  x.push({'Stock_NO':dat[i]['Stock_NO'],'Description':dat[i]['Description'],'label':dat[i]['Stock_NO']+' ( '+dat[i]['Description']+' )'});
               }
                $scope.ProdCode = $scope.ProdDesc= x;
                //console.log($scope.ProdCode);
            }else{
                webService.showPopup(respone.data.GetItemCodeResult.Messsage.ErrorMsg, $rootScope.title_close);
            }

        },function(error){
              webService.hideIonLoader();  //show ionic loading
              webService.showPopup('Webservice response error!', $rootScope.title_close);
        });
    }


$scope.$on('$ionicView.afterEnter', function() {
      
  //Call method when on bpDetail screen 
  if (($.inArray($state.current.name, ['visit.addProduct']) !== -1) ) {
      $scope.callProdGroup();
  }

  //Call method when on bpDetail screen 
  if (($.inArray($state.current.name, ['visit.addProduct']) !== -1  && $scope.params.pId != null) ) {
      $scope.callProdCode();
  }
     
});



$scope.getProdGroupID = function (query) {
    if(query!=null){
        return $filter('filter')($scope.ProdGroup, { Group_Code: query});
    }
    return $scope.ProdGroup;
};

$scope.getProdGroupIDClicked = function (callback) {
    console.log(callback.item);
    $scope.VisitProd.ITEM_GROUP = callback.item.Group_Code;
    $scope.VisitProd.ITEM_CODE = '';
    $scope.VisitProd.DESCRIPTION = '';

    $scope.callProdCode();

};
$scope.getProdGroupIDRemoved = function (callback) {
   console.log(callback.item);
   $scope.VisitProd.ITEM_GROUP = '';
   $scope.VisitProd.ITEM_CODE = '';
   $scope.VisitProd.DESCRIPTION = '';
};




$scope.getProductCodeID = function (query) {

    if($scope.VisitProd.ITEM_GROUP=='' || $scope.VisitProd.ITEM_GROUP=='undefined'){
      return $scope.ProdCode;
    }else if(query!=null){
        return $filter('filter')($scope.ProdCode, { Stock_NO: query});
    }else{
      return $scope.ProdCode;  
    }
    
      
};

$scope.getProductCodeIDClicked = function (callback) {
    console.log(callback.item);
    $scope.VisitProd.ITEM_CODE = callback.item.Stock_NO;
    $scope.VisitProd.DESCRIPTION = callback.item.Description;
};
$scope.getProductCodeIDRemoved = function (callback) {
   console.log(callback.item);
   $scope.VisitProd.ITEM_CODE = '';
   $scope.VisitProd.DESCRIPTION = '';
};


$scope.getProductDescID = function (query) {

console.log($scope.ProdDesc);

    if($scope.VisitProd.ITEM_GROUP==''){
      return $scope.ProdDesc;
    }else if(query!=null){
        return $filter('filter')($scope.ProdDesc, { Description: query});
    }else{
      return $scope.ProdDesc;
    }
};


$scope.getProductDescIDClicked = function (callback) {
    console.log(callback.item);
   $scope.VisitProd.ITEM_CODE = callback.item.Stock_NO;
    $scope.VisitProd.DESCRIPTION = callback.item.Description;
};
$scope.getProductDescIDRemoved = function (callback) {
   console.log(callback.item);
   $scope.VisitProd.ITEM_CODE = '';
   $scope.VisitProd.DESCRIPTION = '';
};


$scope.setProdForm = function(){
  $scope.VisitProd.ITEM_GROUP = '';
  $scope.VisitProd.DESCRIPTION = '';
  $scope.VisitProd.ITEM_CODE = '';
  $scope.VisitProd.QUANTITY = '';
  $scope.VisitProd.VISIT_REMARK = '';

  if($scope.VisitProd.ITEM_TYPE == 'M'){
    $scope.showGroup=false;
    $scope.showCode=false;
    $scope.showDesc=false;
  }else{
    $scope.showGroup=true;
    $scope.showCode=true;
    $scope.showDesc=true;
  }
}





   $scope.AddVisitProd = function(){
    var msg ='';
    
    if($scope.VisitProd.ITEM_TYPE == 'E' && $scope.VisitProd.ITEM_GROUP ==''){
      msg = "Please enter item group!";
    }else if($scope.VisitProd.ITEM_CODE == ''){
      msg = "Please enter item code!";
    }else if($scope.VisitProd.DESCRIPTION == ''){
      msg = "Please enter description!";
    }else if($scope.VisitProd.QUANTITY == ''){
      msg = "Please enter quantity!";
    }

    if(msg!=''){
        webService.showPopup(msg, $rootScope.title_ok);
    }else{


      if($scope.params.pId !=null){
        var urlParam = 'VisitService/VisitRecord.svc/ModifyProductVisit';  
        var methodType = 'PUT';
      }else{
        var urlParam = 'VisitService/VisitRecord.svc/SetProductVisit';  
        var methodType = 'POST';
      }

    var dataJson =JSON.stringify({
        "Company_no": $rootScope.currentUser.UserDetails.Company_No,
        "LOCATION_no": $rootScope.currentUser.UserDetails.Location_No,
        "USER_ID": $rootScope.currentUser.UserDetails.LoginName,
        "VISIT_ID": $scope.params.vid,
        "ITEM_GROUP":$scope.VisitProd.ITEM_GROUP,
        "DESCRIPTION": $scope.VisitProd.DESCRIPTION,
        "ITEM_CODE":$scope.VisitProd.ITEM_CODE,
        "ITEM_TYPE": $scope.VisitProd.ITEM_TYPE,
        "QUANTITY": $scope.VisitProd.QUANTITY,        
        "VISIT_REMARK":$scope.VisitProd.VISIT_REMARK
    });
    
      webService.webCall(urlParam,methodType,dataJson)
         .then(function(respone){
             webService.hideIonLoader(); 
             
             if(respone.data.Messsage.Success){
               webService.showPopup(respone.data.Messsage.ErrorMsg, $rootScope.title_close).then(function(res){

                 $state.go('visit.visitDetail',{vid:$scope.params.vid})

               });
           }else{
                webService.showPopup(respone.data.Messsage.ErrorMsg, $rootScope.title_close);
           }
         
         },function(error){
            webService.hideIonLoader();  //show ionic loading
            webService.showPopup('Webservice response error!', $rootScope.title_close);
         });

       }  

    }
      
  /********************  Visit Add (Products) Ends    *********************/




  /********************  Visit Update Starts    *********************/
   $scope.UpdateVisit = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Update Ends    *********************/



  /********************  Visit Contact Update Starts    *********************/
   $scope.UpdateVisitContact = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Contact Update Ends    *********************/


  /********************  Visit Sales Update Starts    *********************/
   $scope.UpdateVisitSales = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Sales Update Ends    *********************/



  /********************  Visit Info Update Starts    *********************/
   $scope.UpdateVisitInfo = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Info Update Ends    *********************/



  /********************  Visit Prod Update Starts    *********************/
   $scope.UpdateVisitProd = function(){
      webService.showPopup('Record added successfully', $rootScope.title_ok).then(function() {
           $state.go('visit.visitDetails');
       });

    }
  /********************  Visit Prod Update Ends    *********************/

$scope.setDateFor = function(input) {
  if(input!='' && input!=null){
      var datePart = input.match(/\d+/g),
      day= datePart[0], // get only two digits
      month = datePart[1], year = datePart[2];
      console.log(new Date(year+'-'+month+'-'+day));
      return new Date(year+'-'+month+'-'+day);
  }else{
      return '';
  }
}


$scope.visitDetails = '';
$scope.SalesDetails= '';
$scope.SaleContact= '';
$scope.SaleProduct= '';
$scope.VisitAdditional= '';

  $scope.VisitDetail = function(){
      // webService.showIonLoader();  //show ionic loading
    var urlParam = 'VisitService/VisitRecord.svc/GetVisitDetail/'
            +$rootScope.currentUser.UserDetails.Company_No
            +'/'+$rootScope.currentUser.UserDetails.Location_No
            +'/'+$scope.params.vid
            +'/'+$rootScope.currentUser.UserDetails.LoginName;

    var methodType = 'GET'
    var dataJson = JSON.stringify({});
    webService.webCall(urlParam,methodType,dataJson)
    .then(function(respone){
      //console.log(respone);
      
        webService.hideIonLoader();//hide ionic loading
        if(respone.data.GetVisitDataResult.Messsage.Success){

          $scope.visitDetails = respone.data.GetVisitDataResult.Result;
          $scope.SalesDetails= respone.data.GetVisitDataResult.Sale;
          $scope.SaleContact= respone.data.GetVisitDataResult.SaleContact;
          $scope.SaleProduct= respone.data.GetVisitDataResult.SaleProduct;
          $scope.VisitAdditional= respone.data.GetVisitDataResult.VisitAdditional;


          /* set model on Modify and Authorize visit start */

          $scope.visitModel.AREA_NAME = $scope.visitDetails.AREA_NAME;
          $scope.visitModel.CUSTOMER_NO = $scope.visitDetails.CUSTOMER_NO;

          

         $scope.visitModel.DOC_SERIES = $scope.visitDetails.DOC_SERIES;
         $scope.visitModel.VISIT_ID = $scope.visitDetails.VISIT_ID;
         $scope.visitModel.VISIT_DETAILS = $scope.visitDetails.VISIT_DETAILS;
         
         $scope.visitModel.CUSTOMER_NAME = $scope.visitDetails.CUSTOMER_NAME;
         
         $scope.visitModel.ADDRESS = $scope.visitDetails.ADDRESS;
         $scope.visitModel.REMARK = $scope.visitDetails.REMARK;

         $scope.visitModel.VISIT_DATE = $scope.setDateFor($scope.visitDetails.VISIT_DATE);
         $scope.visitModel.VISIT_TIME_FROM = $scope.visitDetails.VISIT_TIME_FROM;
         $scope.visitModel.VISIT_TIME_TO = $scope.visitDetails.VISIT_TIME_TO;
         
         for(var key in $scope.SaleContact){
            $scope.visitModel.Contact.length = 0;
             $scope.visitModel.Contact.push({
                                          'CUST_CONTACT_PERSON':$scope.SaleContact[key]['CONTACT_PERSON'],
                                          'CONTACT_POSITION':$scope.SaleContact[key]['DESIGNATION'],
                                          'MOBILE_NO':$scope.SaleContact[key]['MOBILE'],
                                          'EMAIL':$scope.SaleContact[key]['EMAIL'],
                                         });
           }
        
        for(var key in $scope.SalesDetails){
          $scope.visitModel.Sales.length = 0;
         $scope.visitModel.Sales.push({
                                      'SALES_PERSON_NO':$scope.SalesDetails[key]['SALES_PERSON_NO'],
                                      'SALES_PERSON_NAME':$scope.SalesDetails[key]['SALES_PERSON_NAME'],
                                      'NEXT_ACTION':$scope.SalesDetails[key]['NEXT_ACTION'],
                                      'NEXT_ACTION_DATE':$scope.setDateFor($scope.SalesDetails[key]['NEXT_ACTION_DATE']),
                                      'NEXT_ACTION_TIME':$scope.SalesDetails[key]['NEXT_ACTION_TIME'],
                                      'ALERT':$scope.SalesDetails[key]['ALERT'],
                                      'ALERT_DATE':$scope.setDateFor($scope.SalesDetails[key]['ALERT_DATE']),
                                      'ALERT_TIME':$scope.SalesDetails[key]['ALERT_TIME'],
                                    });
         }


// if($.inArray($state.current.name, ['visit.addVisit']) !== -1 && $scope.params.vid != ''){

       
         
       
//           webService.showIonLoader();  //show ionic loading
//           var urlParam = 'VisitService/VisitRecord.svc/GetContactPerson/'
//                   +$rootScope.currentUser.UserDetails.Company_No
//                   +'/'+$rootScope.currentUser.UserDetails.Location_No
//                   +'/'+$scope.visitModel.CUSTOMER_NO
//                   +'/'+$scope.visitModel.AREA_NAME.split('-')[0]
//                   +'/null';

//         var methodType = 'GET'
//         var dataJson = JSON.stringify({});
//         webService.webCall(urlParam,methodType,dataJson)
//         .then(function(respone){
          
//             webService.hideIonLoader();//hide ionic loading
//             if(respone.data.ContactPersonDetailResult.Messsage.Success){
//               $scope.fillContactArr = respone.data.ContactPersonDetailResult.Result;
//               $scope.showContact = false;

//               for(var key in $scope.SaleContact){
// $scope.visitModel.Contact[key]['CUST_CONTACT_PERSON']=$scope.SaleContact[key]['CONTACT_PERSON'];
//                }
//             }else{
//                 webService.showPopup(respone.data.ContactPersonDetailResult.Messsage.ErrorMsg, $rootScope.title_close);
//             }

//         },function(error){
//               webService.hideIonLoader();  //show ionic loading
//               webService.showPopup('Contacts list no results!', $rootScope.title_close);
//         });

//  }



         console.log(JSON.stringify($scope.visitModel));

         /* set model on Modify and Authorize visit ends*/


        }else{
            webService.showPopup(respone.data.GetAllBPResult.BPMesssage.ErrorMsg, $rootScope.title_close);
        }

    },function(error){
          webService.hideIonLoader();  //show ionic loading
          webService.showPopup('Webservice response error!', $rootScope.title_close);
    });
  }


    $scope.$on('$ionicView.beforeEnter', function() {
      
      //Call method when on bpDetail screen 
      if (($.inArray($state.current.name, ['visit.visitDetail']) !== -1) || ($.inArray($state.current.name, ['visit.addVisit']) !== -1) || ($.inArray($state.current.name, ['visit.addProduct']) !== -1) ) {
        webService.showIonLoader();
      }
    
    });


    $scope.$on('$ionicView.afterEnter', function() {
      
      //Call method when on bpDetail screen 
      if (($.inArray($state.current.name, ['visit.visitDetail']) !== -1) ) {
        $scope.VisitDetail();
      }
         //Call method when on bpDetail screen 
      if ($.inArray($state.current.name, ['visit.addVisit']) !== -1 ) {
        $scope.fillVisitDoc();
   
        //$scope.fillVisitSalesObj();
      }


      if($.inArray($state.current.name, ['visit.addVisit']) !== -1 && $scope.params.vid == ''){
        
          for(var i in $scope.visitModel.Sales){
              $scope.visitModel.Sales[i]['SALES_PERSON_NO'] = $rootScope.currentUser.UserDetails.LoginName;
              $scope.visitModel.Sales[i]['SALES_PERSON_NAME'] = $rootScope.currentUser.UserDetails.UserName;
          }
        }

      if($.inArray($state.current.name, ['visit.addVisit']) !== -1 && $scope.params.vid != ''){

          $scope.VisitDetail();

          $scope.arCode = $scope.visitModel.AREA_NAME.split('-');
          if($scope.arCode[0]!=''){
            $scope.fillVisitContacts($scope.arCode[0]);
          }

         
        }

    
    });


       

});

