var request = require('request');
var url = require('url');

app.get('/tweets/:username', function(req, response){
  var username = req.params.username;

  //get the last 10 tweets for username
  options = {
    protocol: "http:",
    host: 'api.twitter.com',
    pathname: '/1/statuses/user_timeline.json',
    query: { screen_name: username, count: 10}
  }

  var twitterUrl = url.format(options);
  request(twitterUrl).pipe(response);
});

//app.get('/', function(request, response){
//response.sendFile(__dirname + '/index.html');
//});
