/**
 * This file was generated from ScreenshotRunner.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue } from "mendix";

export interface TasksType {
    task?: ActionValue;
    name: string;
    enabled: boolean;
}

export interface TasksPreviewType {
    task: {} | null;
    name: string;
    enabled: boolean;
}

export interface ScreenshotRunnerProps<Style> {
    name: string;
    style: Style[];
    tasks: TasksType[];
}

export interface ScreenshotRunnerPreviewProps {
    class: string;
    style: string;
    tasks: TasksPreviewType[];
}
