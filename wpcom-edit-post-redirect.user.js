// ==UserScript==
// @name        WordPress.com edit post redirects
// @namespace   tpenguinltg
// @description Redirects the new post page to the classic post page
// @include     https://wordpress.com/post*
// @include     https://wordpress.com/page*
// @version     1.3.0
// @updateURL   https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js
// @homepageURL https://greasyfork.org/en/scripts/8581-wordpress-com-edit-post-redirects
// @homepageURL https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js
// @grant       none
// @license     MPLv2.0; http://mozilla.org/MPL/2.0/
// @copyright   2015, tPenguinLTG (http://tpenguinltg.wordpress.com/)
// @run-at      document-start
// ==/UserScript==

// gather information from URL
var parsedUrl=window.location.pathname.match(/(post|page)(\/(\d+)\/(\d+|new))?/);
var postType=parsedUrl[1];
var blogid=parsedUrl[3];
var postid=parsedUrl[4];

/**
 * Initiates the redirect.
 */
function redirectToClassic() {
  // if no blog specified
  if(!blogid) {
    scrapeClassicLink();
  }// if
  else {
    // Redirect to post URL based on API results
    // API docs: https://developer.wordpress.com/docs/api/
    fetchJSONFile("https://public-api.wordpress.com/rest/v1.1/sites/"+blogid, apiRedirect, scrapeClassicLink);
  }//end if
}//end redirectToClassic


/**
 * Handles the API request via AJAX.
 * @param path      the URL to request. The response should be a JSON object.
 * @param callback  the function to call on success.
 *                  This function should take in a single JSON object.
 * @param fallback  the function to call on failure
 */
// Based on function by dystroy. From http://stackoverflow.com/a/14388512
function fetchJSONFile(path, callback, fallback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }//if
            else {
                if(fallback) fallback();
            }//end if
        }//end if
    };//end onreadystatechange()
    httpRequest.open('GET', path);
    httpRequest.send(); 
}//end fetchJSONFile


/**
 * Scrapes the loaded page for the link to the classic editor.
 */
function scrapeClassicLink() {
  // scrape the edit URL from the page when the DOM has finished loading
  window.onload=function() {
    var classicLink="";

    //new post
    if(postid == "new") {
      var blogurl=jQuery(".site.blog-select-click.is-selected").attr("data-blogurl");
      classicLink=blogurl+"/wp-admin/post-new.php?post_type="+postType;
    }//if

    //existing post
    else {
      classicLink=jQuery(".switch-to-classic>a").attr("href");
    }//end if

    window.location.replace(classicLink);
  }; //end window.onload
}//end scrapeClassicLink


/**
 * Sets up a redirect using the given parsed API data.
 * @param data  the parsed API results as a JSON object
 */
function apiRedirect(data) {
  // if not a private blog, redirect using API
  if(!data.error && !data.jetpack) {
    var postURL;
    //new post
    if(postid == "new") {
      postURL=data.URL+"/wp-admin/post-new.php?post_type="+postType;
    }//if
    //existing post
    else {
      postURL=data.URL+"/wp-admin/post.php?post="+postid+"&action=edit";
    }//end if
    //redirect
    window.location.replace(postURL);
  }//if

  // else this is a private blog
  else {
    scrapeClassicLink();
  }//end if
}//end apiRedirect


// initiate redirect
redirectToClassic();
