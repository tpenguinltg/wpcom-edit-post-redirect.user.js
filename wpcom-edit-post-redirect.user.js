// ==UserScript==
// @name        WordPress.com edit post redirects
// @namespace   tpenguinltg
// @description Redirects the new post page to the classic post page
// @include     https://wordpress.com/post/*
// @version     1.0.2
// @updateURL   https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js
// @homepageURL https://greasyfork.org/en/scripts/8581-wordpress-com-edit-post-redirects
// @homepageURL https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js
// @grant       none
// @license     MPLv2.0; http://mozilla.org/MPL/2.0/
// @copyright   2015, tPenguinLTG (http://tpenguinltg.wordpress.com/)
// @run-at      document-start
// ==/UserScript==

var parsedUrl=window.location.pathname.match(/(\d+)\/(\d+|new)/);
var blogid=parsedUrl[1];
var postid=parsedUrl[2];

// Function by dystroy. From http://stackoverflow.com/a/14388512
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }//end if
        }//end if
    };//end onreadystatechange()
    httpRequest.open('GET', path);
    httpRequest.send(); 
}


// Redirect to post URL based on API results
// API docs: https://developer.wordpress.com/docs/api/
fetchJSONFile("https://public-api.wordpress.com/rest/v1.1/sites/"+blogid, function(data) {
  var postURL;

  if(postid == "new") {
    postURL=data.URL+"/wp-admin/post-new.php";
  }//if
  else {
    postURL=data.URL+"/wp-admin/post.php?post="+postid+"&action=edit";
  }//end if

  window.location.replace(postURL);

});

