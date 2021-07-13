import { createElement, ReactElement, useState, Fragment, useEffect, useCallback } from "react";
import { executeAction } from "@mendix/piw-utils-internal";
import { FlatList, View, Text, ListRenderItemInfo, Pressable } from "react-native";
import { flattenStyles } from "@mendix/piw-native-utils-internal";
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

export function ScreenshotRunner(props: ScreenshotRunnerProps<ScreenshotRunnerStyle>): ReactElement {
    const [tasksRunning, setTasksRunning] = useState<TasksType[]>([]);
    const [taskWithErrors, setTaskWithErrors] = useState<ErrorType[]>([]);
    const [areTasksTriggered, setAreTasksTriggered] = useState(false);
    const styles = flattenStyles(defaultScreenshotRunnerStyles, props.style);
    const { androidRipple: androidRippleStart } = styles.button.start.container;
    const { androidRipple: androidRippleStop } = styles.button.stop.container;
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
    const enableGlobalScreenshotVariable = (name = "placeholder") => {
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

    const runTask = useCallback(async (task: TasksType) => {
        const maxTimeouts = 30;
        let timeoutCount = 0;

        if (!task.task?.canExecute) {
            throw new Error(`Task ${task.name} is not executable..`);
        }

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
    }, []);

    useEffect(() => {
        if (areTasksTriggered) {
            (async tasks => {
                for await (const task of tasks) {
                    if ((global as CustomGlobal).screenshotRunner?.masterIsRunning && task.enabled) {
                        await runTask(task);
                    }
                }
                setAreTasksTriggered(false);
                (global as CustomGlobal).screenshotRunner.masterIsRunning = false;
            })(props.tasks);
        }
    }, [props.tasks, areTasksTriggered]);

    const setAreTasksTriggeredToFalse = () => {
        (global as CustomGlobal).screenshotRunner.masterIsRunning = false;
        setTasksRunning([]);
        setAreTasksTriggered(false);
    };

    const setAreTasksTriggeredToTrue = () => {
        if (!(global as CustomGlobal).screenshotRunner?.masterIsRunning) {
            (global as CustomGlobal).screenshotRunner = { masterIsRunning: true };
            setAreTasksTriggered(true);
        }
    };
    const renderItemError = (task: ListRenderItemInfo<ErrorType>): ReactElement => (
        <Fragment>
            <Text style={styles.subText}>{task.item?.name}</Text>
            <Text style={styles.errorText}>{task.item?.error?.toString()}</Text>
        </Fragment>
    );

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Pressable
                    style={styles.button?.start?.container}
                    android_ripple={androidRippleStart}
                    onPress={setAreTasksTriggeredToTrue}
                >
                    <Text style={styles.button?.start?.text}>Start</Text>
                </Pressable>
                {areTasksTriggered && (
                    <Pressable
                        style={styles.button?.stop?.container}
                        android_ripple={androidRippleStop}
                        onPress={setAreTasksTriggeredToFalse}
                    >
                        <Text style={styles.button?.stop?.text}>Stop</Text>
                    </Pressable>
                )}
            </View>
            {areTasksTriggered && tasksRunning.length > 0 && (
                <Text style={styles.subText}>
                    {tasksRunning.length}/{tasksEnabledLength} Running tasks...
                </Text>
            )}
            {taskWithErrors.length > 0 && (
                <Fragment>
                    <Text style={styles.text}>Tasks with errors:</Text>
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
