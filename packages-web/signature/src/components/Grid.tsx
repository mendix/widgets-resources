import * as React from "react";

interface GridBackgroundProps {
    gridCellWidth: number;
    gridCellHeight: number;
    gridBorderColor: string;
    gridBorderWidth: number;
}

export default class Grid extends React.Component<GridBackgroundProps> {
    render() {
        const { gridCellWidth, gridCellHeight, gridBorderColor, gridBorderWidth } = this.props;
        const id = `grid${Math.floor(Math.random() * 1000000)}`;
        return <svg className="widget-signature-grid" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id={id} width={gridCellWidth} height={gridCellHeight} patternUnits="userSpaceOnUse">
                    <line x1="0" y1={gridCellHeight} x2={gridCellWidth} y2={gridCellHeight} stroke={gridBorderColor} stroke-width={gridBorderWidth}/>
                    <line x1={gridCellWidth} y1="0" x2={gridCellWidth} y2={gridCellHeight} stroke={gridBorderColor} stroke-width={gridBorderWidth}/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>;
    }
}
