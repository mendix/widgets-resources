import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { createElement, ReactElement, useEffect, useState } from "react";
import { View } from "react-native";
import ViewShot from "react-native-view-shot";

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

export function ScreenshotTaker(props: ScreenshotTakerProps<ScreenshotTakerStyle>): ReactElement {
    const [shouldTakeScreenshot, setShouldTakeScreenshot] = useState(false)
    const styles = flattenStyles(defaultScreenshotTakerStyles, props.style);
    const g = global as CustomGlobal;


    useEffect(() => {
        if (
            !shouldTakeScreenshot &&
            (global as CustomGlobal).screenshotRunner?.task?.isRunning &&
            props.beforeScreenshot
        ) {
            (async () => {
                executeAction(props.beforeScreenshot);
                await timeout(3000);
                setShouldTakeScreenshot(true);
            })();
        } else if (!props.beforeScreenshot) {
            setShouldTakeScreenshot(true);
        }
        return () => {
            (global as CustomGlobal).screenshotRunner.task.isRunning = false;
            setShouldTakeScreenshot(false);
        };
    }, [setShouldTakeScreenshot]);

    return (global as CustomGlobal).screenshotRunner?.task?.isRunning && shouldTakeScreenshot ? (
        <ViewShot
            style={styles.container}
            options={{
                result: "base64"
            }}
            captureMode="mount"
            onCapture={async (base64: string) => {
                const formattedBase64 = base64.replace(/\s/g, "");
                props.pageName.setValue(g.screenshotRunner.task.name);
                props.base64.setValue(formattedBase64);
                executeAction(props.onScreenshot);
            }}
            onCaptureFailure={e => {
                (global as CustomGlobal).screenshotRunner.task.isRunning = false;
                (global as CustomGlobal).screenshotRunner.task.error = true;
                g.screenshotRunner.task.onError(e, g.screenshotRunner.task.name);
                executeAction(props.onError);
            }}
        >
            {props.content}
        </ViewShot>
    ) : (
        <View style={styles.container}>{props.content as ReactElement}</View>
    );
}
