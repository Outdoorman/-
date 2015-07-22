angular.module('starter.controllers', [])

.controller('AccountCtrl', function($scope,$rootScope,zhaiyan) {
  $scope.settings = {
    enableFriends: false
  };

  })

.controller('CollCtrl', function($scope,zhaiyan) {

 zhaiyan.getLike('1').then(function(data){
$scope.result=  data;
});

$scope.remove = function(id){
var item= document.getElementById(id);
item.remove();
zhaiyan.remove(id).then(function(){
 })
};
$scope.apply;
})

.controller('HateCtrl', function($scope,zhaiyan) {

 zhaiyan.getLike('0').then(function(data){
$scope.result=  data;
});

$scope.remove = function(id){
var item= document.getElementById(id);
item.remove();
zhaiyan.remove(id).then(function(){
 })
};
$scope.apply;
})

.controller('DashCtrl', function($scope,$rootScope,$http,zhaiyan) {
function Refresh(){
var url = 'http://apis.baidu.com/acman/zhaiyanapi/zhaiyanapixml';
//$scope.test = 'diaoni';
// $http({method: 'GET', url: 'http://apis.baidu.com/acman/zhaiyanapi/zhaiyanapixml', headers: {
//     'apikey':'9e0c4f267206ca97de932688823d0cc7'}
var postData = {text:'long blob of text'};  
//下面这一行会被当成参数附加到URL后面，所以post请求最终会变成/api/user?id=5  
var config = {headers: {  'apikey':'9e0c4f267206ca97de932688823d0cc7'}};  
$http.get(url,config  
).success(function(data, status, headers, config) {  
//成功之后做一些事情 
// $scope.test = data;
// alert(  data );
parser=new DOMParser();
xmlDoc=parser.parseFromString(data,"text/xml");
$scope.id = '';
$scope.zhaiyan = '';
$scope.source =  '';
$scope.date =  '';
$scope.cat = '';
$scope.catname =  '';
$scope.show =  '';
$scope.img =  '';
$scope.author =  '';
$scope.id = xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
$scope.zhaiyan = xmlDoc.getElementsByTagName("zhaiyan")[0].childNodes[0].nodeValue;
$scope.source =  xmlDoc.getElementsByTagName("source")[0].childNodes[0].nodeValue;
$scope.date =  xmlDoc.getElementsByTagName("date")[0].childNodes[0].nodeValue;
$scope.cat = xmlDoc.getElementsByTagName("cat")[0].childNodes[0].nodeValue;
$scope.catname =  xmlDoc.getElementsByTagName("catname")[0].childNodes[0].nodeValue;
$scope.show =  xmlDoc.getElementsByTagName("show")[0].childNodes[0].nodeValue;
$scope.img =  xmlDoc.getElementsByTagName("img")[0].childNodes[0].nodeValue;
$scope.author =  xmlDoc.getElementsByTagName("author")[0].childNodes[0].nodeValue;
}).error(function(data, status, headers, config) {  
    //处理错误  
    console.log(data, status, headers, config);
  }).finally(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
};
Refresh();

$scope.colle = function() {
   //alert( DB.insert(zhaian, source,show,date)   );
    $scope.documents = [];
    $scope.document = null;
    // Get all the documents
    var myDate = new Date();
    zhaiyan.insert($scope.zhaiyan, $scope.source,$scope.show,$scope.date,'1',myDate.toLocaleString( )).then(function(documents){

    });
    $rootScope.count = $rootScope.count +1;
 };

 $scope.hate = function() {
   //alert( DB.insert(zhaian, source,show,date)   );
    $scope.documents = [];
    $scope.document = null;
    // Get all the documents
    var myDate = new Date();
   
    zhaiyan.insert($scope.zhaiyan, $scope.source,$scope.show,$scope.date,'0',myDate.toLocaleString( ) ).then(function(documents){

    });
 };

$scope.doRefresh = function() { Refresh(); }
$scope.apply;

})
;
