import { shallow, ShallowWrapper } from "enzyme";
import { createElement } from "react";
import { actionValue } from "../../../../tools/util-widgets/dist";
import { BasicItemsType, CustomItemsType, PopupMenuContainerProps } from "../../typings/PopupMenuProps";
import PopupMenu from "../PopupMenu";

jest.useFakeTimers();

describe("Popup menu", () => {
    const createPopupMenu = (props: PopupMenuContainerProps): ShallowWrapper<PopupMenuContainerProps, any> =>
        shallow(createElement(PopupMenu, props));
    const basicItemProps: BasicItemsType = { itemType: "item", caption: "Caption", styleClass: "defaultStyle" };
    const customItemProps: CustomItemsType = { content: createElement("div", null, null) };

    const defaultProps: PopupMenuContainerProps = {
        name: "popup-menu",
        class: "mx-popup-menu",
        tabIndex: -1,
        trigger: "onclick",
        menuTrigger: createElement("button", null, "Trigger"),
        renderMode: "basic",
        position: "bottom",
        basicItems: [basicItemProps, { itemType: "divider", caption: "Caption", styleClass: "defaultStyle" }],
        customItems: [customItemProps]
    };

    it("renders popup menu", () => {
        const popupMenu = createPopupMenu(defaultProps);

        expect(popupMenu).toMatchSnapshot();
    });

    describe("with basic items", () => {
        it("renders", () => {
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item").length).toEqual(1);
        });

        it("triggers action", () => {
            basicItemProps.action = actionValue();
            const popupMenu = createPopupMenu(defaultProps);
            const event: any = { target: {} };
            popupMenu.find(".popupmenu-basic-item").prop("onClick")!(event);

            expect(basicItemProps.action.execute).toHaveBeenCalledTimes(1);
        });

        it("renders with style Primary", () => {
            basicItemProps.styleClass = "primaryStyle";
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item-primary").length).toEqual(1);
        });
        it("renders with style Danger", () => {
            basicItemProps.styleClass = "dangerStyle";
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item-danger").length).toEqual(1);
        });
        it("renders with style Custom", () => {
            basicItemProps.styleClass = "customStyle";
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-basic-item-custom").length).toEqual(1);
        });
    });

    describe("with custom items", () => {
        beforeEach(() => {
            defaultProps.renderMode = "custom";
        });

        it("renders", () => {
            const popupMenu = createPopupMenu(defaultProps);

            expect(popupMenu.find(".popupmenu-custom-item").length).toEqual(1);
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
