# wpcom-edit-post-redirect.user.js
[WordPress.com](https://wordpress.com/) has removed the preference to edit posts using the classic interface. This user script forces a redirect to the classic interface when the new edit interface is visited.

## Installation
If you don't already have one, install [a browser extension](https://greasyfork.org/en/help/installing-user-scripts) that allows you to run user scripts. Then, visit the URL below:

[https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js](https://github.com/tpenguinltg/wpcom-edit-post-redirect.user.js/raw/master/wpcom-edit-post-redirect.user.js)

Also on [Greasy Fork](https://greasyfork.org/en/scripts/8581-wordpress-com-edit-post-redirects).

## Known Issues
* The new interface will sometimes start loading and appear before the redirect occurs
* The redirection will likely fail if the site root is different from the installation root for Jetpack-enabled sites.

  e.g. the site is accessed from *http://example.com/*, but the installation root is *http://example.com/wordpress/*.

## Changelog
* **v1.0.0:** Initial release
* **v1.0.1:** Change updateURL to point to GitHub source
* **v1.0.2:** Reduce to single regex call
* **v1.1.0:** Add support for editing pages
