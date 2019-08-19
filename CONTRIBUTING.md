# Contributing

## Prerequisites

-   [Node.js](https://nodejs.org) version 10.3.0 or later

## Getting started

1. Clone this repository

```sh
$ git clone git@github.com:mendix/widgets-resources.git
$ cd widgets-resources
```

2. Install and link dependencies

```sh
$ npm install
```

3. Add a test project (optional)

Use Mendix Studio Pro to create a test project in `packages/test-project/mxproject`. The packages in this repository
will copy their bundles to the test project during their build process.

1. Go make it!

Open the folder of the package you want to change and use `npm run build` to bundle it, or `npm start` for watch mode.
