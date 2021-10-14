import { createElement } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Tooltip, TooltipProps } from "../Tooltip";

describe("Tooltip", () => {
    let defaultTooltipProps: TooltipProps;

    beforeEach(() => {
        defaultTooltipProps = {
            content: undefined,
            tooltipString: "Tooltip text",
            position: "right",
            openOn: "click",
            trigger: "",
            render: "text",
            name: "tooltip"
        };
    });

    it("should render", () => {
        const { asFragment } = render(<Tooltip {...defaultTooltipProps} />);
        const triggerElement = screen.getByTestId("trigger");
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(asFragment()).toMatchSnapshot();
    });
    it("should render and open tooltip onMouseEnter and close onMouseLeave", () => {
        render(<Tooltip {...defaultTooltipProps} openOn={"hover"} />);
        const triggerElement = screen.getByTestId("trigger");
        act(() => {
            fireEvent.mouseEnter(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.mouseLeave(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();

        act(() => {
            fireEvent.focus(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("should render and open tooltip onClick", () => {
        render(<Tooltip {...defaultTooltipProps} openOn={"click"} />);
        const triggerElement = screen.getByTestId("trigger");
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("should render and open tooltip onFocus and close onBlur", () => {
        defaultTooltipProps.openOn = "hoverFocus";
        render(<Tooltip {...defaultTooltipProps} />);
        const triggerElement = screen.getByTestId("trigger");
        act(() => {
            fireEvent.focus(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.blur(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();

        act(() => {
            fireEvent.mouseEnter(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.mouseLeave(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
    });

    it("should render text content if the tooltipString is passed", () => {
        const { asFragment } = render(<Tooltip {...defaultTooltipProps} render={"text"} />);
        act(() => {
            fireEvent.click(screen.getByTestId("trigger"));
        });
        expect(screen.queryByRole("tooltip")).toHaveTextContent(defaultTooltipProps.tooltipString as string);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should render HTML if the content is passed", () => {
        act(() => {
            render(
                <Tooltip
                    {...defaultTooltipProps}
                    render={"custom"}
                    content={<div data-testid={"content"}>Simple Tooltip</div>}
                    tooltipString={undefined}
                />
            );
        });
        act(() => {
            fireEvent.click(screen.getByTestId("trigger"));
        });
        expect(screen.queryByTestId("content")).toBeInTheDocument();
        expect(screen.queryByTestId("content")).toHaveTextContent("Simple Tooltip");
    });

    it("should close onOutsideClick if tooltip is visible", () => {
        render(<Tooltip {...defaultTooltipProps} openOn={"click"} />);
        const triggerElement = screen.getByTestId("trigger");
        act(() => {
            fireEvent.click(triggerElement);
        });
        expect(screen.queryByRole("tooltip")).toBeInTheDocument();

        act(() => {
            fireEvent.mouseDown(document);
        });
        expect(screen.queryByRole("tooltip")).toBeNull();
    });
});
