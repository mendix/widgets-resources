import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";
import { BasicItemsType, CustomItemsType, PopupMenuContainerProps } from "../../typings/PopupMenuProps";
import { PopupMenu } from "../components/PopupMenu";
import { actionValue, dynamicValue } from "@mendix/piw-utils-internal";

jest.useFakeTimers();

describe("Popup menu", () => {
    const createPopupMenu = (props: PopupMenuContainerProps): ShallowWrapper<PopupMenuContainerProps, {}> =>
        shallow(createElement(PopupMenu, props));
    const basicItemProps: BasicItemsType = {
        itemType: "item",
        caption: dynamicValue("Caption"),
        styleClass: "defaultStyle"
    };
    const customItemProps: CustomItemsType = { content: createElement("div", null, null) };

    const defaultProps: PopupMenuContainerProps = {
        name: "popup-menu",
        class: "mx-popup-menu",
        tabIndex: -1,
        trigger: "onclick",
        menuToggle: false,
        menuTrigger: createElement("button", null, "Trigger"),
        advancedMode: false,
        position: "bottom",
        basicItems: [
            basicItemProps,
            { itemType: "divider", caption: dynamicValue("Caption"), styleClass: "defaultStyle" }
        ],
        customItems: [customItemProps]
    };

    it("renders popup menu", () => {
        const popupMenu = createPopupMenu(defaultProps);

        expect(popupMenu).toMatchSnapshot();
    });

    describe("with basic items", () => {
        it("renders", () => {
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item")).toHaveLength(1);
        });

        it("triggers action", () => {
            basicItemProps.action = actionValue();
            const popupMenu = createPopupMenu(defaultProps);
            const event: any = { target: {} };
            popupMenu.find(".popupmenu-basic-item").prop("onClick")!(event);

            expect(basicItemProps.action.execute).toHaveBeenCalledTimes(1);
        });

        it("renders with style Inverse", () => {
            basicItemProps.styleClass = "inverseStyle";
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item-inverse")).toHaveLength(1);
        });
        it("renders with style Primary", () => {
            basicItemProps.styleClass = "primaryStyle";
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item-primary")).toHaveLength(1);
        });
        it("renders with style Info", () => {
            basicItemProps.styleClass = "infoStyle";
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item-info")).toHaveLength(1);
        });
        it("renders with style Success", () => {
            basicItemProps.styleClass = "successStyle";
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item-success")).toHaveLength(1);
        });
        it("renders with style Warning", () => {
            basicItemProps.styleClass = "warningStyle";
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item-warning")).toHaveLength(1);
        });
        it("renders with style Danger", () => {
            basicItemProps.styleClass = "dangerStyle";
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item-danger")).toHaveLength(1);
        });
    });

    describe("with custom items", () => {
        beforeEach(() => {
            defaultProps.advancedMode = true;
        });

        it("renders", () => {
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-custom-item")).toHaveLength(1);
        });

        it("triggers action", () => {
            const action = (customItemProps.action = actionValue());
            const popupMenu = createPopupMenu(defaultProps);
            const event: any = { target: {} };
            popupMenu.find(".popupmenu-custom-item").prop("onClick")!(event);

            expect(action.execute).toHaveBeenCalledTimes(1);
        });
    });
});
