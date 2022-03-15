import { createElement } from "react";
import { shallow } from "enzyme";
import { DocumentViewer } from "../DocumentViewer";

describe("DocumentViewer", () => {
    it("renders correctly the structure", () => {
        const viewer = shallow(<DocumentViewer src="http://localhost/sample.pdf" />);
        expect(viewer).toMatchSnapshot();
    });
});
