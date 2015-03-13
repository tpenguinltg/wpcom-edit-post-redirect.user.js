// ==UserScript==
// @name        WordPress.com edit post redirects
// @namespace   tpenguinltg
// @description Redirects the new post page to the classic post page
// @include     https://wordpress.com/post/*
// @version     1.0.0
// @updateURL   https://greasyfork.org/scripts/8581-wordpress-com-edit-post-redirects/code/WordPresscom%20edit%20post%20redirects.user.js
// @grant       none
// @license     MPLv2.0; http://mozilla.org/MPL/2.0/
// @copyright   2015, tPenguinLTG (http://tpenguinltg.wordpress.com/)
// @run-at      document-start
// ==/UserScript==

var blogid=window.location.pathname.match(/\d+/)[0];
var postid=window.location.pathname.match(/\d+\/(\d+|new)/)[1];

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

