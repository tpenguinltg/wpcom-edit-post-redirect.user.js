// ==UserScript==
// @name        WordPress.com edit post redirects
// @namespace   tpenguinltg
// @description Redirects the new post page to the classic post page
// @include     https://wordpress.com/post*
// @include     https://wordpress.com/page*
// @version     1.4.0
// @updateURL   https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js
// @homepageURL https://greasyfork.org/en/scripts/8581-wordpress-com-edit-post-redirects
// @homepageURL https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js
// @grant       none
// @license     MPLv2.0; http://mozilla.org/MPL/2.0/
// @copyright   2015, tPenguinLTG (http://tpenguinltg.wordpress.com/)
// @run-at      document-start
// ==/UserScript==

// gather information from URL
var parsedUrl=window.location.pathname.match(/(post|page)(?:\/([^\/]+)(?:\/(\d+|new)?)?)?/);
var postType=parsedUrl[1];
var blogid=parsedUrl[2];
var postid=parsedUrl[3];


/**
 * Initiates the redirect.
 */
function redirectToClassic() {
  // if no blog specified
  if(!blogid) {
    guessClassicLink();
  }// if
  else {
    // Redirect to post URL based on API results
    // API docs: https://developer.wordpress.com/docs/api/
    fetchJSONFile("https://public-api.wordpress.com/rest/v1.1/sites/"+blogid, apiRedirect, guessClassicLink);
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
 * Builds the classic editor link using the specified base.
 * The base should not have a trailing slash.
 */
function buildClassicLink(base) {
    var posturl=base;
    //new post
    if(postid == "new" || postid == null) {
      posturl+="/wp-admin/post-new.php?post_type="+postType;
    }//if
    //existing post
    else {
      posturl+="/wp-admin/post.php?post="+postid+"&action=edit";
    }//end if

    return posturl;
}//end buildLink

/**
 * Guesses the link to the classic editor based on the blog ID, which
 * should be the domain if it is not numeric.
 */
function guessClassicLink() {
  // if the blog ID is not numeric, then it is a domain
  if(blogid && isNaN(blogid)) {
    // use the blogid to build URL
    // and redirect
    window.location.replace(buildClassicLink("https://"+blogid));
  }//if
  else {
    scrapeSiteLink();
  }//end if
}//end guessClassicLink


/**
 * Scrapes the page for the site link
 */
function scrapeSiteLink() {
  window.onload=function() {
    // FIXME this will not work for Jetpack-enabled sites that have
    // different WordPress and site roots
    // e.g. site is accessed at http://example.com/,
    // but admin at http://example.com/wordpress/wp-admin/
    blogurl=document.querySelector(".site__content[href]").href;

    // strip trailing slash
    if(blogurl.charAt(blogurl.length-1) === '/') {
      blogurl=blogurl.substr(0, blogurl.length-1);
    }//end if

    // in case nothing is returned, don't do anything
    if(blogurl) {
      window.location.replace(buildClassicLink(blogurl));
    }//end if
  };//end window.onload
}

/**
 * Sets up a redirect using the given parsed API data.
 * @param data  the parsed API results as a JSON object
 */
function apiRedirect(data) {
  // if not a private blog, redirect using API
  if(!data.error) {
    //redirect
    window.location.replace(buildClassicLink(data.URL));
  }//if

  // else this is a private blog
  else {
    guessClassicLink();
  }//end if
}//end apiRedirect

// initiate redirect
redirectToClassic();
