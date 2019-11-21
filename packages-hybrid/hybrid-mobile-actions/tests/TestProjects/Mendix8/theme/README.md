# Mendix Atlas UI

Mendix Atlas UI is the foundation of making beautiful apps with Mendix. For more information about the framework go to
[here](https://atlas.mendix.com/).

#### Structure

Mendix is capable of creating beautiful and user-friendly UI. Our Atlas UI framework demonstrates some of its
possibilities. Here you will find a basic overview of our framework.

```
theme/
├── styles/
|   ├── native/
|       ├── app/
|       |   ├── _custom-variables.js
|       |   └── _custom.js
|       ├── core/
|       |   ├── base/
|       |   ├── helpers/
|       |   ├── widgets/
|       |   | _variables.js
|       |   └── manifest.json
|       ├── ui_resources/
|       |   └── atlas_ui_resources/
|       |       ├── buildingblocks/
|       |       └── layouts/
|       └── main.js
|   └── web/
|       ├── css/
|       │   ├── * all output files
|       └── sass/
|           ├── app/
|           |   ├── _custom-variables.scss
|           |   └── _custom.scss
|           ├── core/
|           |   ├── _legacy/
|           |   ├── base/
|           |   ├── helpers/
|           |   ├── widgets/
|           |   ├── widgetscustom/
|           |   |   _variables.scss
|           |   └── manifest.json
|           ├── ui_resources/
|           |   └── atlas_ui_resources/
|           |       ├── buildingblocks/
|           |       └── layouts/
|           └── main.scss
├── * index files
├── * assets
├── * settings*.json (Design Properties)
└── styles.js
```

#### App

The app folder contains all custom styling. We recommend users to only use this directory for any custom styling.

When you want to customize something, you should first check if you can accomplish your goal by changing variables.
These variables can be found in _styles/web/sass/core/variables.scss_ or _styles/native/core/variables.js_. If you want
to change any core variable, copy it to _../app/\_custom-variables.(scss|js)_ and change it there. It will then
overwrite the core variable. This will make updating Atlas UI much easier in the future.

#### Core

The core folder is the heart of Atlas UI. This folder includes base styling, widget styling & additional helper classes.
The core widget styling is split in to two parts. The widget folder includes the default widget styling, as it will look
out of the box. The helpers folder will include design properties and extra classes to change that default styling.

#### UI Resources

THe UI Resources folder will contain any styling related to Building Blocks, Page Templates and Layouts.

Building blocks are created with Widgets. For example _cards_ or _headers_ are building blocks. A building block could
be an image, a title, and a button, assembled together into one UI block.

Page Templates are created with Building Blocks and Widgets. Page Templates are an example of how a page could look
like.

Layouts are created with widgets. They are mainly used for navigation or user experiences which need to be consistent
between pages.

## License

MIT
