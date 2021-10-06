const Enzyme = require("enzyme");
const Adapter = require("@wojtekmaj/enzyme-adapter-react-17");
const enableHooks = require("jest-react-hooks-shallow").default;

Enzyme.configure({ adapter: new Adapter() });
enableHooks(jest);

const origConsole = console.error;
const BLOCKED_ERROR_TAGS = [
    "prop on a DOM element",
    "is using incorrect casing",
    "Unknown event handler property",
    "for a non-boolean attribute",
    "start its name with an uppercase letter"
];

beforeEach(() => {
    console.error = e => {
        if (!BLOCKED_ERROR_TAGS.some(tag => e.includes(tag))) {
            console.warn(e);
        }
    };
});

afterEach(() => {
    console.error = origConsole;
});
