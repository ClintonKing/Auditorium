var http = require('http');
var express = require('express');
var server = http.createServer(); //shorthand for event calls
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter();
var myself = {
  name: "Lindsay",
  age: 20
};

server.on( 'request', function(request, response){

  response.writeHead(200);
  response.write("Dog is running.");
  setTimeout(function(){
    response.write("Dog is done.");
    response.end();
  }, 5000);
  response.write("Dog is still running.");

}).listen(8080, function(){

});


logger.on('error', function(message){
  console.log("ERR: " + message);
});

logger.emit("error", "Spilled Milk");


// http.createServer(function(request, response){
//   response.writeHead(200);
//   request.on('readable', function(){
//     var chunk = null;
//     while (null !== (chunk = request.read())){
//       response.write(chunk);
//     }
//   });
//   request.on('end', function(){
//     response.end();
//   });
// }).listen(8080)

//the above code can be replaced with:

http.createServer(function(request, response){
  response.writeHead(200);
  request.pipe(response);
}).listen(8080)
