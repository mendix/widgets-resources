const Enzyme = require("enzyme");
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");
const enableHooks = require("jest-react-hooks-shallow").default;

Enzyme.configure({ adapter: new Adapter() });
enableHooks(jest);
