# MyHonors (Web) 

![Travis Build System](https://travis-ci.org/fiuhonors/myhonors.svg) [![Coverage Status](https://coveralls.io/repos/fiuhonors/myhonors/badge.svg)](https://coveralls.io/r/fiuhonors/myhonors) [![Code Climate](https://codeclimate.com/github/fiuhonors/myhonors/badges/gpa.svg)](https://codeclimate.com/github/fiuhonors/myhonors) [![Dependency Status](https://www.versioneye.com/user/projects/5550b4298da49d97b8000002/badge.svg?style=flat)](https://www.versioneye.com/user/projects/5550b4298da49d97b8000002)

MyHonors (Web) is a fast, highly performant and beautiful web platform that connects FIU Honors College students, clubs, professors and staff.

## Starting Development

1. Setup the appropriate configuration settings (keys, reference URLs, etc.) at `app/config.js`.
2. `npm install` to install all of our development dependencies.
3. `npm install bower -g` to install Bower globally (if you have not)
3. `bower install` to install all of our front-end dependencies.
4. `gulp` to run gulp, our task runner that automates things like SASS to CSS compilation, JS minification and uglifying, JSX and/or Typescript to JS compilation.

## Technology
MyHonors uses a myriad of web technologies. Some frameworks, tools, and libraries that are used are:

Core Frameworks/Libraries
* [FirebaseJS](http://firebase.com/) for storing data in real-time to the Firebase database
* [AngularJS](https://angularjs.org/) for organizing and abstracting client-side Javascript app logic
* [Bootstrap](http://getbootstrap.com/) for the app's interface and design

Build Process
* [Gulp](http://gulpjs.com/) for automating some tasks like running our tests, minification, code-hints and many more
* [Bower](http://bower.io/) for handling our front-end dependencies
* [Jasmine](http://jasmine.github.io/2.2/introduction.html) for unit-testing our Javascript code
* [Travis CI](https://travis-ci.org/) for continous-integration, ensuring the quality of our production code

## Ground rules
To keep MyHonors highly scalable, it needs to follow a certain discipline in its development environment. Here are some ground rules to follow:

* Always write your tests before you write your code - Behavior Driven Development!
* Make sure that tests pass and that you are in sync with the current master branch before making a pull request/merge to the master branch!
* Follow John Papa's [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)!
* Overview of [Javascript, including ES6/ES7](https://github.com/airbnb/javascript)!

For more information, do not hesitate to check out the [Wiki](https://github.com/fiuhonors/myhonors/wiki)!