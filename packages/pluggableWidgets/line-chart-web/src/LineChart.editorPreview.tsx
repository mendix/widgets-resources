import { createElement } from "react";
import { Chart } from "./components/Chart";

export function preview() {
    return <Chart xAxis={[1, 2, 3]} yAxis={[2, 6, 3]} title="Fancy example" />;
}
