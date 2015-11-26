# Mendix UI Framework
This is the library for the Mendix UI Framework to quickly create a beautiful app with Mendix. This library acts as a submodule for the default Mendix themes that can be found [here](https://ux.mendix.com/).

### Theme folder structure
The theme folder consists of the default HTML pages, Sass, CSS and resources needed to style your application.

#### Styles / Sass
In the Sass folder you will notice two main folders, custom and library. The library folder houses the complete Mendix UI Framework and the custom folder is a duplication of the library folder. We advice to do *all customization* in the custom folder.

##### Library Folder
We created a framework so our users have a clear understanding what Mendix is capable of. The library folder structure is as follows:

- Base
- Building Blocks
- Components
- Layouts
- Mobile

###### Base
The base folder holds the *architecture* for our framework. Here we have our *mixins*, *variables* and *resets*. The variables is what makes our framework, which holds all global variables for the project (for typography, color schemes, and so on).

###### Components
This directory contains all kind of basic components like a datagrid, buttons, label, form, listview, or anything along those lines. They have distinct properties and can't be broken down further without losing their meaning.

###### Building Blocks
Building blocks are combined components/widgets. For example *cards* or *headers* are building blocks. A building block could be an image, title and a button built together.

###### Layouts
The layout directory contains some styles for the main sections of the layout (topbar, sidebar, footer and so on).

###### Mobile
The mobile directory include specific styling for your tablet or phone pages and widgets. This is useful to target only mobile use cases.

### Useful links
- [Live theme demo](https://ux.mendix.com/)
- [Mendix UI Framework Website](https://ux.mendix.com/)
- [Blog article about Mendix UI Framework](https://www.mendix.com/blog/the-eye-catching-mendix-ui-framework/)
- [Create a custom theme with the Mendix UI Framework](https://world.mendix.com/display/howto50/Create+a+custom+theme+with+the+Mendix+UI+Framework)

### License

MIT