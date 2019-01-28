### Requirements

-   Node.js version 10.x or later
-   NPM version 6 or later

### Getting started

1. Clone this repository

```sh
$ git clone git@github.com:jobvs/native-components.git
$ cd native-components
```

2. Install dependencies

```sh
$ npm install
$ npx lerna exec npm install
```

3. Checkout the Mendix test project (Optional)

Use the Mendix modeler to checkout the NativeComponentsTestProject in `packages/test-project/mxproject`. The other
packages in this repository will copy their bundles to the test project during their build process.

4. Go make it!

Open the folder of the component you want to change and use `npm run build` to bundle it, or `npm start` for watch mode.
