/**
 * AUTO-GENERATED file: please do not change this file otherwise it will be overwritten
 * @author Mendix Widgets Team
 */

interface CommonProps {
    id: string;
    class: string;
}

export interface FeedbackProps extends CommonProps {
    username?: PluginWidget.EditableValue<string>;
    email?: PluginWidget.EditableValue<string>;
    appId: string;
    allowScreenshot: boolean;
    hideLogo: boolean;
}
