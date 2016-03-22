$(document).ready(function(){

  var map = L.map('map').setView([38, -95], 4);
  var options = {
    minZoom: 4,
    maxZoom: 7,
    opacity: 1.0,
    tms: false,
    zIndex: 500,
    attribution: '',
  };


L.tileLayer('http://api.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2xpbnRvbmtpbmciLCJhIjoiMmJkNGNkMTQ1YmM5MWJjMTE4M2JhOGQ5YzE1MTY5YmEifQ.NO-RL4IJM1eQKpJ8ekybpA', options).addTo(map);

  // var incidents = db.get().collection('incidents');
  // var cursor = collection.find({});
  // cursor.nextObject(function(err, incident){
  //   console.log("victim name:" + incident.name);
  // });

});
