import { createElement } from "react";
import { shallow } from "enzyme";
import { Gallery } from "../Gallery";

describe("Gallery", () => {
    it("renders correctly", () => {
        const gallery = shallow(
            <Gallery
                items={["item1"]}
                itemRenderer={(wrapper, item) => wrapper(item)}
                tabletItems={3}
                desktopItems={4}
                phoneItems={2}
            />
        );

        expect(gallery).toMatchSnapshot();
    });
});
