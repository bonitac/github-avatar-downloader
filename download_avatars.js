var request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...
}
//cb is ballback function to handle asynch of results to be returned from getRepoContri
//deal with err after establishing "happy path"


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});