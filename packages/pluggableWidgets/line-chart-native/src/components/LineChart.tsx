// import { createElement, ReactElement } from "react";
// import { StyleSheet, View } from "react-native";
// import {
//     VictoryBar,
//     VictoryChart,
//     VictoryAxis
//     // VictoryLabel,
//     // VictoryGroup,
//     // VictoryLegend,
//     // Border
// } from "victory-native";

// // import { ChartsProps } from "../typings/ChartsProps";

// // const data = [
// //     { quarter: 1, earnings: 13000 },
// //     { quarter: 2, earnings: 16500 },
// //     { quarter: 3, earnings: 14250 },
// //     { quarter: 4, earnings: 19000 }
// // ];

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//     }
// });

// interface ChartsProps {
//     data: Array<{ x: any; y: any }>;
// }

// export function Charts(props: ChartsProps): ReactElement {
//     console.warn(props.data.length);

//     return (
//         <View style={styles.container}>
//             {/* <VictoryChart width={400} padding={{ left: 90, top: 60, bottom: 60, right: 10 }} domainPadding={{ x: 25 }}>
//                 <VictoryLabel x={200} y={30} text="Bar chart" textAnchor={"middle"} style={{ fontSize: 20 }} />

//                 <VictoryAxis
//                     axisLabelComponent={<VictoryLabel dy={10} />}
//                     tickValues={[1, 2, 3, 4]}
//                     tickFormat={["Q1", "Q2", "Q3", "Q4"]}
//                     label={"Quaters 2019"}
//                 />
//                 <VictoryAxis
//                     dependentAxis
//                     axisLabelComponent={<VictoryLabel dy={-40} />}
//                     label={"Earnings ($)"}
//                     style={{ grid: { stroke: "#818e99", strokeWidth: 1 } }}
//                 />

//                 <VictoryBar
//                     data={data}
//                     x="quarter"
//                     y="earnings"
//                     barWidth={20}
//                     style={{
//                         data: { fill: "#0595DB" }
//                     }}
//                     animate={{
//                         duration: 2000
//                     }}
//                 />
//             </VictoryChart>

//             <VictoryChart width={400} padding={{ left: 90, top: 60, bottom: 60, right: 130 }} domainPadding={20}>
//                 <VictoryLabel x={200} y={30} text="Bar chart" textAnchor={"middle"} style={{ fontSize: 20 }} />

//                 <VictoryLegend
//                     borderComponent={<Border width={110} />}
//                     x={280}
//                     y={60}
//                     title="Legend"
//                     style={{ border: { stroke: "black" }, title: { fontSize: 16 } }}
//                     data={[
//                         { name: "Mendix", symbol: { fill: "#0595DB" } },
//                         { name: "Outsystems", symbol: { fill: "#bf2a2a" } }
//                     ]}
//                 />

//                 <VictoryAxis
//                     axisLabelComponent={<VictoryLabel dy={10} />}
//                     tickValues={[1, 2, 3, 4]}
//                     tickFormat={["Q1", "Q2", "Q3", "Q4"]}
//                     label={"Quaters 2019"}
//                 />
//                 <VictoryAxis
//                     dependentAxis
//                     axisLabelComponent={<VictoryLabel dy={-40} />}
//                     label={"Earnings ($)"}
//                     style={{ grid: { stroke: "#818e99", strokeWidth: 1 } }}
//                 />

//                 <VictoryGroup offset={15}>
//                     <VictoryBar
//                         data={data}
//                         x="quarter"
//                         y="earnings"
//                         barWidth={10}
//                         style={{
//                             data: { fill: "#0595DB" }
//                         }}
//                         animate={{
//                             duration: 2000
//                         }}
//                     />

//                     <VictoryBar
//                         data={data.map(datapoint => {
//                             return {
//                                 quarter: datapoint.quarter,
//                                 earnings: datapoint.earnings - 5000
//                             };
//                         })}
//                         x="quarter"
//                         y="earnings"
//                         barWidth={10}
//                         style={{
//                             data: { fill: "#bf2a2a" }
//                         }}
//                         animate={{
//                             duration: 2000
//                         }}
//                     />
//                 </VictoryGroup>
//             </VictoryChart>

//             <VictoryChart width={400} padding={{ left: 90, top: 60, bottom: 120, right: 10 }} domainPadding={20}>
//                 <VictoryLabel x={200} y={30} text="Bar chart" textAnchor={"middle"} style={{ fontSize: 20 }} />

