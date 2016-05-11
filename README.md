# Fuzzcode Wordpress Theme

## Quick start

### Requirements

* [NodeJS](http://nodejs.org/)
* [MAMP](https://www.mamp.info/)

### Setup

Install all development and front-end dependencies.

```
$ npm install
```

Update proxy server within package.json to point to your local project domain.

```
"serve": "browser-sync start --proxy 'fuzzcode.dev' --files '**/*' '*.php' --no-ghost-mode --no-notify"
```

### File structure

CSS:

* Source: source/scss/style.scss
* Creates: style.min.css

JavaScript:

* Source: source/js/app.js
* Creates: js/bundle.js

### Dependencies

Search for available dependencies on [https://npmjs.com](https://www.npmjs.com/) or by using `$ npm search`.

#### CSS

CSS dependencies are managed using NPM and imported via source/scss/style.scss.

Add dependency using:

```
$ npm install --save DEPENDENCY_NAME
```

For example:

```
$ npm install --save foundation-sites
```

Within /source/scss/style.scss link to dependency:

```
@import 'node_modules/DEPENDENCY_NAME';
```

For example:

```
@import 'node_modules/foundation-sites/scss/foundation';
```

#### JavaScript

JavaScript dependencies are managed using NPM and imported using [Browserfy](http://browserify.org/) via /source/js/app.js.

Add dependency using:

```
$ npm install --save DEPENDENCY_NAME
```

For example:

```
$ npm install --save fastclick
```

Within /source/js/app.js add:

```
var dependencyName = require('DEPENDENCYNAME');
```

For example:

```
var fastclick = require('fastclick');
```

### Development build server

```
$ npm run watch
```

When it finishes, a new browser window will open pointing to a local BrowserSync server.

### Production build

```
$ npm run build
```

If manual deployment run `$ npm run build` and update compiled files.

### Deployments

All deployments should be done using [DeployBot](https://deploybot.com/). Connect with Nathan for setup. Staging server is automatically updated every time you check in. To deploy to staging or production servers use commit message typically [deploy: staging] or [deploy: production].

## Code style guides

* [JavaScript style guide](https://bitbucket.org/fuzzco/fuzzcode/wiki/JavaScript%20Style%20Guide)
* [CSS style guide](https://bitbucket.org/fuzzco/fuzzcode/wiki/CSS%20Style%20Guide)
* [HTML style guide](https://bitbucket.org/fuzzco/fuzzcode/wiki/HTML%20Style%20Guide)

## Foundation documentation

* http://foundation.zurb.com/sites/docs/sass-mixins.html

## Git commit guidelines

* https://github.com/erlang/otp/wiki/Writing-good-commit-messages
* http://chris.beams.io/posts/git-commit/

## Tools

Fuzzcode utilizes EditorConfig to maintain consistent coding styles accross different editors.

Download the [EditorConfig](http://editorconfig.org/) Plugin for your editor.
