# Mendix Atlas UI
Mendix Atlas UI is the foundation of making beautiful apps with Mendix. For more information about the framework go [here](https://atlas.mendix.com/).

### Theme folder structure
The theme folder contains the default HTML pages, Sass, CSS and resources needed to style your application.

#### Workflow
In the Sass folder you will notice two main folders, custom and lib. The lib folder houses the complete Mendix UI Framework. The custom folder is where we recommend doing *all customizations*. This will making updating to the new framework easier.

##### Structure
Mendix is capable of creating beautiful and user-friendly UI. Our Atlas UI framework demonstrates some of its possibilities. Here you will find a basic overview of our framework.

```
theme/
├── styles/
|   ├── css/
|   │   ├── * all output files
|   └── sass/
|       ├── custom/
|       |   ├── _custom-variable.scss
|       |   ├── custom.scss
|       ├── lib/
|           ├── base/
|           ├── buildinblocks/
|           ├── components/
|           ├── customwidgets/
|           ├── layouts/
|           ├── _variable.scss
|           ├── lib.scss
|
├── * index files
├── * assets
```

###### Base
The base folder contains the *architecture* for our framework. Here you will find our *mixins* and *resets*.

###### Components
This directory contains the styling of all kinds of basic components like the datagrid, buttons, label, form, listview, and anything along those lines. They have distinct properties and can't be broken down further without losing their meaning.

###### Custom Widgets
This directory contains any extra styling that might be needed for custom widgets downloaded from the Mendix App Store.

###### Building Blocks
Building blocks are made up of components and widgets. For example *cards* or *headers* are building blocks. A building block could be an image, a title, and a button, assembled together into one UI block.

###### Layouts
The layout directory contains some styles for the main sections of the layout (topbar, sidebar, footer and so on).

###### Variable.scss
This file contains the style settings that are used across the project, allowing for consistent typography, color schemes, etc.

### License

MIT