//                 <VictoryLegend
//                     x={100}
//                     y={250}
//                     orientation={"horizontal"}
//                     gutter={20}
//                     style={{ border: { stroke: "black" } }}
//                     data={[
//                         { name: "Mendix", symbol: { fill: "#0595DB" } },
//                         { name: "Outsystems", symbol: { fill: "#bf2a2a" } }
//                     ]}
//                 />

//                 <VictoryAxis
//                     axisLabelComponent={<VictoryLabel dy={10} />}
//                     tickValues={[1, 2, 3, 4]}
//                     tickFormat={["Q1", "Q2", "Q3", "Q4"]}
//                     label={"Quaters 2019"}
//                 />
//                 <VictoryAxis
//                     dependentAxis
//                     axisLabelComponent={<VictoryLabel dy={-40} />}
//                     label={"Earnings ($)"}
//                     style={{ grid: { stroke: "#818e99", strokeWidth: 1 } }}
//                 />

//                 <VictoryGroup offset={15}>
//                     <VictoryBar
//                         data={data}
//                         x="quarter"
//                         y="earnings"
//                         barWidth={10}
//                         style={{
//                             data: { fill: "#0595DB" }
//                         }}
//                         animate={{
//                             duration: 2000
//                         }}
//                     />

//                     <VictoryBar
//                         data={data.map(datapoint => {
//                             return {
//                                 quarter: datapoint.quarter,
//                                 earnings: datapoint.earnings - 5000
//                             };
//                         })}
//                         x="quarter"
//                         y="earnings"
//                         barWidth={10}
//                         style={{
//                             data: { fill: "#bf2a2a" }
//                         }}
//                         animate={{
//                             duration: 2000
//                         }}
//                     />
//                 </VictoryGroup>
//             </VictoryChart>

//             <VictoryChart width={250} padding={{ left: 90, top: 60, bottom: 120, right: 10 }} domainPadding={20}>
//                 <VictoryAxis
//                     axisLabelComponent={<VictoryLabel dy={10} />}
//                     tickValues={[1, 2, 3, 4]}
//                     tickFormat={["Q1", "Q2", "Q3", "Q4"]}
//                     label={"Quaters 2019"}
//                 />
//                 <VictoryAxis
//                     dependentAxis
//                     axisLabelComponent={<VictoryLabel dy={-40} />}
//                     label={"Earnings ($)"}
//                     style={{ grid: { stroke: "#818e99", strokeWidth: 1 } }}
//                 />

//                 <VictoryGroup offset={15}>
//                     <VictoryBar
//                         data={data}
//                         x="quarter"
//                         y="earnings"
//                         barWidth={10}
//                         style={{
//                             data: { fill: "#0595DB" }
//                         }}
//                         animate={{
//                             duration: 2000
//                         }}
//                     />

//                     <VictoryBar
//                         data={data.map(datapoint => {
//                             return {
//                                 quarter: datapoint.quarter,
//                                 earnings: datapoint.earnings - 5000
//                             };
//                         })}
//                         x="quarter"
//                         y="earnings"
//                         barWidth={10}
//                         style={{
//                             data: { fill: "#bf2a2a" }
//                         }}
//                         animate={{
//                             duration: 2000
//                         }}
//                     />
//                 </VictoryGroup>
//             </VictoryChart> */}

//             {props.data.length === 0 ? null : (
//                 <VictoryChart domainPadding={20}>
//                     {/* <VictoryAxis tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]} /> */}
//                     <VictoryAxis />
//                     <VictoryAxis dependentAxis style={{ grid: { stroke: "#818e99", strokeWidth: 1 } }} />

//                     {/* <VictoryGroup offset={15}> */}
//                     <VictoryBar
//                         data={props.data}
//                         x="x"
//                         y="y"
//                         barWidth={10}
//                         style={{
//                             data: { fill: "#0595DB" }
//                         }}
//                         // animate={{
//                         //     duration: 2000
//                         // }}
//                     />

//                     {/* <VictoryBar
//                         data={data.map(datapoint => {
//                             return {
//                                 quarter: datapoint.quarter,
//                                 earnings: datapoint.earnings - 5000
//                             };
//                         })}
//                         x="quarter"
//                         y="earnings"
//                         barWidth={10}
//                         style={{
//                             data: { fill: "#bf2a2a" }
//                         }}
//                         animate={{
//                             duration: 2000
//                         }}
//                     /> */}
//                     {/* </VictoryGroup> */}
//                 </VictoryChart>
//             )}
//         </View>
//     );
// }
