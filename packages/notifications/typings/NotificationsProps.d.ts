/**
 * This file was generated from Notifications.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import PropTypes from "prop-types";

interface CommonProps {
    style: PropTypes.array;
}

export interface ActionsType {
    name: string;
    placeholderForModelerBug1?: string;
    placeholderForModelerBug2?: string;
    onReceive?: ActionValue;
    onOpen?: ActionValue;
}

export interface NotificationsProps extends CommonProps {
    actions: ActionsType[];
    guid?: EditableValue<string>;
}
