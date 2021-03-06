var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 1400 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;

var svg = d3.select('.container').append(svg)
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr('transform', 'translate(' + magrin.left + ',' + margin.top + ')');

var scaleX = d3.scale.ordinal()
  .rangeRoundBands([0, width], 0.2);

var scaleY = d3.scale.linear()
  .range([height , 0]);

var xAxis = d3.svg.axis()
  .scale(scaleX)
  .orient('bottom');

var yAxis = d3.svg.axis()
  .scale(scaleY)
  .orient('left')
  .ticks(15, '%');

d3.tsv('data/shooting.txt', function(err, data){
  if (err) throw error;

  // Set domain to be team names from data source
  scaleX.domain(data.map(function(d){return d.team}));
  // Set domain of Y axis stats (can use d3.max / d3.min to find automatically inside data call function)
  scaleY.domain([0, 1]);

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transfrom', 'translate(0, ' + height + ')')
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);


});
