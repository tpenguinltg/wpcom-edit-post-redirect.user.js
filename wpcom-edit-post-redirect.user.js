// ==UserScript==
// @name        WordPress.com edit post redirects
// @namespace   tpenguinltg
// @description Redirects the new post page to the classic post page
// @include     https://wordpress.com/post*
// @include     https://wordpress.com/page*
// @version     1.2.0
// @updateURL   https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js
// @homepageURL https://greasyfork.org/en/scripts/8581-wordpress-com-edit-post-redirects
// @homepageURL https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js
// @grant       none
// @license     MPLv2.0; http://mozilla.org/MPL/2.0/
// @copyright   2015, tPenguinLTG (http://tpenguinltg.wordpress.com/)
// @run-at      document-start
// ==/UserScript==

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

// gather information from URL
var parsedUrl=window.location.pathname.match(/(post|page)(\/(\d+)\/(\d+|new))?/);
var postType=parsedUrl[1];
var blogid=parsedUrl[3];
var postid=parsedUrl[4];

// if no blog given
if(!blogid) {
  // scrape the edit URL from the page when the DOM has finished loading
  document.onload=function() {
    window.location.replace(document.getElementsByClassName("switch-to-classic")[0].children[0].href);
  }; //end document.onload
}// if
else {
  // Redirect to post URL based on API results
  // API docs: https://developer.wordpress.com/docs/api/
  fetchJSONFile("https://public-api.wordpress.com/rest/v1.1/sites/"+blogid, function(data) {
    var postURL;

    if(postid == "new") {
      //postURL=data.URL+"/wp-admin/post-new.php?post_type="+postType;
      postURL=data.options.admin_url+"/post-new.php?post_type="+postType;
    }//if
    else {
      //postURL=data.URL+"/wp-admin/post.php?post="+postid+"&action=edit";
      postURL=data.options.admin_url+"/post-new.php?post_type="+postType;
    }//end if

    window.location.replace(postURL);

  });
}
