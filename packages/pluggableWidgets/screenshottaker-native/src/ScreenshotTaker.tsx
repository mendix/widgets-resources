import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { createElement, ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { ValueStatus } from "mendix";
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
        if (
            shouldTakeScreenshot &&
            props.pageName.status === ValueStatus.Available &&
            props.base64.status === ValueStatus.Available &&
            props.onScreenshot?.canExecute
        ) {
            setShouldTakeScreenshot(false);
            (async () => {
                const options: CaptureOptions = {
                    result: "base64",
                    quality: 1
                };

                if (props.beforeScreenshot?.canExecute) {
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
    }, [shouldTakeScreenshot, props.beforeScreenshot, props.pageName, props.base64, props.onScreenshot]);

    const onCapture = useCallback(
        async (base64: string) => {
            if (base64.length <= 0) {
                console.error(`Screenshot [${g.screenshotRunner.task.name}] failed. Base64 string is empty.`);
            }
            const formattedBase64 = base64.replace(/\s/g, "").trim();
            props.pageName.setValue(g.screenshotRunner.task.name);
            props.base64.setValue(formattedBase64);
            executeAction(props.onScreenshot);
        },
        [props.pageName, props.base64, props.onScreenshot]
    );

    function onCaptureFailure(e: Error) {
        (global as CustomGlobal).screenshotRunner.task.isRunning = false;
        (global as CustomGlobal).screenshotRunner.task.error = true;
        g.screenshotRunner.task.onError(e, g.screenshotRunner.task.name);
        executeAction(props.onError);
    }

    return (
        <View ref={viewRef} style={styles.container}>
            {props.content && captureContent ? props.content : captureContent ? <Text style={{ fontSize: 32, fontWeight: "bold" }}>NO CONTENT LOADED</Text> : null}
        </View>
    );
}
