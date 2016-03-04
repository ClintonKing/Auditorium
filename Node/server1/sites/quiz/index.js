var http = require('http');
var server = http.createServer();
var name = "Lindsay Carbonell";

server.on('request', function(req, resp){
  resp.writeHead(200);
  resp.write("<h1>hello world</h1>");
  resp.write(name);
  //console.log("what");
  resp.end();
}).listen(8080, function(){
  console.log("running on 8080");
});
