/* eslint-disable */
export namespace Container {
    export interface ToolbarProps {
        messages: ViewOptions;
        onNavigate: (action: Style.Action, newDate: Date) => void;
        onViewChange: (view: Style.View) => void;
    }

    export interface EventInfo {
        allDay: boolean;
        end: Date;
        event: Info;
        start: Date;
        guid: string;
        slots: Date[];
    }

    interface Info {
        allDay: boolean;
        color: string;
        end: Date;
        guid: string;
        start: Date;
        title: string;
    }

    interface WrapperProps {
        class: string;
        friendlyId: string;
        mxform: mxui.lib.form._FormBase;
        mxObject: mendix.lib.MxObject;
        readOnly: boolean;
        style: string;
    }

    interface Dimensions {
        height: number;
        heightUnit: Style.HeightUnitType;
        width: number;
        widthUnit: Style.WidthUnitType;
    }

    interface Events {
        onClickEvent: OnClickEventOptions;
        onCreate: OnClickEventOptions;
        onClickMicroflow: string;
        onClickNanoflow: mx.Nanoflow;
        onCreateMicroflow: string;
        onCreateNanoflow: mx.Nanoflow;
        onChangeEvent: OnClickEventOptions;
        onChangeMicroflow: string;
        onChangeNanoflow: mx.Nanoflow;
    }

    interface EventData {
        titleAttribute: string;
        startAttribute: string;
        endAttribute: string;
        allDayAttribute: string;
        eventColor: string;
    }

    export interface CustomFormats {
        headerFormat: string;
        cellDateFormat: string;
        gutterTimeFormat: string;
        gutterDateFormat: string;
        allDayText: string;
        textHeaderDate: string;
        textHeaderTime: string;
        textHeaderEvent: string;
    }

    export interface CalendarContainerProps extends WrapperProps, Dimensions, Events, EventData {
        customViews: CustomViews[];
        enableCreate: boolean;
        defaultView: Style.View;
        executeOnViewChange: boolean;
        newEventContextPath: string;
        startDateAttribute: string;
        viewStartAttribute: string;
        viewEndAttribute: string;
        dataSource: DataSource;
        eventEntity: string;
        entityConstraint: string;
        dataSourceMicroflow: string;
        dataSourceNanoflow: mx.Nanoflow;
        popup: boolean;
        editable: string;
        view: Views;
    }

    type functionType = (date: Date) => string;

    export type DateType = "date" | "day" | "weekday" | "timeGutter";

    export interface ViewOptions {
        month?: string;
        week?: string;
        work_week?: string;
        day?: string;
        agenda?: string;
        allDay?: string;
        date?: string;
        time?: string;
        event?: string;
        dateFormat?: functionType | string;
        dayFormat?: functionType | string;
        weekdayFormat?: functionType | string;
        timeGutterFormat?: functionType | string;
        dayHeaderFormat?: functionType | string;
        dayRangeHeaderFormat?: ((dateRange: { start: Date; end: Date }) => string) | string;
        monthHeaderFormat?: functionType | string;
        agendaHeaderFormat?: ((dateRange: { start: Date; end: Date }) => string) | string;
    }

    export type DataSource = "context" | "XPath" | "microflow" | "nanoflow";
    export type OnClickEventOptions = "doNothing" | "callMicroflow" | "callNanoflow";
    type Views = "custom" | "standard";

    export interface ButtonConfig {
        customView: Style.View | Style.Action | "title";
        position: Style.Position;
        customCaption?: string;
        renderMode: "button" | "link";
        buttonToolTip?: string;
        buttonStyle?: Style.ButtonStyle;
        onClickToolbarButton?: (date: object) => void;
    }

    export interface CustomViews extends CustomFormats, ButtonConfig {}
}

export namespace Data {
    export interface EventProps {
        onClickEvent: "doNothing" | "callMicroflow" | "callNanoflow";
        onClickMicroflow: string;
        onClickNanoflow: mx.Nanoflow;
        tooltipForm: string;
    }

    export interface FetchDataOptions {
        type?: Container.DataSource;
        entity?: string;
        guid?: string;
        mxform: mxui.lib.form._FormBase;
        constraint?: string;
        microflow?: string;
        nanoflow: mx.Nanoflow;
    }

    export interface FetchByXPathOptions {
        guid: string;
        entity: string;
        constraint: string;
    }
}

export namespace Style {
    export type HeightUnitType = "percentageOfWidth" | "percentageOfParent" | "pixels";
    export type Position = "left" | "right" | "center";
    export type View = "month" | "week" | "work_week" | "day" | "agenda";
    export type Action = "previous" | "next" | "today";
    export type ButtonStyle = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";
    export type WidthUnitType = "percentage" | "pixels";
}
