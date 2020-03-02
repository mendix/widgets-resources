import { createElement, ReactNode, Fragment } from "react";
import { BottomDrawerProps } from "../typings/BottomDrawerProps";
import { BottomDrawerStyle, defaultBottomDrawerStyle } from "./ui/Styles";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { CustomModalSheet } from "./components/CustomModalSheet";
import { ExpandingDrawer } from "./components/ExpandingDrawer";
import { NativeBottomSheet } from "./components/NativeBottomSheet";

export function BottomDrawer(props: BottomDrawerProps<BottomDrawerStyle>): ReactNode {
    const styles = flattenStyles(defaultBottomDrawerStyle, props.style);

    if (props.type === "modal" && props.modalRendering === "custom") {
        console.warn("Custom modal");
        return (
            <CustomModalSheet triggerAttribute={props.triggerAttribute} content={props.largeContent} styles={styles} />
        );
    }
    if (props.type === "modal" && props.modalRendering === "basic") {
        console.warn("Basic modal");
        return <NativeBottomSheet />;
    }
    if (props.type === "expanding") {
        console.warn("Expanding");
        return (
            <ExpandingDrawer
                smallContent={props.smallContent}
                largeContent={props.largeContent}
                fullscreenContent={props.showFullscreenContent ? props.fullscreenContent : null}
                styles={styles}
                onOpen={props.onOpen}
                onClose={props.onClose}
            />
        );
    }
    return <Fragment />;
}
