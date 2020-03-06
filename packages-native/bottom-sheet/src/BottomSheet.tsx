import { createElement, ReactNode, Fragment } from "react";
import { BottomDrawerStyle, defaultBottomDrawerStyle } from "./ui/Styles";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { CustomModalSheet } from "./components/CustomModalSheet";
import { ExpandingDrawer } from "./components/ExpandingDrawer";
import { NativeBottomSheet } from "./components/NativeBottomSheet";
import { BottomSheetProps } from "../typings/BottomSheetProps";

export function BottomSheet(props: BottomSheetProps<BottomDrawerStyle>): ReactNode {
    const styles = flattenStyles(defaultBottomDrawerStyle, props.style);

    if (props.type === "modal" && props.modalRendering === "custom") {
        return (
            <CustomModalSheet triggerAttribute={props.triggerAttribute} content={props.largeContent} styles={styles} />
        );
    }
    if (props.type === "modal" && props.modalRendering === "basic") {
        return (
            <NativeBottomSheet
                itemsBasic={props.itemsBasic}
                triggerAttribute={props.triggerAttribute}
                useNative={props.nativeImplementation}
            />
        );
    }
    if (props.type === "expanding") {
        return (
            <ExpandingDrawer
                smallContent={props.smallContent}
                largeContent={props.largeContent}
                fullscreenContent={props.showFullscreenContent ? props.fullscreenContent : null}
                styles={styles}
            />
        );
    }
    return <Fragment />;
}
