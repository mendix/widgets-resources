# Mendix Atlas UI
This is the library for Mendix Atlas UI to quickly create a beautiful app with Mendix. This library acts as a submodule for the default Atlas UI starter apps that can be found [here](https://atlas.mendix.com/).

### Theme folder structure
The theme folder consists of the default HTML pages, Sass, CSS and resources needed to style your application.

#### Styles / Sass
In the Sass folder you will notice two main folders, custom and library. The library folder houses the complete Mendix UI Framework and the custom folder is a duplication of the library folder. We advice to do *all customization* in the custom folder.

##### Library Folder
We created a framework so our users have a clear understanding what Mendix is capable of. The library folder structure is as follows:

- Base
- Building Blocks
- Components
- Custom Widgets
- Layouts
- Mobile

###### Base
The base folder holds the *architecture* for our framework. Here we have our *mixins*, *variables* and *resets*. The variables is what makes our framework, which holds all global variables for the project (for typography, color schemes, and so on).

###### Components
This directory contains all kind of basic components like a datagrid, buttons, label, form, listview, or anything along those lines. They have distinct properties and can't be broken down further without losing their meaning.

###### Custom Widgets
This directory contain custom widgets that are included from the Mendix App Store.

###### Building Blocks
Building blocks are combined components/widgets. For example *cards* or *headers* are building blocks. A building block could be an image, title and a button built together.

###### Layouts
The layout directory contains some styles for the main sections of the layout (topbar, sidebar, footer and so on).

###### Mobile
The mobile directory include specific styling for your tablet or phone pages and widgets. This is useful to target only mobile use cases.

### License

MIT
