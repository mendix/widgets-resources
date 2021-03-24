import { createElement, Fragment, ReactElement } from "react";
import { BottomSheetStyle } from "./ui/Styles";
import { CustomModalSheet } from "./components/CustomModalSheet";
import { ExpandingDrawer } from "./components/ExpandingDrawer";
import { NativeBottomSheet } from "./components/NativeBottomSheet";
import { BottomSheetProps } from "../typings/BottomSheetProps";
import { StyleSheet } from "react-native";
import { executeAction } from "@mendix/piw-utils-internal";

export function BottomSheet(props: BottomSheetProps<BottomSheetStyle>): ReactElement {
    const styles = StyleSheet.flatten(props.style);

    if (props.type === "modal" && props.modalRendering === "custom") {
        return (
            <CustomModalSheet triggerAttribute={props.triggerAttribute} content={props.largeContent} styles={styles} />
        );
    }
    if (props.type === "modal" && props.modalRendering === "basic") {
        return (
            <NativeBottomSheet
                name={props.name}
                itemsBasic={props.itemsBasic}
                triggerAttribute={props.triggerAttribute}
                useNative={props.nativeImplementation}
                styles={styles}
            />
        );
    }
    if (props.type === "expanding") {
        return (
            <ExpandingDrawer
                smallContent={props.smallContent}
                largeContent={props.largeContent}
                fullscreenContent={props.showFullscreenContent ? props.fullscreenContent : null}
                onOpen={() => executeAction(props.onOpen)}
                onClose={() => executeAction(props.onClose)}
                styles={styles}
            />
        );
    }
    return <Fragment />;
}
