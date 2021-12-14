# Mendix Atlas UI

Mendix Atlas UI is the foundation of making beautiful apps with Mendix. For more information about the framework visit the [website](https://atlas.mendix.com/).

## Structure

```
├── scripts
│   └── lib
└── src
    ├── theme
    │   ├── native
    │   │   ├── custom-variables.ts
    │   │   ├── exclusion-variables.ts
    │   │   └── main.ts
    │   │
    │   └── web
    │       ├── custom-variables.scss
    │       ├── exclusion-variables.scss
    │       ├── login-with-mendixsso-automatically.html
    │       ├── login-with-mendixsso-button.html
    │       ├── login.html
    │       ├── logo.png
    │       ├── main.scss
    │       ├── manifest-overrides.webmanifest
    │       ├── robots.txt
    │       └── settings.json
    │
    └── themesource
        ├── atlas_core
        │   ├── native
        │   │   ├── core
        │   │   │   ├── base
        │   │   │   │   └── *.ts
        │   │   │   ├── helpers
        │   │   │   │   ├── _functions
        │   │   │   │   │   └── *.ts
        │   │   │   │   └── *.ts
        │   │   │   ├── widgets
        │   │   │   │   └── *.ts
        │   │   │   └── manifest.json
        │   │   ├── layouts
        │   │   │   └── *.ts
        │   │   ├── types
        │   │   │   └── *.ts
        │   │   ├── api.ts
        │   │   ├── design-properties.json
        │   │   ├── main.ts
        │   │   └── variables.ts
        │   │
        │   ├── public
        │   │   └── resources
        │   │
        │   └── web
        │       ├── core
        │       │   ├── _legacy
        │       │   │   ├── bootstrap
        │       │   │   │   └── *.scss 
        │       │   │   └── _mxui.scss
        │       │   ├── base
        │       │   │   ├── mixins
        │       │   │   │   └── *.scss
        │       │   │   └── *.scss
        │       │   ├── helpers
        │       │   │   └── *.scss
        │       │   ├── widgets
        │       │   │   └── *.scss
        │       │   ├── widgetscustom
        │       │   │   └── *.scss
        │       │   ├── manifest.json
        │       ├── layouts
        │       │   └── *.scss
        │       ├── _exclusion-variables.scss
        │       ├── _variables.scss
        │       ├── design-properties.json
        │       └── main.scss
        │ 
        ├── atlas_nativemobile_content
        │   └── native
        │       ├── buildingblocks 
        │       │   └── *.ts
        │       ├── pagetemplates 
        │       │   └── *.ts 
        │       └── main.ts 
        │
        └── atlas_web_content
            └── web
                ├── buildingblocks 
                │   └── *.scss
                ├── pagetemplates 
                │   └── *.scss 
                └── main.scss 
```

## Overview

Atlas targets two environments, web and native. The file structure is similar between the two environments.
Atlas 3.x.x is split up in three modules; `Atlas_Core`, `Atlas_NativeMobile_Content` and `Atlas_Web_Content`.
`Atlas_Core` is the heart of Atlas UI. This folder includes base styling, widget styling & additional helper classes.

Extra platform-specific styles can be found in the other 2 modules. These 2 modules contain building blocks, page templates and related styles.
Building blocks are created with Widgets. For example cards or headers are building blocks. A building block could be an image, a title, and a button, assembled together into one UI block.
Page Templates are created with Building Blocks and Widgets. Page Templates are an example of how a page could look.

In a Mendix project the styles from these modules can be found in the `themesource` folder. 

### `theme` directory

The `theme` directory contains all custom styling for the web and native mobile platforms. We recommend users to only use this directory for custom styling.
Users are also able to exclude styles from the `Atlas_Core` module in this folder. This can be done by editing the `exclusion-variables` file for web or native mobile.

## Building

### Prerequisite

Run `npm install` in the root of this repository (`mendix/widgets-resources`) to install the dependencies.

### Production

Run `npm run build` in this folder (`widget-resources/packages/theming/atlas`) to build and output assets to `dist/theme` &  `dist/themesource`.

### Development

Configure the environment variable `ATLAS_MX_PROJECT_PATH` with an absolute path to a Mendix project directory.

-   Run `npm run start` to build with watch mode active, re-building assets when you make changes and copy those changes to the configured Mendix project's `theme`, `themesource` and `deployment` directory.
-   Run `npm run build` to run one time build the assets and copy those changes to the configured Mendix project's `theme`, `themesource` and `deployment` directory.
-   Run `npm run release` to create one time production ready assets which will be placed at `dist` directory.
