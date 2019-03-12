var env = require('dotenv').config();
var request = require('request');
var fs = require('fs')

getRepoContributors(process.argv[2],process.argv[3],function(err, result) {
  console.log("Errors:", err);
});

function getRepoContributors(repoOwner, repoName,cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': process.env.github
    }
  };
  
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body)); //deal with err after establishing "happy path"
    JSON.parse(body).forEach(function(user){return downloadImageByURL(user.avatar_url,"avatars/"+user.login+".jpg")
    });
  })}
//cb is callback function to handle asynch of results to be returned from getRepoContri

function downloadImageByURL(url, filePath) {
  fs.mkdir("avatars",function(err){ //async making folder and then making sure the request comes after
    //add error if directory somehow doesn't get made
    request.get(url)
    .on('error', function (err) {
      throw err; 
    })
    .pipe(fs.createWriteStream("./"+filePath));  
    })
}
