export namespace Container {
    interface WrapperProps {
        class: string;
        friendlyId: string;
        mxform: mxui.lib.form._FormBase;
        mxObject: mendix.lib.MxObject;
        readOnly: boolean;
        style: string;
    }

    export interface CalendarContainerProps extends WrapperProps {
        height: number;
        heightUnit: Style.HeightUnitType;
        titleAttribute: string;
        startAttribute: string;
        endAttribute: string;
        allDayAttribute: string;
        eventColor: string;
        titleAttributeContext: string;
        startAttributeContext: string;
        endAttributeContext: string;
        allDayAttributeContext: string;
        eventColorContext: string;
        defaultView: Style.View;
        startPositionAttribute: string;
        dataSource: DataSource;
        eventEntity: string;
        entityConstraint: string;
        dataSourceMicroflow: string;
        dataSourceNanoflow: Data.Nanoflow;
        popup: boolean;
        selectable: boolean;
        onClickEvent: OnClickEventOptions;
        onCreate: OnClickEventOptions;
        onClickMicroflow: string;
        onClickNanoflow: Data.Nanoflow;
        onClickPage: string;
        onClickOpenPageAs: PageLocation;
        onCreateMicroflow: string;
        onCreateNanoflow: Data.Nanoflow;
        onCreatePage: string;
        onCreateOpenPageAs: PageLocation;
        onChangeEvent: OnClickEventOptions;
        onChangeMicroflow: string;
        onChangeNanoflow: Data.Nanoflow;
        refreshInterval: number;
        customViews: CustomViews[];
        dayFormat: string;
        views: Views;
        weekdayFormat: string;
        timeGutterFormat: string;
        monthHeaderFormat: string;
        dayHeaderFormat: string;
        width: number;
        widthUnit: Style.WidthUnitType;
    }

    export type DataSource = "context" | "XPath" | "microflow" | "nanoflow";
    type OnClickEventOptions = "doNothing" | "showPage" | "callMicroflow" | "callNanoflow";
    type PageLocation = "content" | "popup" | "modal";
    type Views = "custom" | "standard";

    export interface CustomViews {
        customCaption: string;
        customView: Style.View;
    }
}

export namespace Data {
    export interface EventProps {
        onClickEvent: "doNothing" | "showPage" | "callMicroflow" | "callNanoflow";
        openPageLocation: "popup" | "modal" | "content";
        onClickPage: string;
        onClickMicroflow: string;
        onClickNanoflow: Nanoflow;
        tooltipForm: string;
    }

    export interface FetchDataOptions {
        type?: Container.DataSource;
        entity?: string;
        guid?: string;
        mxform?: mxui.lib.form._FormBase;
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
    export type View = "month" | "week" | "work_week" | "day" | "agenda";
    export type WidthUnitType = "percentage" | "pixels";
}
