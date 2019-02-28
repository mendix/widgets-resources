import { curveNatural } from "d3-shape";
import { Component, createElement } from "react";
import { Text, View } from "react-native";
import { PathProps } from "react-native-svg";
import {
    AreaChart,
    BarChart,
    Grid,
    LineChart,
    PieChart,
    StackedAreaChart,
    StackedBarChart,
    XAxis,
    YAxis
} from "react-native-svg-charts";

import { ChartsProps } from "../typings/ChartsProps";

export class Charts extends Component<ChartsProps<undefined>> {
    private keys: any[] = [];
    private data: any[] = [];
    private dataSafe: Set<number> = new Set();

    private readonly onClick = this.onClickAction.bind(this);

    render(): JSX.Element {
        if (this.props.values && this.props.values.value) {
            try {
                this.data = JSON.parse(this.props.values.value)
                    .map((v: any) => v.attributes)
                    .map((v: any) => {
                        this.keys = Object.keys(v).filter(key => key !== "guid");
                        if (this.keys.length === 1 || this.props.type.indexOf("stacked") === -1) {
                            this.dataSafe.add(Number(v[this.keys[0]].value));
                            return Number(v[this.keys[0]].value);
                        } else {
                            const newObject: any = {};
                            this.keys.forEach(key => {
                                this.dataSafe.add(Number(v[key].value));
                                newObject[key] = Number(v[key].value);
                                newObject.svg = { onPress: () => this.onClick() };
                            });
                            return newObject;
                        }
                        return 0;
                    });
            } catch (e) {
                this.data = [];
                this.dataSafe = new Set();
            }
        }
        if (this.data && this.data.length > 0) {
            switch (this.props.type) {
                case "area":
                    return this.renderAreaChart();
                case "stackedArea":
                    return this.renderStackedAreaChart();
                case "bar":
                    return this.renderBarChart();
                case "stackedBar":
                    return this.renderStackedBarChart();
                case "line":
                    return this.renderLineChart();
                case "pie":
                    return this.renderPieChart();
            }
        }
        return (
            <View>
                <Text>No content to render the graph</Text>
            </View>
        );
    }

    // @ts-ignore
    shouldComponentUpdate(nextProps: Readonly<NativeChartsProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        if (this.props.values !== nextProps.values) {
            return true;
        }

        return false;
    }

    renderAreaChart(): JSX.Element {
        const color = this.randomColor();
        return (
            <View style={{ flexDirection: "column" }}>
                <View style={{ height: this.props.height, flexDirection: "row" }}>
                    {this.props.showYAxis ? this.renderYAxis() : null}
                    <AreaChart
                        animate={true}
                        data={this.data}
                        contentInset={{
                            top: this.props.marginTop,
                            bottom: this.props.marginBottom,
                            left: this.props.marginLeft,
                            right: this.props.marginRight
                        }}
                        curve={curveNatural}
                        svg={{ fill: color, onPress: () => this.onClick() }}
                        style={{ flex: 1 }}
                    >
                        {this.props.showGrid ? <Grid /> : null}
                    </AreaChart>
                </View>
                {this.props.showXAxis ? this.renderXAxis() : null}
                {this.props.showLabels ? this.renderLabels([this.keys[0]], [color]) : null}
            </View>
        );
    }

    randomColor(): string {
        // tslint:disable-next-line:no-bitwise
        return `#${((Math.random() * 0xffffff) << 0).toString(16)}000000`.slice(0, 7);
    }

    renderStackedAreaChart(): JSX.Element {
        const colors: string[] = [];
        const actions: Array<Partial<PathProps>> = [];
        this.keys.forEach(_ => {
            colors.push(this.randomColor());
            actions.push({ onPress: () => this.onClick() });
        });

        return (
            <View style={{ flexDirection: "column" }}>
                <View style={{ height: this.props.height, flexDirection: "row" }}>
                    {this.props.showYAxis ? this.renderYAxis() : null}
                    <StackedAreaChart
                        animate={true}
                        style={{ flex: 1 }}
                        data={this.data}
                        keys={this.keys}
                        colors={colors}
                        curve={curveNatural}
                        contentInset={{
                            top: this.props.marginTop,
                            bottom: this.props.marginBottom,
                            left: this.props.marginLeft,
                            right: this.props.marginRight
                        }}
                        showGrid={this.props.showGrid}
                        svgs={actions}
                    >
                        {this.props.showGrid ? <Grid /> : null}
                    </StackedAreaChart>
                </View>
                {this.props.showXAxis ? this.renderXAxis() : null}
                {this.props.showLabels ? this.renderLabels(this.keys, colors) : null}
            </View>
        );
    }

    renderBarChart(): JSX.Element {
        const fill = this.randomColor();
        return (
            <View style={{ flexDirection: "column" }}>
                <View style={{ height: this.props.height, flexDirection: "row" }}>
                    {this.props.showYAxis ? this.renderYAxis() : null}
                    <BarChart
                        animate={true}
                        data={this.data}
                        svg={{ fill, onPress: () => this.onClick() }}
                        contentInset={{
                            top: this.props.marginTop,
                            bottom: this.props.marginBottom,
                            left: this.props.marginLeft,
                            right: this.props.marginRight
                        }}
                        style={{ flex: 1 }}
                    >
                        {this.props.showGrid ? <Grid /> : null}
                    </BarChart>
                </View>
                {this.props.showXAxis ? this.renderXAxis() : null}
                {this.props.showLabels ? this.renderLabels([this.keys[0]], [fill]) : null}
            </View>
        );
    }

