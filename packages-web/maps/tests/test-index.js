require("./matchers");
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

var testsContext = require.context("../src", true, /\.spec$/);
testsContext.keys().forEach(testsContext);
