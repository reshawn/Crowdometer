angular.module('app.controllers', ['ionic'])
  
.controller('homeCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])
   
.controller('locationsCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams) {


}])
   
.controller('kyleClassCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {
	

	var image = document.getElementById('visual');
	var state = document.getElementById('state');
	//get object, latest, from db which contains the latest result and timestamp
	var dbRef = firebase.database().ref().child('latest');
	dbRef.on('value',snap =>{ 
								var density=snap.val();
								//load image based on result
								image.src = "img/Level"+parseInt(density.result)+".png";
								//add result state to html but without the state number and dot separators 
								var stateText = density.result.split(".");
								var count=0;
								state.innerHTML = "";
								for(count=1;count<stateText.length;count=count+1){
									state.innerHTML += stateText[count]+" ";
								}
								//using momentjs get the time difference between the current time and the 
								//timestamp pulled
								var timeFrom = document.querySelector("#timeFrom");
								var timestamp = moment(new Date(density.timestamp));
								var currentTime = moment(Date.now());

  								timeFrom.innerHTML = timestamp.from(currentTime);

							});



	
}])
   
.controller('historyCtrl',['$scope', '$stateParams', '$ionicModal', 
function ($scope, $stateParams, $ionicModal) {

	//results modal
	$ionicModal.fromTemplateUrl('templates/resultsModal.html', {
	    scope: $scope
  	}).then(function(modal) {
	    $scope.modal = modal;
	});


  	//arrays of options to be used in the history form

	var days = []; 
	var ftimes = []; //array of from times
	var toTimes = []; //array of to times
	var times = []; // array of objects that contain both from and to times for use in form
	var mins = '30';
	var z = 0; var z1=0; // indices for "from times " and "to times"

	//populate array for use in days in form
	for (var x=0;x<=30;x++){
		days[x] = x+1;
	}

	for (var x=1; x<=12; x++){ //hours in 12 hour format for form select
		for (var y=0;y<2;y++){ //looped twice per hour to allow for 30 minute increments
			if (mins == '30') mins = '00';
			else if (mins =='00') mins = '30';
			ftimes[z] = (x) + ":" + mins; 
			z++;
			}
	}
	for (x=1;x<=24; x++){ //"to times" in form should be offset from "from times" by 30 minutes
		toTimes[z1] = ftimes[x];
		z1++;
	}
	for (x=0;x<24;x++){ //populate array of objects for use in html form
		if (x==23) { //on last run of the loop, 'from' would be 12:30 and 'to' needs to be 1
			times.push({
				from: ftimes[x],
				to: ftimes[0],
			});
			continue;
		}
		times.push({
			from: ftimes[x],
			to: toTimes[x],
		});
	}
	$scope.months = moment.months();
	$scope.days = days;
	$scope.times = times;




 // ----------------An example of a populated time frame in the current database would be 
 // ----------------28th October, 2016 from 9 to 9:30 (default selected options)

// The loadHistory function is done on touch of the Load History button, it gets all selected options from
// the form, converts the time to 24-hour format based on AM/PM and creates two date objects
// from the "from" and "to" times. This allows for timestamps in the db to be easily checked to determine
// which are in the range specified by the user. The appropriate db reference is made and the state,
// corresponding state meter image and date and time of all results that satisfy the criteria
// are displayed in the modal. If no values are found, an appropriate message is displayed.

	$scope.loadHistory = function(){
		var yearSelect = document.getElementById("year");
		var monthSelect = document.getElementById("month");
		var daySelect = document.getElementById("day");
		var frameSelect = document.getElementById("frame");
		var periodSelect = document.getElementById("period");
		var period = periodSelect.options[periodSelect.selectedIndex].text;
		var bothTimes = (frameSelect.options[frameSelect.selectedIndex].text).split(" to ");

		//split the text from the time range into two times, then split each time into 
		//hours and minutes
		var fromTime = {
			hours: parseInt((bothTimes[0].split(":"))[0]),
			mins: parseInt((bothTimes[0].split(":"))[1]),
		};
		var toTime = {
			hours: parseInt((bothTimes[1].split(":"))[0]),
			mins: parseInt((bothTimes[1].split(":"))[1]),
		};

		if (period=="PM") { //convert to 24 hour format
			
			fromTime.hours += 12;
			if (fromTime.hours == 24) fromTime.hours = 0;

			
			toTime.hours += 12;
			if (toTime.hours == 24) toTime.hours = 0;

		}


		var selectedDate = {
			year: parseInt(yearSelect.options[yearSelect.selectedIndex].text),
			month: parseInt(moment().month(monthSelect.options[monthSelect.selectedIndex].text).format("M")),
			day: parseInt(daySelect.options[daySelect.selectedIndex].text),
		}

		//create date variables for ease of comparison with timestamps 
		var fDate = new Date(selectedDate.year, selectedDate.month-1, selectedDate.day, fromTime.hours, fromTime.mins, 00);
		var tDate = new Date(selectedDate.year, selectedDate.month-1, selectedDate.day, toTime.hours, toTime.mins, 00);


		var res = document.getElementById('res');
		//removes any html elements in the results modal before appending the new results
		while (res.firstChild) {
		    res.removeChild(res.firstChild);
		}
		var dataInFrame = false; //variable to keep track of whether or not data is found within 
		//the time frame of a day that has data in other time frames


        var detectionDatabase = firebase.database().ref('detected/'+selectedDate.year+'/'+
        	($scope.months[selectedDate.month-1])+'/'+selectedDate.day)
			.once('value').then(function(snapshot){
				var data = snapshot.val();
				
				
				if(data!=null){
					//get all objects in data
					for(var key in data){
						var value = data[key];
						var valueDate = new Date(value.timestamp);

						//if current timestamp satisfies the range specified in the form
						if (value.timestamp>= fDate.getTime() && value.timestamp<= tDate.getTime()){
							dataInFrame = true;
							//remove state number and dot separators from state result pulled from db
							var stateText = value.result.split(".");
							var state = "";
							var count=0;
							
							for(count=1;count<stateText.length;count=count+1){
								state += stateText[count]+" ";
							}
							
							//create html elements to be appended to the results modal
							var result = document.createTextNode(state);
							valueDate = moment(valueDate).format('MMMM Do YYYY, h:mm:ss a');
							var dateNode = document.createTextNode(' - '+valueDate);
							var head = document.createElement("h5");
							var para = document.createElement("p");
							var nl = document.createElement("br");
							var image = document.createElement("img");


							head.appendChild(result);
							para.appendChild(dateNode);
							image.src = "img/Level"+(stateText[0])+".png";
							image.style.width = '50%';
							image.style.height = 'auto';


							//add elements to modal div
							res.appendChild(head);
							res.appendChild(nl);
							res.appendChild(image);
							res.appendChild(para);
							res.appendChild(nl);
						}
						
					}
					
				}
				if((data==null)||(dataInFrame==false)) {
					var head = document.createElement("h5");
					var result = document.createTextNode("No data for this time frame.");
					head.appendChild(result);
					res.appendChild(head);
				}
				
			});

	}

}])
 