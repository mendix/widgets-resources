import { ReactElement } from "react";
// import { ValueStatus } from "mendix";

// import { Charts as ChartsComponent } from "./components/LineChart";
// import { LineChartProps } from "../typings/LineChartProps";

export function LineChart(): ReactElement | null {
    // const { data, xAttribute, yAttribute } = props;

    // const [chartData, setChartData] = useState<Array<{ x: any; y: any }>>([]);

    // useEffect(() => {
    //     // console.warn("effect", data.status);
    //     // console.warn(data.totalCount);
    //     if (data.status === ValueStatus.Available) {
    //         setChartData(
    //             data.items!.map(item => {
    //                 const xValue = xAttribute(item);
    //                 const yValue = yAttribute(item);
    //                 if (xValue.status === ValueStatus.Available && yValue.status === ValueStatus.Available) {
    //                     return { x: xValue.value, y: yValue.value };
    //                 }
    //                 return { x: 0, y: 0 };
    //             })
    //         );
    //     }
    // }, [data, xAttribute, yAttribute]);

    // // console.warn(chartData);

    // return <ChartsComponent data={chartData} />;
    return null;
}
