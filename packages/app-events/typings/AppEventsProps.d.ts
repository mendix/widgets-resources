/**
 * This file was generated from AppEvents.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface TimeoutsType {
    timeout: number;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    action: ActionValue;
}

export interface IntervalsType {
    interval: number;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    action: ActionValue;
}

export interface AppEventsProps extends CommonProps {
    onLoad?: ActionValue;
    onResume?: ActionValue;
    onResumeTimeout: number;
    onOnline?: ActionValue;
    onOnlineTimeout: number;
    timeouts: TimeoutsType[];
    intervals: IntervalsType[];
}
