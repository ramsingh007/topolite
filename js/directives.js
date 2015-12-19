angular.module('topolite.directives', [])


.directive('restrictInput', [function(){

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var ele = element[0];
                var regex = RegExp(attrs.restrictInput);
                var value = ele.value;

                //console.log(ele);

                ele.addEventListener('keyup',function(e){
                    if(ele.value!=''){
                            if (regex.test(ele.value) ){
                                value = ele.value;
                            }else{
                                ele.value = value;
                                alert('Please enter valid data');
                            }
                    }
                });
            }
        };
    }]);



angular.module('topolite.time', []).directive('formattedTime', function ($filter) {
  
   return {
      require: '?ngModel',
     link: function(scope, elem, attr, ngModel) {
         if( !ngModel )
             return;
         if( attr.type !== 'time' )
              return;

        ngModel.$formatters.unshift(function(value) {
         // Replace the seconds & ms like :23.298 with nothing
            return value.replace(/:[0-9]+.[0-9]+$/, '');
        });
    }
   };
 
 });