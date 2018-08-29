export namespace Container {
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
        onClickNanoflow: Data.Nanoflow;
        onCreateMicroflow: string;
        onCreateNanoflow: Data.Nanoflow;
        onChangeEvent: OnClickEventOptions;
        onChangeMicroflow: string;
        onChangeNanoflow: Data.Nanoflow;
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
        textAllDay: string;
        textHeaderDate: string;
        textHeaderTime: string;
        textHeaderEvent: string;
    }

    export interface CalendarContainerProps extends WrapperProps, Dimensions, Events, EventData, CustomFormats {
        customViews: CustomViews[];
        enableCreate: boolean;
        defaultView: Style.View;
        executeOnViewChange: boolean;
        startPositionAttribute: string;
        viewStartAttribute: string;
        viewEndAttribute: string;
        dataSource: DataSource;
        eventEntity: string;
        entityConstraint: string;
        dataSourceMicroflow: string;
        dataSourceNanoflow: Data.Nanoflow;
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
    }

    export type DataSource = "context" | "XPath" | "microflow" | "nanoflow";
    export type OnClickEventOptions = "doNothing" | "callMicroflow" | "callNanoflow";
    type Views = "custom" | "standard";

    export interface CustomViews extends CustomFormats {
        customView: Style.View;
        position: Style.Position;
        customCaption: string;
        renderMode: string;
        buttonToolTip: string;
        buttonStyle: Style.ButtonStyle;
    }
}

export namespace Data {
    export interface EventProps {
        onClickEvent: "doNothing" | "callMicroflow" | "callNanoflow";
        onClickMicroflow: string;
        onClickNanoflow: Nanoflow;
        tooltipForm: string;
    }

    export interface FetchDataOptions {
        type?: Container.DataSource;
        entity?: string;
        guid?: string;
        mxform: mxui.lib.form._FormBase;
        constraint?: string;
        microflow?: string;
        nanoflow: Nanoflow;
    }

    export interface FetchByXPathOptions {
        guid: string;
        entity: string;
        constraint: string;
    }
    export interface Nanoflow {
        nanoflow: object[];
        paramsSpec: { Progress: string };
    }
}

export namespace Style {
    export type HeightUnitType = "percentageOfWidth" | "percentageOfParent" | "pixels";
    export type Position = "left" | "right" | "center";
    export type View = "month" | "week" | "work_week" | "day" | "agenda";
    export type ButtonStyle = "default" | "primary" | "success" | "info" | "inverse" | "warning" | "danger";
    export type WidthUnitType = "percentage" | "pixels";
}
