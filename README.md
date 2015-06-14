# wpcom-edit-post-redirect.user.js
[WordPress.com](https://wordpress.com/) has removed the preference to edit posts using the classic interface. This user script forces a redirect to the classic interface when the new edit interface is visited.

## Installation
If you don't already have one, install [a browser extension](https://greasyfork.org/en/help/installing-user-scripts) that allows you to run user scripts. Then, visit the URL below:

[https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js](https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js)

Also on [Greasy Fork](https://greasyfork.org/en/scripts/8581-wordpress-com-edit-post-redirects).

## Known Issues
*   The new interface will sometimes start loading and appear before the redirect occurs

    *   For unattached post editing (i.e. editing a new post without first specifiying a blog; accessed from [https://wordpress.com/post](https://wordpress.com/post)), the new editor will load completely before being redirected.
    *   The new editor will also load completely for private and Jetpack-enabled. This is an API limitation.
        
*   <del>When editing new posts (i.e. posts without a post ID) on Jetpack-enabled sites, the redirection will likely fail if the site root is different from the installation root (e.g. the site is accessed from <i>http://example.com/</i>, but the installation root is <i>http://example.com/wordpress/</i>.).</del>

## Other workarounds
If you don't like this script or can't use it for any reason, there are [other workarounds](http://git.io/wpcom-restore-classic-ed) available.


## Changelog
* **v1.0.0:** Initial release
* **v1.0.1:** Change updateURL to point to GitHub source
* **v1.0.2:** Reduce to single regex call
* **v1.1.0:** Add support for editing pages
* **v1.2.0:** Add redirect for unattached post editing
* **v1.2.1:** Remove testing code that prevented redirection
* **v1.2.2:** Fixed redirection for private and Jetpack-enabled blogs
* **v1.2.3:** Code cleanup and documentation
* **v1.3.0:** Fix new post redirection for private and Jetpack-enabled blogs
