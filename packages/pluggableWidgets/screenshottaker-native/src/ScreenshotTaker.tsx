import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { createElement, ReactElement, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { captureScreen, captureRef, CaptureOptions } from "react-native-view-shot";

import { executeAction } from "@widgets-resources/piw-utils";

import { ScreenshotTakerProps } from "../typings/ScreenshotTakerProps";
import { defaultScreenshotTakerStyles, ScreenshotTakerStyle } from "./ui/Styles";

declare type CustomGlobal = NodeJS.Global &
    typeof globalThis & {
        screenshotRunner: {
            masterIsRunning: boolean;
            task: {
                name: string;
                isRunning: boolean;
                readyToTakeScreenshot: boolean;
                error: boolean;
                onError: (e: Error, name: string) => any;
            };
        };
    };

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function ScreenshotTaker(props: ScreenshotTakerProps<ScreenshotTakerStyle>): ReactElement | null {
    const captureContent = props.whatToCapture === "captureContent";
    const viewRef = useRef(null);
    const shouldTakeScreenshotRef = useRef(false);
    const [shouldTakeScreenshot, setShouldTakeScreenshot] = useState(false);
    const styles = flattenStyles(defaultScreenshotTakerStyles, props.style);
    const g = global as CustomGlobal;
    console.warn(props.pageName.value);

    // Runs on Unmount
    useEffect(() => {
        return () => {
            if (g.screenshotRunner?.task) {
                (global as CustomGlobal).screenshotRunner.task.isRunning = false;
            }
        };
    }, []);

    // Runs on dependency change
    useEffect(() => {
        console.warn("shouldTakeScreenshotRef");
        if (
            (global as CustomGlobal).screenshotRunner?.task?.isRunning &&
            !shouldTakeScreenshotRef.current &&
            !shouldTakeScreenshot
        ) {
            shouldTakeScreenshotRef.current = true;
            setShouldTakeScreenshot(true);
        }
    }, [shouldTakeScreenshotRef.current, setShouldTakeScreenshot]);

    useEffect(() => {
        console.warn("shouldTakeScreenshot");
        if (shouldTakeScreenshot) {
            // setShouldTakeScreenshot(false);
            (async () => {
                console.warn("shouldTakeScreenshot yes");
                const options: CaptureOptions = {
                    result: "base64",
                    quality: 1
                };

                if (props.beforeScreenshot) {
                    executeAction(props.beforeScreenshot);
                    await timeout(3000); // Wait for action to complete
                }

                await timeout(1000); // Wait for data to load
                if (captureContent) {
                    console.warn("captureContent");
                    captureRef(viewRef, options).then(onCapture).catch(onCaptureFailure);
                } else {
                    console.warn("captureScreen");
                    captureScreen(options).then(onCapture).catch(onCaptureFailure);
                }
            })();
        }
    }, [shouldTakeScreenshot]);

    const onCapture = (base64: string) => {
        if (base64.length <= 0) {
            console.error(`Screenshot [${g.screenshotRunner.task.name}] failed. Base64 string is empty.`);
        }
        const formattedBase64 = base64.replace(/\s/g, "").trim();
        console.warn("base64: " + formattedBase64);
        console.warn("name: " + g.screenshotRunner.task.name);
        debugger;
        props.pageName.setValue(g.screenshotRunner.task.name);
        props.base64.setValue(formattedBase64);
        console.warn("saved name: " + props.pageName.value);
        console.warn("saved base64: " + props.base64.value);
        console.warn(props.onScreenshot);
        console.warn(`can exe ${props.onScreenshot?.canExecute}`);
        // props.onScreenshot?.execute();
        // executeAction(props.onScreenshot);
    };

    const onCaptureFailure = (e: Error) => {
        (global as CustomGlobal).screenshotRunner.task.isRunning = false;
        (global as CustomGlobal).screenshotRunner.task.error = true;
        g.screenshotRunner.task.onError(e, g.screenshotRunner.task.name);
        executeAction(props.onError);
    };

    return (
        <View ref={viewRef} style={styles.container}>
            {props.content as ReactElement}
        </View>
    );
}
