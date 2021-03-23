import { createElement, ReactElement, useState, Fragment, useEffect } from "react";
import { executeAction } from "@widgets-resources/piw-utils";
import {
    FlatList,
    Platform,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
    Text,
    ListRenderItemInfo,
    StyleProp
} from "react-native";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { ScreenshotRunnerProps, TasksType } from "../typings/ScreenshotRunnerProps";
import { defaultScreenshotRunnerStyles, ScreenshotRunnerStyle } from "./ui/Styles";

declare type ErrorType = {
    name: string;
    error: Error;
};
declare type CustomGlobal = NodeJS.Global &
    typeof globalThis & {
        screenshotRunner: {
            masterIsRunning: boolean;
            task?: {
                name: string;
                isRunning: boolean;
                error: boolean;
                onError: (e: Error, name: string) => any;
            };
        };
    };

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const TouchableButton: (props: StyleProp<any>) => ReactElement = ({ style, ...props }) =>
    Platform.OS === "android" ? (
        <View style={style}>
            <TouchableNativeFeedback {...props} />
        </View>
    ) : (
        <TouchableOpacity style={style} {...props} />
    );

export function ScreenshotRunner(props: ScreenshotRunnerProps<ScreenshotRunnerStyle>): ReactElement {
    const [tasksRunning, setTasksRunning] = useState<TasksType[]>([]);
    const [taskWithErrors, setTaskWithErrors] = useState<ErrorType[]>([]);
    const [areTasksTriggered, setAreTasksTriggered] = useState(false);
    const styles = flattenStyles(defaultScreenshotRunnerStyles, props.style);
    const tasksEnabledLength = props.tasks.filter(task => task.enabled).length;

    const onError = (e: Error, name: string) => {
        console.error(e);
        setTaskWithErrors(oldArray => [
            ...oldArray,
            {
                name,
                error: e
            }
        ]);
    };
    const enableGlobalScreenshotVariable = (name: string = "placeholder") => {
        (global as CustomGlobal).screenshotRunner = {
            masterIsRunning: true,
            task: {
                name,
                isRunning: true,
                error: false,
                onError: (e: Error) => {
                    onError(e, name);
                }
            }
        };
    };

    const runTask = async (task: TasksType) => {
        const maxTimeouts = 30;
        let timeoutCount = 0;

        setTasksRunning(oldArray => [...oldArray, task]);
        enableGlobalScreenshotVariable(task.name);
        executeAction(task.task);

        while ((global as CustomGlobal).screenshotRunner?.task?.isRunning && timeoutCount <= maxTimeouts) {
            console.info("Waiting for task to complete..");
            await timeout(1000);
            timeoutCount++;
        }
        const g = global as CustomGlobal;
        if (timeoutCount < maxTimeouts && !g.screenshotRunner?.task?.error) {
            console.info("Task Completed!");
        } else if (g.screenshotRunner?.task?.error) {
            console.error("Task Failed! Capturing screenshot triggered an error.");
        } else {
            console.error("Task Failed! Timeout has been reached.");
        }
    };

    useEffect(() => {
        if (areTasksTriggered) {
            (async () => {
                for await (const task of props.tasks) {
                    if ((global as CustomGlobal).screenshotRunner.masterIsRunning && task.enabled) {
                        await runTask(task);
                    }
                }
                setAreTasksTriggered(false);
                (global as CustomGlobal).screenshotRunner.masterIsRunning = false;
            })();
        }
    }, [areTasksTriggered]);

    const setAreTasksTriggeredToFalse = () => {
        (global as CustomGlobal).screenshotRunner.masterIsRunning = false;
        setTasksRunning([]);
        setAreTasksTriggered(false);
    };

    const setAreTasksTriggeredToTrue = async () => {
        console.warn("global " + !(global as CustomGlobal).screenshotRunner?.masterIsRunning)
        if (!(global as CustomGlobal).screenshotRunner?.masterIsRunning) {
            (global as CustomGlobal).screenshotRunner = { masterIsRunning: true };
            // enableGlobalScreenshotVariable();
            setAreTasksTriggered(true);
        }
    };
    const renderItemError = (task: ListRenderItemInfo<ErrorType>): ReactElement => (
        <Fragment>
            <Text style={styles.subTitle}>{task.item?.name}</Text>
            <Text style={styles.error}>{task.item?.error?.toString()}</Text>
        </Fragment>
    );

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <TouchableButton style={styles.button?.start?.container} onPress={setAreTasksTriggeredToTrue}>
                    <Text style={styles.button?.start?.text}>Start</Text>
                </TouchableButton>
                {areTasksTriggered && (
                    <TouchableButton style={styles.button?.stop?.container} onPress={setAreTasksTriggeredToFalse}>
                        <Text style={styles.button?.stop?.text}>Stop</Text>
                    </TouchableButton>
                )}
            </View>
            {areTasksTriggered && tasksRunning.length > 0 && (
                <Text style={styles.subTitle}>
                    {tasksRunning.length}/{tasksEnabledLength} Running tasks...
                </Text>
            )}
            {taskWithErrors.length > 0 && (
                <Fragment>
                    <Text style={styles.title}>Tasks with errors:</Text>
                    <FlatList
                        data={taskWithErrors}
                        renderItem={renderItemError}
                        keyExtractor={task => task.name}
                        style={styles.list}
                    />
                </Fragment>
            )}
        </View>
    );
}
