# wpcom-edit-post-redirect.user.js
[WordPress.com](https://wordpress.com/) has removed the preference to edit posts using the classic interface. This user script forces a redirect to the classic interface when the new edit interface is visited.

## Installation
If you don't already have one, install [a browser extension](https://greasyfork.org/en/help/installing-user-scripts) that allows you to run user scripts. Then, visit the URL below:

[https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js](https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js)

Also on [Greasy Fork](https://greasyfork.org/en/scripts/8581-wordpress-com-edit-post-redirects).

## Known Issues
*   The new interface will sometimes start loading and appear before the redirect occurs
*   The redirection will likely fail on Jetpack-enabled sites whose site root is different from its installation root (e.g. the site is accessed from <i>http://example.com/</i>, but the installation root is <i>http://example.com/wordpress/</i>).

## Other workarounds
If you don't like this script or can't use it for any reason, there are [other workarounds](http://git.io/wpcom-restore-classic-ed) available.


## Changelog
* **v1.6.0:** Update for new [block editor](https://wordpress.com/blog/2020/08/13/the-classic-editing-experience-is-moving-not-leaving/) redirect on old classic editor URLs. Also clean up code.
* **v1.5.0:** Update for a slight restructuring in the editor page. This only affects the fallback attempt.
* **v1.4.0:** Update for [new editor](https://en.blog.wordpress.com/2015/11/16/new-high-speed-editor/)
* **v1.3.1:** Fix new post redirection for default blog
* **v1.3.0:** Fix new post redirection for private and Jetpack-enabled blogs
* **v1.2.3:** Code cleanup and documentation
* **v1.2.2:** Fixed redirection for private and Jetpack-enabled blogs
* **v1.2.1:** Remove testing code that prevented redirection
* **v1.2.0:** Add redirect for unattached post editing
* **v1.1.0:** Add support for editing pages
* **v1.0.2:** Reduce to single regex call
* **v1.0.1:** Change updateURL to point to GitHub source
* **v1.0.0:** Initial release
