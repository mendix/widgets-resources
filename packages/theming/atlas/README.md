# Mendix Atlas UI

Mendix Atlas UI is the foundation of making beautiful apps with Mendix. For more information about the framework visit the [website](https://atlas.mendix.com/).

## Structure

```
├── content
│   └── resources
├── scripts
│   └── lib
└── src
    ├── native
    │   └── ts
    │       ├── app
    │       ├── core
    │       │   ├── base
    │       │   ├── helpers
    │       │   │   └── _functions
    │       │   └── widgets
    │       ├── types
    │       └── ui_resources
    │           └── atlas_ui_resources
    │               ├── buildingblocks
    │               └── pagetemplates
    └── web
        ├── css
        │   └── fonts
        └── sass
            ├── app
            ├── core
            │   ├── _legacy
            │   │   └── bootstrap
            │   │       └── fonts
            │   ├── base
            │   │   └── mixins
            │   ├── helpers
            │   ├── widgets
            │   └── widgetscustom
            └── ui_resources
                └── atlas_ui_resources
                    ├── buildingblocks
                    └── layouts
```

## Overview

Atlas targets two environments, web and native. The file structure is similar between the two environments.

### Web and native `app` directory

The `app` directory contains all custom styling. We recommend users to only use this directory for any custom styling.

### Core

The core folder is the heart of Atlas UI. This folder includes base styling, widget styling & additional helper classes.
The core widget styling is split into two parts: the `widget` folder includes the default widget styling, as it will look
out of the box; the `helpers` folder will include design properties and extra classes to change that default styling.

### UI Resources

THe UI Resources folder will contain any styling related to Building Blocks, Page Templates and Layouts.

Building blocks are created with Widgets. For example cards or headers are building blocks. A building block could
be an image, a title, and a button, assembled together into one UI block.

Page Templates are created with Building Blocks and Widgets. Page Templates are an example of how a page could look.

Layouts are created with widgets. They are mainly used for navigation or user experiences which need to be consistent
between pages.

## Building

### Prerequisite

Run `npm install` in the root of `mendix/widgets-resources` to install the dependencies.

### Production

Run `npm run build` to build and output assets to `dist/theme`.

### Development

Configure the environment variable `ATLAS_MX_PROJECT_PATH` with an absolute path to a Mendix project directory.

-   Run `npm run start` to build with watch mode active, re-building assets when you make changes and copy over the configured Mendix project's `theme` directory as well as the `deployment` in the correct structure.
-   Run `npm run build` to run one time build the assets and copy over the configured Mendix project's `theme` directory as well as the `deployment` in the correct structure.
-   Run `npm run release` to create one time production ready assets which will be placed at `dist` directory.