    renderStackedBarChart(): JSX.Element {
        const colors: string[] = [];
        const actions: Array<Partial<PathProps>> = [];
        this.keys.forEach(_ => {
            colors.push(this.randomColor());
        });

        return (
            <View style={{ flexDirection: "column" }}>
                <View style={{ height: this.props.height, flexDirection: "row" }}>
                    {this.props.showYAxis ? this.renderYAxis() : null}
                    <StackedBarChart
                        animate={true}
                        keys={this.keys}
                        colors={colors}
                        data={this.data}
                        svgs={actions}
                        contentInset={{
                            top: this.props.marginTop,
                            bottom: this.props.marginBottom,
                            left: this.props.marginLeft,
                            right: this.props.marginRight
                        }}
                        showGrid={this.props.showGrid}
                        style={{ flex: 1 }}
                    >
                        {this.props.showGrid ? <Grid /> : null}
                    </StackedBarChart>
                </View>
                {this.props.showXAxis ? this.renderXAxis() : null}
                {this.props.showLabels ? this.renderLabels(this.keys, colors) : null}
            </View>
        );
    }

    renderLineChart(): JSX.Element {
        const color = this.randomColor();
        return (
            <View style={{ flexDirection: "column" }}>
                <View style={{ height: this.props.height, flexDirection: "row" }}>
                    {this.props.showYAxis ? this.renderYAxis() : null}
                    <LineChart
                        animate={true}
                        data={this.data}
                        svg={{ stroke: color, onPress: () => this.onClick() }}
                        contentInset={{
                            top: this.props.marginTop,
                            bottom: this.props.marginBottom,
                            left: this.props.marginLeft,
                            right: this.props.marginRight
                        }}
                        style={{ flex: 1 }}
                    >
                        {this.props.showGrid ? <Grid /> : null}
                    </LineChart>
                </View>
                {this.props.showXAxis ? this.renderXAxis() : null}
                {this.props.showLabels ? this.renderLabels([this.keys[0]], [color]) : null}
            </View>
        );
    }

    renderPieChart(): JSX.Element {
        const keys: any[] = [];
        const colors: string[] = [];
        const pieData = this.data
            .filter(value => value > 0)
            .map((value, index) => {
                const color = this.randomColor();
                keys.push(value);
                colors.push(color);
                return {
                    value,
                    svg: {
                        fill: color,
                        onPress: () => this.onClick()
                    },
                    key: `pie-${index}`
                };
            });

        return (
            <View style={{ flexDirection: "column" }}>
                <PieChart
                    animate={true}
                    style={{ height: this.props.height }}
                    data={pieData}
                    svg={{ onPress: () => this.onClick() }}
                />
                {this.props.showLabels ? this.renderLabels(keys, colors) : null}
            </View>
        );
    }

    renderXAxis(): JSX.Element {
        const data = Array.from(this.dataSafe);
        const { xLabel, marginLeft, marginRight } = this.props;
        return (
            <XAxis
                style={{ marginHorizontal: -10 }}
                data={data}
                numberOfTicks={10}
                formatLabel={formatXLabel}
                svg={{ fontSize: 10, fill: "grey" }}
                contentInset={{ left: marginLeft, right: marginRight }}
            />
        );

        function formatXLabel(value: any, _index: any): string {
            return `${value}${xLabel}`;
        }
    }

    renderYAxis(): JSX.Element {
        const data = Array.from(this.dataSafe);
        const { yLabel, marginTop, marginBottom } = this.props;
        return (
            <YAxis
                data={data}
                contentInset={{ top: marginTop, bottom: marginBottom }}
                svg={{
                    fill: "grey",
                    fontSize: 10
                }}
                numberOfTicks={10}
                formatLabel={formatYLabel}
            />
        );

        function formatYLabel(value: any): string {
            return `${value}${yLabel}`;
        }
    }

    renderLabels(keys: any[], colors: string[]): JSX.Element {
        const generateChild = () => {
            const childs: JSX.Element[] = [];

            keys.forEach((key, index) =>
                childs.push(
                    <View
                        style={{
                            flexDirection: "row",
                            alignContent: "center",
                            justifyContent: "center",
                            marginRight: 5
                        }}
                    >
                        <View style={{ backgroundColor: colors[index], height: 10, width: 10, marginRight: 5 }} />
                        <Text style={{ fontSize: 10 }}>{key}</Text>
                    </View>
                )
            );
            return childs;
        };
        return (
            <View
                style={{ flexDirection: "row", marginLeft: this.props.marginLeft, marginRight: this.props.marginRight }}
            >
                {generateChild()}
            </View>
        );
    }

    onClickAction(): void {
        if (this.props.onClick && this.props.onClick.canExecute) {
            this.props.onClick.execute();
        }
    }
}
