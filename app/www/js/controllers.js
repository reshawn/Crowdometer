angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('locationsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('foodCourtCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	

	var image = document.getElementById('cafVisual');
	var state = document.getElementById('state');
	// image.src = "img/Level1.png";
	var dbRef = firebase.database().ref().child('latest');
	dbRef.on('value',snap =>{ 
								var density=snap.val();
								image.src = "img/Level"+parseInt(density.result)+".png";
								var stateText = density.result.split(".");
								var count=0;
								state.innerHTML = "";
								for(count=1;count<stateText.length;count=count+1){
									state.innerHTML += stateText[count]+" ";
								}

								var timeFrom = document.querySelector("#timeFrom");
								var timestamp = moment(new Date(density.timestamp));
								var currentTime = moment(Date.now());

  								timeFrom.innerHTML = timestamp.from(currentTime);

							});




	// STUFF FOR HISTORY 
		// var detectionDatabase = firebase.database().ref('detected')
  //       .once('value').then(function(snapshot){
  //           var history = snapshot.val();

  //       for(var year in history){
  //               if(year === 'latest') continue;
  //               var yearData = history[year];
  //               for(var month in yearData){
  //                   var monthData = yearData[month];
  //                   for(var day in monthData){
  //                       var dayData = monthData[day];
  //                       for(var instance in dayData){
  //                           var data = dayData[instance];
  //                           labels.push(data.timestamp);
  //                           values.push(parseInt(data.result));

	
	$scope.refresh = function(){
    	location.reload();
  	}
	// var test = document.getElementById('test');
	// var dbRef = firebase.database().ref().child('Month');
	// dbRef.on('value',snap => test.innerText=JSON.stringify(snap.val(),null,3));
	
}])
   
.controller('jFKBusStopCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 