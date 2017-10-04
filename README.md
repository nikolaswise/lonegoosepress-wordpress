# Fuzzcode Wordpress Theme

This repository contains common plugins and a scaffold theme for the development of Wordpress projects. The project root can be cloned directly into a `wp-content` folder. 

## Quick start

### Requirements

* [NodeJS](http://nodejs.org/)
* [FuzzCode Dev Space](#)

### Setup

Clone this project into your Dev Space `wp-content` folder:

```
$ git clone git@bitbucket.org:nikolaswise/fuzzcode-wordpress.git wp-content
```

Change your directory to the working theme:

```
$ cd wp-content/themes/fuzzco
```

Install all development and front-end dependencies:

```
$ npm install
```

Start watching the assets for compilation:

```
$ npm start
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

JavaScript dependencies are managed using NPM and bundled using [Rollup](https://rollupjs.org/) via /source/js/app.js.

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
import dependencyName from 'DEPENDENCYNAME';
```

For example:

```
import fastclick from 'fastclick';
```

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

## Git commit guidelines

* https://github.com/erlang/otp/wiki/Writing-good-commit-messages
* http://chris.beams.io/posts/git-commit/

## Tools

Fuzzcode utilizes EditorConfig to maintain consistent coding styles accross different editors.

Download the [EditorConfig](http://editorconfig.org/) Plugin for your editor.

## Stage

Stage the project to WP Engine (whatever that means, TBD really):

```
$ npm run stage
```

## Deploy

Again, this will work at the end of the day but TBD on the details:

```
$ npm run deploy
```

## Deploybot

> Deploybot is probably going to be deprecated in favor of WP Engine git deploys.

If deploying using Deploybot you must first deploy all files with only the build command ```npm install``` within the "Compile, compress, or minimize your code" section. Once all files have been deployed then add ```npm run build``` after ```npm install``` and redeploy all files. This will assure everything is correctly installed before a build is performed.

The first deployment will take some time while it installs all the project dependecies, once everything is installed deployments will run quickly.

You will need to ```cd``` into your themes directory for exmple ```cd wp-content/themes/fuzzco``` before running any other command within the "Compile, compress, or minimize your code" section. This is telling Deploybot which folder contains your ```package.json```.
