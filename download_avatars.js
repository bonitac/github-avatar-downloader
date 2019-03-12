require('dotenv').config();
var sk = require('./secrets')
var request = require('request');
var fs = require('fs')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': sk
    }
  };
  
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body)); //deal with err after establishing "happy path"
    JSON.parse(body).forEach(function(user){console.log(user.avatar_url)
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
    .on('response', function (response) {
      console.log('Response Status Code: ', response);
    })
    .pipe(fs.createWriteStream("./"+filePath));  
    })
}
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

// request.get("https://avatars2.githubusercontent.com/u/2741?v=3&s=466")
//         .on('error', function (err){throw err})
//         .pipe(fs.createReadStream("test.jpg"))




// getRepoContributors("jquery", "jquery", function(err, result) {
// });