import { createElement, Fragment, ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import ReactPlotlyChartComponent, { PlotParams } from "react-plotly.js";
import { Config, Data, Layout, PlotMouseEvent } from "plotly.js";
import deepmerge from "deepmerge";
import { Playground, useChartsPlaygroundState } from "./Playground/Playground";
import { CodeEditor } from "./Playground/CodeEditor";
import { ifNonEmptyStringElseEmptyObjectString } from "./Playground/utils";

export interface MendixChartDataProps {
    customSeriesOptions: string | undefined;
    onClick?: () => void;
}

type ChartDataType = Partial<Data> & MendixChartDataProps;
export interface ChartProps {
    data: ChartDataType[];
    configOptions: Partial<Config>;
    layoutOptions: Partial<Layout>;
    seriesOptions: Partial<Data>;
    customConfig: string | undefined;
    customLayout: string | undefined;
}

function forceReactPlotlyUpdate(): void {
    window.dispatchEvent(new Event("resize"));
}

export const Chart = ({
    data,
    configOptions,
    layoutOptions,
    seriesOptions,
    customConfig,
    customLayout
}: ChartProps): ReactElement => {
    const hasForceUpdatedReactPlotly = useRef(false);

    useEffect(() => {
        const dataIsLoaded = data.length > 0;
        // The lib doesn't autosize the chart properly in the beginning (even with the `responsive` config),
        // so we manually trigger a refresh once when everything is ready.
        if (!hasForceUpdatedReactPlotly.current && dataIsLoaded) {
            forceReactPlotlyUpdate();
            hasForceUpdatedReactPlotly.current = true;
        }
    }, [data]);

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
                    seriesOptions,
                    serie,
                    JSON.parse(ifNonEmptyStringElseEmptyObjectString(customSeriesOptions))
                ])
            ),
        [data, seriesOptions]
    );

    const handleChartClick = useCallback<NonNullable<PlotParams["onClick"]>>(
        event => {
            getUniqueSeriesIndices(event).forEach(seriesIndex => {
                if (seriesIndex < data.length) {
                    const seriesOnClick = data[seriesIndex].onClick;
                    if (seriesOnClick) {
                        seriesOnClick();
                    }
                }
            });
        },
        [data]
    );

    return (
        <ReactPlotlyChartComponent
            className="mx-react-plotly-chart"
            style={{}}
            data={customData}
            config={customConfigOptions}
            layout={customLayoutOptions}
            onClick={handleChartClick}
        />
    );
};

function getUniqueSeriesIndices(event: PlotMouseEvent): number[] {
    const clickedSeriesIndices = event.points.map(point => point.curveNumber);
    return Array.from(new Set(clickedSeriesIndices));
}

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
        activeEditableCode,
        activeView,
        changeActiveView,
        changeEditableCode,
        changeEditableCodeIsValid,
        editedConfig,
        editedData,
        editedLayout
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
                    <Playground.Panel
                        key="modeler"
                        heading="Settings from the Studio/Studio Pro"
                        headingClassName="read-only"
                    >
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
                customLayout={editedLayout}
                configOptions={configOptions}
                customConfig={editedConfig}
                seriesOptions={seriesOptions}
            />
        </Playground.Wrapper>
    );
};
