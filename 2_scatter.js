{var margin = { top: 10, right: 30, bottom: 30, left: 60 },
width = 600 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

// Add X axis
var x = d3.scaleLinear().domain([0, 3000]).range([0, width]);

// Add Y axis
var y = d3.scaleLinear().domain([0, 400000]).range([height, 0]);

//Read the data
d3.csv(
"D3/311_03-05-21.csv" 
).then((data) => {
showVisMouseover(data, "mouseoverout");
showVisClick(data, "click");
showZoom(data, "zoom");
});

function showVisMouseover(data, id) {
var svg = d3
  .select("#" + id)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Append X and Y axis
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg.append("g").call(d3.axisLeft(y));

// Add dots
svg
  .append("g")
  .selectAll("dot")
  .data(
    data.filter(function (d, i) {
      return i < 50;
    })
  ) // the .filter part is just to keep a few dots on the chart, not all of them
  .enter()
  .append("circle")
  .attr("cx", function (d) {
    return x(d.longitude);
  })
  .attr("cy", function (d) {
    return y(d.latitude);
  })
  .attr("r", 7)
  .style("fill", "#69b3a2")
  .style("opacity", 0.3)
  .style("stroke", "white")
  .on("mouseover", mouseover)
  .on("mouseout", mouseout);

// A function that change this tooltip when the user hover a point.
/*function mouseover(event, d) {
  d3.select(this).style("fill", "red");
  tooltip
    .html("The exact value of<br>the Ground Living area is: " + d.GrLivArea)
    .style("left", event.pageX + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style("top", event.pageY + "px")
    .style("display", "");
}
*/

/*
// A function that change this tooltip when the mouse pointer leaves
//Style display is set to "none" to hide the tooltip
function mouseout() {
  d3.select(this).style("fill", "#69b3a2");
  tooltip.style("display", "none");
}
*/

// Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
// Its opacity is set to 0: we don't see it by default.
var tooltip = d3
  .select("#" + id)
  .append("div")
  .style("display", "none")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px");
}

function showVisClick(data, id) {
var svg = d3
  .select("#" + id)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Append X and Y axis
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg.append("g").call(d3.axisLeft(y));

// Add dots
var dots = svg
  .append("g")
  .selectAll("dot")
  .data(
    data.filter(function (d, i) {
      return i < 50;
    })
  ); // the .filter part is just to keep a few dots on the chart, not all of them

var circles = dots
  .enter()
  .append("circle")
  .attr("cx", function (d) {
    return x(d.longitude);
  })
  .attr("cy", function (d) {
    return y(d.latitude);
  })
  .attr("r", 7)
  .style("fill", "#69b3a2")
  .style("opacity", 0.3)
  .style("stroke", "white")
  .on("click", click)
  .on("dblclick", dblclick);

  /*
// A function that change this tooltip when the user clicks on a point
function click(event, d) {
  d3.select(this).style("fill", "red");
  var localGridVal = d.GrLivArea;
  tooltip
    .html("The exact value of<br>the Ground Living area is: " + d.GrLivArea)
    .style("left", event.pageX + 10 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
    .style("top", event.pageY + "px")
    .style("display", "");

  d3.selectAll(circles)
    .filter((data) => {
      return parseInt(data.GrLivArea) > parseInt(localGridVal);
    })
    .style("display", "none");
}
*/

function dblclick() {
  d3.select(this).style("fill", "#69b3a2");
  d3.selectAll(circles).style("display", "");
  tooltip.style("display", "none");
}

// Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
// Its opacity is set to 0: we don't see it by default.
var tooltip = d3
  .select("#" + id)
  .append("div")
  .style("display", "none")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px");
}

function showZoom(data, id) {
var svg = d3
  .select("#" + id)
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  //Adding zoom to the entire svg
  .call(
    d3.zoom().on("zoom", function (zoom) {
      console.log(zoom);
      svg.attr("transform", zoom.transform);
    })
  )
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

svg.append("g").call(d3.axisLeft(y));

// Add dots
svg
  .append("g")
  .selectAll("dot")
  .data(
    data.filter(function (d, i) {
      return i < 50;
    })
  ) // the .filter part is just to keep a few dots on the chart, not all of them
  .enter()
  .append("circle")
  .attr("cx", function (d) {
    return x(d.longitude);
  })
  .attr("cy", function (d) {
    return y(d.latitude);
  })
  .attr("r", 7)
  .style("fill", "#69b3a2")
  .style("opacity", 0.3)
  .style("stroke", "white");
}}
