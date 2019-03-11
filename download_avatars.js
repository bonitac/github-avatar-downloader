require('dotenv').config();
var sk = require('./secrets')
var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': sk
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
    JSON.parse(body).forEach(function(user){console.log(user.avatar_url)
  });
})}
//cb is ballback function to handle asynch of results to be returned from getRepoContri
//deal with err after establishing "happy path"


getRepoContributors("jquery", "jquery", function(err, result) {
});