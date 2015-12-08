angular.module('topolite.directives', [])
.directive('restrictInput', [function(){

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var ele = element[0];
                var regex = RegExp(attrs.restrictInput);
                var value = ele.value;


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
