require("./matchers");
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });
// console.log("testPath", testPath);

const testsContext = require.context("testSourcePath", true, /\.spec$/);
testsContext.keys().forEach(testsContext);
