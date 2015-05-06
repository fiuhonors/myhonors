# MyHonors (Web)
MyHonors (Web) is a fast, highly performant and beautiful web app platform that connects FIU Honors College students, clubs, professors and staff.

## Technology
MyHonors uses a myriad of web technologies. Some frameworks, tools, and libraries that are used are:

Core Frameworks/Libraries
* [Firebase](http://firebase.com/) for storing data in real-time
* [AngularJS](https://angularjs.org/) for organizing and abstracting client-side Javascript app logic
* [Bootstrap](http://getbootstrap.com/) for the app's interface and design

Build Process
* [Gulp](http://gulpjs.com/) for automating some tasks like running our tests, minification, code-hints and many more
* [Bower](http://bower.io/) for handling our front-end dependencies
* [Composer](https://getcomposer.org/) for handling our back-end dependencies
* [PHPUnit](https://phpunit.de/) for unit-testing our PHP code
* [Jasmine](http://jasmine.github.io/2.2/introduction.html) for unit-testing our Javascript code
* [Travis CI](https://travis-ci.org/) for continous-integration, ensuring the quality of our production code

## Features
The student-centric features are:

* Events
  - Event Calendar
  - RSVP for an event
  - Swipe in to an event for attendance
* Community Service
  - Submit community service hours
* Internship/Opportunities
  - Apply for an internship/opportunity
* ARCH projects
  - Revise an ARCH project
  - Submit an ARCH project
* Honors Course Registration
  - Choose a future Honors class
* Portfolio
  - Add a Portfolio item
  - Edit a Portfolio item

The staff-centric features are:

* Student Management
  - Events Attended
  - Community Service Hours
  - Applications for Internships/Opportunities
* Course Registration
  - Add new courses
  - Edit courses
  - Remove courses
  - Enrollment Management
* Lab/Study Room swipes
* Event
  - Event statistics
  - Attendance Swipe-in
  - Add a new event
  - Edit an event
  - Delete an event
* RFID Tag registration
* ARCH projects management
* Club management

## Ground rules
To keep MyHonors highly scalable, it needs to follow a certain discipline in its development environment. Here are some ground rules to follow:

* Always write your tests before you write your code - Behavior Driven Development!
* Make sure that tests pass and that you are in sync with the current master branch before making a pull request/merge to the master branch!
* Follow John Papa's [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)!
* Overview of [Javascript, including ES6/ES7](https://github.com/airbnb/javascript)!

For more information, do not hesitate to check out the [Wiki](https://github.com/fiuhonors/myhonors/wiki)!