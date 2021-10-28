import { createElement, Fragment, ReactElement, useCallback, useMemo } from "react";
import ReactPlotlyChartComponent from "react-plotly.js";
import { Config, Data, Layout } from "plotly.js";
import deepmerge from "deepmerge";
import { Playground, useChartsPlaygroundState } from "./Playground/Playground";
import { CodeEditor } from "./Playground/CodeEditor";
import { ifNonEmptyStringElseEmptyObjectString } from "./Playground/utils";

type ChartDataType = Partial<Data> & {
    customSeriesOptions: string | undefined;
};
export interface ChartProps {
    data: Array<ChartDataType>;
    configOptions: Partial<Config>;
    layoutOptions: Partial<Layout>;
    seriesOptions: Partial<Data>;
    customConfig: string | undefined;
    customLayout: string | undefined;
}

export const Chart = ({
    data,
    configOptions,
    layoutOptions,
    seriesOptions,
    customConfig,
    customLayout
}: ChartProps): ReactElement => {
    const forceReactPlotlyUpdate = useCallback(() => {
        window.dispatchEvent(new Event("resize"));
    }, []);

    const customLayoutOptions = useMemo<Partial<Layout>>(
        () => deepmerge(layoutOptions, JSON.parse(ifNonEmptyStringElseEmptyObjectString(customLayout))),
        [layoutOptions, customLayout]
    );

    const customConfigOptions = useMemo<Partial<Config>>(
        () => deepmerge(configOptions, JSON.parse(ifNonEmptyStringElseEmptyObjectString(customConfig))),
        [configOptions, customConfig]
    );

    const customData = useMemo<Array<Partial<Data>>>(
        () =>
            data.map(({ customSeriesOptions, ...serie }) =>
                deepmerge.all([
                    serie,
                    seriesOptions,
                    JSON.parse(ifNonEmptyStringElseEmptyObjectString(customSeriesOptions))
                ])
            ),
        [data, seriesOptions]
    );

    return (
        <ReactPlotlyChartComponent
            className="mx-react-plotly-chart"
            style={{}}
            data={customData}
            config={customConfigOptions}
            layout={customLayoutOptions}
            onInitialized={forceReactPlotlyUpdate}
        />
    );
};

const irrelevantSeriesKeys = ["x", "y", "z", "customSeriesOptions"];

export const ChartWithPlayground = ({
    data,
    layoutOptions,
    configOptions,
    seriesOptions,
    customLayout,
    customConfig
}: ChartProps): ReactElement => {
    const {
        activeView,
        activeEditableCode,
        changeActiveView,
        changeEditableCode,
        changeEditableCodeIsValid,
        editedData
    } = useChartsPlaygroundState({
        data,
        customConfig,
        customLayout
    });

    const activeModelerCode = useMemo(() => {
        if (activeView === "layout") {
            return layoutOptions;
        }
        if (activeView === "config") {
            return configOptions;
        }
        const index = parseInt(activeView, 10);
        return Object.fromEntries(
            Object.entries(data[index]).filter(([key]) => !irrelevantSeriesKeys.includes(key))
        ) as Partial<Data>;
    }, [activeView, configOptions, data, layoutOptions]);

    return (
        <Playground.Wrapper
            renderPanels={
                <Fragment>
                    <Playground.Panel key={activeView} heading="Custom settings">
                        <CodeEditor
                            readOnly={false}
                            value={activeEditableCode}
                            onChange={changeEditableCode}
                            onValidate={annotations => changeEditableCodeIsValid(!annotations.length)}
                        />
                    </Playground.Panel>
                    <Playground.Panel key="modeler" heading="Settings from the Modeler" headingClassName="read-only">
                        <CodeEditor
                            readOnly
                            value={JSON.stringify(activeModelerCode, null, 2)}
                            overwriteValue={activeEditableCode}
                        />
                    </Playground.Panel>
                </Fragment>
            }
            renderSidebarHeaderTools={
                <Playground.SidebarHeaderTools>
                    <Playground.Select
                        onChange={changeActiveView}
                        options={[
                            { name: "Layout", value: "layout", isDefaultSelected: true },
                            ...data.map((serie, index) => ({
                                name: serie.name || `trace ${index}`,
                                value: index,
                                isDefaultSelected: false
                            })),
                            { name: "Configuration", value: "config", isDefaultSelected: false }
                        ]}
                    />
                </Playground.SidebarHeaderTools>
            }
        >
            <Chart
                data={editedData}
                layoutOptions={layoutOptions}
                customLayout={activeView === "layout" ? activeEditableCode : customLayout}
                configOptions={configOptions}
                customConfig={activeView === "config" ? activeEditableCode : customConfig}
                seriesOptions={seriesOptions}
            />
        </Playground.Wrapper>
    );
};
