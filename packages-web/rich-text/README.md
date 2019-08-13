[![Build Status](https://travis-ci.org/mendixlabs/rich-text.svg?branch=master)](https://travis-ci.org/mendixlabs/rich-text)
[![Dependency Status](https://david-dm.org/mendixlabs/rich-text.svg)](https://david-dm.org/mendixlabs/rich-text)
[![Dev Dependency Status](https://david-dm.org/mendixlabs/rich-text.svg#info=devDependencies)](https://david-dm.org/mendixlabs/rich-text#info=devDependencies)
[![codecov](https://codecov.io/gh/mendixlabs/rich-text/branch/master/graph/badge.svg)](https://codecov.io/gh/mendixlabs/rich-text)

# Rich Text

Rich inline or toolbar text editing

## Features

-   Format selected text
-   HTML output of formatted text
-   Show editor options either on a toolbar or as a bubble
-   Use the custom option to select which editing options you want to show
-   Input and display text is sanitized.

### Keyboard shortcuts

-   Ctrl + B: Bold
-   Ctrl + I: Italic
-   Ctrl + U: Underline
-   Ctrl + Z: Undo
-   Ctrl + Y: Redo
-   Ctrl + C: Copy
-   Ctrl + V: Paste
-   -, space : start list
-   tab: indents the content when tab key is configured to indent from the widget xml else it will move focus to next
    element

## Dependencies

Mendix 7.13.1

## Test project

http://texteditorwidget.mxapps.io ![Running rich text toolbar widget](/assets/Demo-Toolbar.png)
![Running rich text bubble widget](/assets/Demo-Bubble.png)

## Usage

Place the widget in a data view, list view or template grid with a data source that has a string attribute and select
the 'Value attribute' that contains the editable text.

## HTML content

Please note, that the input and output is sanitized. All unsupported HTML tags and JavaScript is removed for security
reasons. Supports:

-   Tags: h1, h2, h3, h4, h5, h6, p, br, a, ul, li, ol, s, u, em, pre, strong, blockquote, span
-   Attributes:
    -   for all tags: class, style
    -   `a` tag: href, name, target
-   Schemes: http, https, ftp, mailto

**Please note**: To be fully secure, all user HTML input should be sanitized on the server side too. This could be done
with the `XSSSanitize` action found in the Community Commons https://appstore.home.mendix.com/link/app/170/ When the
option 'Sanitize content' is set to 'false' server side sanitating is required before showing any HTML content.

## Issues, suggestions and feature requests

We are actively maintaining this widget, please report any issues or suggestion for improvement at
https://github.com/mendixlabs/rich-text/issues

## Development

Prerequisite: Install git, node package manager, webpack CLI, grunt CLI, Karma CLI

To contribute, fork and clone.

    > git clone https://github.com/mendixlabs/rich-text.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Changes to the
widget code shall be automatically pushed to this test project. Or get the test project from
[https://github.com/mendixlabs/rich-text/releases/latest](https://github.com/mendixlabs/rich-text/releases/latest)

To automatically compile, bundle and push code changes to the running test project, run:

    > grunt

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm test

or run the test continuously during development:

    > karma start
