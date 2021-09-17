import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import { AccordionContainerProps } from "../../../typings/AccordionProps";
import { IconProps } from "../../components/Icon";
import { useIconGenerator } from "../iconGenerator";
import { ReactElement } from "react";

interface HookProps {
    animateIcon: AccordionContainerProps["animateIcon"];
    icon: Omit<IconProps, "animate">;
    expandIcon: Omit<IconProps, "animate">;
    collapseIcon: Omit<IconProps, "animate">;
}

describe("useIconGenerator", () => {
    const defaultHookProps: HookProps = {
        animateIcon: true,
        icon: { data: { type: "glyph", iconClass: "icon-class" }, loading: false },
        expandIcon: { data: { type: "glyph", iconClass: "expand-icon-class" }, loading: false },
        collapseIcon: { data: { type: "glyph", iconClass: "collapse-icon-class" }, loading: false }
    };

    const initUseIconGenerator = (
        initialProps = defaultHookProps
    ): RenderHookResult<HookProps, (collapsed: boolean) => ReactElement> =>
        renderHook(
            (props: {
                animateIcon: AccordionContainerProps["animateIcon"];
                icon: Omit<IconProps, "animate">;
                expandIcon: Omit<IconProps, "animate">;
                collapseIcon: Omit<IconProps, "animate">;
            }) => useIconGenerator(props.animateIcon, props.icon, props.expandIcon, props.collapseIcon),
            {
                initialProps
            }
        );

    it("returns the same function when the arguments are the same", () => {
        const renderedHook = initUseIconGenerator();
        const firstFunction = renderedHook.result.current;

        renderedHook.rerender();
        expect(renderedHook.result.current).toBe(firstFunction);
    });
    it("returns a new function when the arguments have changed", () => {
        const renderedHook = initUseIconGenerator();
        const firstFunction = renderedHook.result.current;

        renderedHook.rerender({ ...defaultHookProps, animateIcon: false });
        expect(renderedHook.result.current).not.toBe(firstFunction);
    });

    describe("returned function", () => {
        it("returns the icon when icon is animated", () => {
            const renderedHook = initUseIconGenerator({ ...defaultHookProps });
            expect(renderedHook.result.current(true)).toMatchSnapshot();
        });

        describe("without icon animated", () => {
            it("returns the expand icon when collapsed", () => {
                const renderedHook = initUseIconGenerator({
                    ...defaultHookProps,
                    animateIcon: false
                });
                expect(renderedHook.result.current(true)).toMatchSnapshot();
            });
            it("returns the collapse icon when expanded", () => {
                const renderedHook = initUseIconGenerator({
                    ...defaultHookProps,
                    animateIcon: false
                });
                expect(renderedHook.result.current(false)).toMatchSnapshot();
            });
        });
    });
});
