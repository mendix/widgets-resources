[![Build Status](https://travis-ci.org/mendixlabs/star-rating.svg?branch=master)](https://travis-ci.org/mendixlabs/star-rating)
[![Dependency Status](https://david-dm.org/mendixlabs/star-rating.svg)](https://david-dm.org/mendixlabs/star-rating)
[![Dev Dependency Status](https://david-dm.org/mendixlabs/star-rating.svg#info=devDependencies)](https://david-dm.org/mendixlabs/star-rating#info=devDependencies)
[![codecov](https://codecov.io/gh/mendixlabs/star-rating/branch/master/graph/badge.svg)](https://codecov.io/gh/mendixlabs/star-rating)

# Star rating
This widget lets users rate an object with stars or custom icons.

## Features
* Rate an object with stars
* Display average rating
* Display rating in whole and half stars
* Execute a microflow when the rate is changed
* Configurable star colors
* Flexible number of stars
* Supports mobile touch events

## Dependencies
Mendix 7.1

## Demo project
Try our the demo project https://rating100.mxapps.io with username: x/y/z and password: 1
Editing of a rate is possible if the logged in user owns that vote

## Usage
This widget requires a context.

## Customize rating icon
In order to over-write the default star icon, add these classes to your project theme. Replace `content` with your preferred glyphicon icon
``` css
 .rating-flag [class*="widget-star-rating-full"]:before {
  content: "\e034"; /* flag icon */ 
 }
.rating-flag .widget-star-rating-empty:before {
  content: "\e034"; /* flag icon */
 }
```
Note. Add class `rating-flag` to the widget configuration in the modeler tab 'common'

### Security Configuration

Security is a mandatory feature for rating and is considered seriously for proper use of this widget in a mendix project.
 - Model Configuration

 ![Domain model](/assets/domain_model.jpg)
 - Campaign entity security: a User should only read the average attribute 
 
 ![Security campaign](/assets/security_campaign.jpg)
 - Rating or voting entity security: The user can only write their own rating 
 
 ![Security rate](/assets/security_rate.jpg)
 - When creating a new rating, its important to use the current user's previous rating as the initial rate value. use this microflow [RateMe microflow](https://modelshare.mendix.com/models/d7ece331-49d4-4464-a2e2-ea75528a0367/rate-me) for the rate me custom button
 - Calculation of the average rate is done by adding a [Calculate average microflow](https://modelshare.mendix.com/models/d27114b6-e2fb-4d79-aa39-8c60a6477ca8/calculate-average-rate) to the after commit and and after delete event handlers in the domain modeler

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestion for improvement at https://github.com/mendixlabs/star-rating/issues.

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    > git clone https://github.com/mendixlabs/star-rating.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Or get the test project from [https://github.com/mendixlabs/star-rating/releases/latest](https://github.com/mendixlabs/star-rating/releases/latest) When Grunt is running changes to the widget code shall be automatically pushed to this test project.

To automatically compile, bundle and push code changes to the running Mendix test project, run:

    > grunt

To run the unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm test

or run the unit tests continuously during development:

    > karma start
