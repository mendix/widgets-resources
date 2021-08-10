import { render, mount } from "enzyme";
import { createElement } from "react";
import { InfiniteBody } from "../InfiniteBody";

describe("Infinite Body", () => {
    it("renders the structure correctly", () => {
        const component = render(<InfiniteBody isInfinite setPage={jest.fn()} hasMoreItems />);

        expect(component).toMatchSnapshot();
    });

    it("triggers correct events on scroll", () => {
        const setPage = jest.fn();
        const component = mount(<InfiniteBody isInfinite setPage={setPage} hasMoreItems style={{ maxHeight: 50 }} />);

        component.find(".infinite-loading").simulate("scroll", {
            target: {
                scrollHeight: 200,
                scrollTop: 100,
                clientHeight: 100
            }
        });

        expect(setPage).toBeCalled();
    });
});
