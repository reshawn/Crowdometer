// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyB1XqagZOMhQ9_dcypmT3m8HZj9GEfPK0k",
    authDomain: "crowd-detection.firebaseapp.com",
    databaseURL: "https://crowd-detection.firebaseio.com",
    storageBucket: "crowd-detection.appspot.com",
    messagingSenderId: "510168230199"
});

function setupChart(history){
    if(history == null) {
        var chart = document.getElementById("chart");
        chart.innerHTML = "";
        return;   
    };
    var labels = ['x'], values = ['readings'];

     for(var day in history){
        var dayData = history[day];
        for(var instance in dayData){
            var data = dayData[instance];
            labels.push(data.timestamp);
            values.push(parseInt(data.result));
        }
    }

    var chart = c3.generate({
        bindto: '#chart',
        xFormat: '%Y%m%d%H%M%S',
        data: {
            x: 'x',
            columns: [
                labels, values
            ]
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%Y-%m-%d %H:%M:%S'
                }
            }
        },
        zoom: { enabled:true, factor:0 }
    });
}


var detectedDatabase = firebase.database().ref('detected');
function selectSection(){
    var year = document.getElementById("yearSelection").value;
    var month = document.getElementById("monthSelection").value;
    detectedDatabase.child(year).child(month).once('value').then(function(snapshot){
        setupChart(snapshot.val());
    });
}