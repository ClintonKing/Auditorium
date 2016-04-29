$(document).ready(function(){


//Our data set must be in an array for D3 to select it (can have objects in array though)
var circleData = [
{
  "id": "3",
  "fillColor": "purple",
  "cx": 150,
  "cy": 150,
  "radius": 150
},
{
  "id": "4",
  "fillColor": "green",
  "cx": 800,
  "cy": 800,
  "radius": 600
}
];

var barData = [
{
  "id": 1,
  "fillColor": "#56A0D3",
  "x": 250,
  "y": 250,
  "height": 50
},
{
  "id": 2,
  "fillColor": "#56A0D3",
  "x": 320,
  "y": 220,
  "height": 80
}
]

//Find max and min data values in our objects
var minDataPoint = d3.min(circleData, function(d){return d.cx});
var maxDataPoint = d3.max(circleData, function(d){return d.cx});
//Just check to see we got the data correctly
console.log(minDataPoint);
console.log(maxDataPoint);

//Create function to scale our objects down to fit svg grid size
var scaling = d3.scale.linear()
  .domain([minDataPoint, maxDataPoint])
  .range([25, 100]);
//Scale the values within our data objects
circleData.forEach(function(d){
  d.cx = scaling(d.cx);
  d.cy = scaling(d.cy);
  d.radius = scaling(d.radius);
});

console.log(circleData);

//Set scale of axes, with domain set to max range of axis we want and range set to upper limits of svg width/height
var x = d3.scale.linear()
  .domain([0, 10])
  .range([0, 500]);

var y = d3.scale.linear()
  .domain([300, 0])
  .range([0, 300]);

//Select body to prepare to append stuff
var bodySelect = d3.select("body");
//Make svg and define size of grid (initially set to browser size)
var svgSelect = bodySelect.append("svg")
  .attr("width", $(window).width())
  .attr("height", $(window).height());

//Change svg grid size to match browser size when browser is resized
$(window).resize(function(){
  svgSelect
  .attr("width", $(window).width())
  .attr("height", $(window).height());
});


//Add functions to create axes on SVG grid
var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom"); //Sets numbers above or below axis line

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

//Make a group for our svg objects
var circleGroup = svgSelect.append("g")
  .attr("class", "groupOne");

//Make circle objects in our group for each object in our data array
var dataCircles = circleGroup.selectAll("circle")
  .data(circleData)
  .enter()
  .append("circle");
//Now give those circles attributes pulled from our data with simple functions
var circleAttributes = dataCircles
  .attr("cx", function(d){return d.cx})
  .attr("cy", function(d){return d.cy})
  .attr("r", function(d){return d.radius})
  .attr("id", function(d){return d.id})
  .attr("class", "shape")
  .style("fill", function(d){return d.fillColor});

//Now lets add text objects to go with our circles
var circleTexts = circleGroup.selectAll("text")
  .data(circleData)
  .enter()
  .append("text");

var textAttributes = circleTexts
  .attr("x", function(d){return d.cx})
  .attr("y", function(d){return d.cy})
  .attr("text-anchor", "middle")
  .attr("class", "circleText")
  .attr("id", function(d){return "text" + d.id})
  .text(function(d){return "r = " + d.radius.toFixed(0)});

// New group for bar graphy stuff
var rectGroup = svgSelect.append("g");

// Pre-render
var bars = rectGroup.selectAll("rect")
  .data(barData)
  .enter()
  .append("rect");

// Make bars
var barAttributes = bars
  .attr("x", function(d){return d.x})
  .attr("y", function(d){return d.y})
  .attr("height", function(d){return d.height})
  .attr("width", 20)
  .attr("class", "bar shape")
  .attr("id", function(d){return d.id});

// Informational text for bars
var barText = rectGroup.selectAll("text")
    .data(barData)
    .enter()
    .append("text");

var barTextAttributes = barText
  .attr("x", function(d){return d.x + 10})
  .attr("y", function(d){return d.y - 10})
  .attr("text-anchor", "middle")
  .attr("class", "barText")
  .attr("id", function(d){return "text" + d.id})
  .text(function(d){return d.height.toFixed(0)})
  .style("fill", "black")
  .style("font-family", "sans-serif")
  .style("font-size", "14px");

//Let's make info for a specific bar appear on hovering on that bar.
$(".shape").mouseenter(function(){
  var num = this.id;
  $("#text" + num).show();
});
$(".shape").mouseleave(function(){
  var num = this.id;
  $("#text" + num).hide();
});

//Call axis function to new group
var xAxisGroup = svgSelect.append("g")
  .call(xAxis)
  .attr("transform", "translate(0, 300)") //Moves X axis to bottom of chart.
  .attr("class", "xAxis");

var yAxisGroup = svgSelect.append("g")
  .call(yAxis)
  .attr("class", "xAxis");


});
