import { createElement } from "react";
import { render, mount } from "enzyme";
import { Button as ButtonConpemnet, ButtonWebProps } from "../Button";
import { ConfirmTypeEnum, ConfirmokTypeEnum } from "../../../typings/ButtonWebProps";

interface popConfirmButtonProps {
    openconfirm: boolean;
    confirmType?: ConfirmTypeEnum;
    confirmtitle?: string;
    confirmokText?: string;
    confirmcancelText?: string;
    confirmokType?: ConfirmokTypeEnum;
    onConfirm?: () => void;
    onCancel?: () => void;
}
describe("ButtonWeb", () => {
    let defaultButtonProps: ButtonWebProps;
    let popConfirmButtonProps: popConfirmButtonProps;

    beforeEach(() => {
        defaultButtonProps = {
            onClick: undefined,
            type: "default",
            openconfirm: false,
            children: "Button",
            icon: { type: "glyph", iconClass: "icon-class" }
        };

        popConfirmButtonProps = {
            openconfirm: true,
            confirmType: "pop",
            confirmtitle: "Are you sure to delete this task?",
            confirmokText: "Yes",
            confirmcancelText: "No",
            confirmokType: "primary",
            onConfirm: jest.fn(),
            onCancel: jest.fn()
        };
    });

    it("renders default buttons", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} />);
        expect(buttonWrapper).toMatchSnapshot();
    });

    it("Set the type of button", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} type="primary" />);
        expect(buttonWrapper).toMatchSnapshot();
    });
    it("Set the size of button", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} size="middle" />);
        expect(buttonWrapper).toMatchSnapshot();
    });
    it("Disabled state of button", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} disabled />);
        expect(buttonWrapper).toMatchSnapshot();
    });
    it("Set the loading status of button", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} loading />);
        expect(buttonWrapper).toMatchSnapshot();
    });
    it("Make background transparent and invert text and border colors", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} ghost />);
        expect(buttonWrapper).toMatchSnapshot();
    });
    it("Set the danger status of button", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} danger />);
        expect(buttonWrapper).toMatchSnapshot();
    });

    it("Option to fit button width to its parent width", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} block />);
        expect(buttonWrapper).toMatchSnapshot();
    });

    it("Redirect url of link button", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} type="link" href="#" />);
        expect(buttonWrapper).toMatchSnapshot();
    });
    it("Can be set button shape", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} shape="circle" />);
        expect(buttonWrapper).toMatchSnapshot();
    });

    it("compact dialog used for asking for user confirmation", () => {
        const buttonWrapper = render(<ButtonConpemnet {...defaultButtonProps} {...popConfirmButtonProps} />);
        expect(buttonWrapper).toMatchSnapshot();
    });
    it("modal dialog used for asking for user confirmation", () => {
        const buttonWrapper = render(
            <ButtonConpemnet {...defaultButtonProps} {...popConfirmButtonProps} confirmType="modal" />
        );
        expect(buttonWrapper).toMatchSnapshot();
    });

    it("triggers onClick function with a click event", () => {
        const onClick = jest.fn();
        const buttonWrapper = mount(<ButtonConpemnet {...defaultButtonProps} onClick={onClick} />);
        const button = buttonWrapper.find("button");
        button.simulate("click");
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
