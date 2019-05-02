# Pluggable Widgets Typing Generator

Typescript typing generator for Pluggable Widgets

## How to install

Install from npm using `npm install @mendix/pluggable-widgets-typing-generator`

## How to use

Make sure you are using gulp as your taskrunner.

-   Include the imported library in your gulpfile.js

```
const typingGenerator = require("@mendix/pluggable-widgets-typing-generator").typingGenerator;
```

or for gulp using Babel and ES2015 (gulpfile.babel.js) or Typescript (gulpfile.ts)

```
import { typingGenerator } from "@mendix/pluggable-widgets-typing-generator";
```

-   Create a Gulp Task to read the xml file and generate your typings

```
function generateTypings() {
    return gulp
        .src(`./src/NAMEOFYOURWIDGET.xml`)
        .pipe(typingGenerator({widgetName: NAMEOFYOURWIDGET}))
        .pipe(gulp.dest("./typings"));
}
```

Make sure to change NAMEOFYOURWIDGET for the real name of your widget and select isNative to true if you are building a
React Native widget
