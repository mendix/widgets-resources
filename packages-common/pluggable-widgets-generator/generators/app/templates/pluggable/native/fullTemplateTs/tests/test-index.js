import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-native", () => ({
    Platform: { OS: "android", select: jest.fn(dict => dict.android) },
    StyleSheet: jest.requireActual("StyleSheet"),
    Text: jest.requireActual("Text"),
    TouchableNativeFeedback: jest.requireActual("TouchableNativeFeedback"),
    TouchableOpacity: jest.requireActual("TouchableOpacity"),
    View: jest.requireActual("View")
}));
