import { Component, createElement } from "react";
import * as classNames from "classnames";
import { Bezier } from "./bezier";
import { Point } from "./point";
import { Canvas } from "./canvas";
import { Image } from "./image";
import "../ui/Signature.scss";

export interface SignatureProps {
    height?: number;
    width?: number;
    gridx?: number;
    gridy?: number;
    gridColor?: string;
    gridBorder?: number;
    penColor?: string;
    maxWidth?: string;
    minWidth?: string;
    velocityFilterWeight?: string;
    showGrid?: boolean;
    dataUrl?: string;
}
export interface Signaturestate {
    isset: boolean;
}

export class SignatureCanvas extends Component<SignatureProps, Signaturestate> {
    private canvas: HTMLCanvasElement;
    private points: Point[] = [];
    private lastWidth: number;
    private lastVelocity: number;

    constructor(props: SignatureProps) {
        super(props);

        this.state = {
            isset: false
        };

        this.getCanvasRef = this.getCanvasRef.bind(this);
        this.eventResetClicked = this.eventResetClicked.bind(this);
        this.beginCurve = this.beginCurve.bind(this);
        this.updateCurve = this.updateCurve.bind(this);
        this.endCurve = this.endCurve.bind(this);

    }

    render() {
        return createElement("div", {
            className: this.state.isset ? "widget-Signature signature-set" : "widget-Signature signature-unset"
        },
            createElement(Canvas, {
                gridx: this.props.gridx,
                gridy: this.props.gridy,
                height: this.props.height,
                getItemNode: this.getCanvasRef,
                gridBorder: this.props.gridBorder,
                width: this.props.width
            }),
            createElement(Image, {
                height: this.props.height,
                gridBorder: this.props.gridBorder,
                width: this.props.width,
                url: this.props.dataUrl
            }),
            createElement("button", {
                className: "btn",
                onClick: this.eventResetClicked,
                style: { width: this.props.width }
            }, "Reset")
        );
    }

    componentDidMount() {
        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.resetCanvas();
        this.canvas.addEventListener("pointerdown", this.beginCurve);
    }

    private getCanvasRef(node: HTMLCanvasElement) {
        this.canvas = node;
    }

    private eventResetClicked() {
        this.resetCanvas();
        this.setState({ isset: false });
    }

    private resetCanvas() {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        context.clearRect(0, 0, this.props.width as number, this.props.height as number);
        this.drawGrid();
    }

    private drawGrid() {
        if (!this.props.showGrid) return;
        let x = this.props.gridx as number;
        let y = this.props.gridy as number;
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        const width = this.props.width as number;
        const height = this.props.height as number;

        context.beginPath();

        for (; x < width; x += this.props.gridx as number) {
            context.moveTo(x, 0);
            context.lineTo(x, this.props.height as number);
        }

        for (; y < height; y += this.props.gridy as number) {
            context.moveTo(0, y);
            context.lineTo(this.props.width as number, y);
        }

        context.lineWidth = 1;
        context.strokeStyle = this.props.gridColor as string;
        context.stroke();
    }

    private beginCurve(e: PointerEvent) {
        e.preventDefault();
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        context.fillStyle = this.props.penColor as string;
        context.lineWidth = this.dotSize();
        context.lineJoin = "round";
        context.beginPath();

        this.points = [];
        this.lastVelocity = 0;
        this.lastWidth = (parseFloat(this.props.minWidth as string) + parseFloat(this.props.maxWidth as string) / 2);
        this.drawPoint(e.x, e.y, this.dotSize());
        this.canvas.addEventListener("pointermove", this.updateCurve);
        document.addEventListener("pointerup", this.endCurve);
    }

    private dotSize() {
        return (parseFloat(this.props.minWidth as string) + parseFloat(this.props.maxWidth as string) / 2);
    }

    private createPoint(event: PointerEvent) {
        const rect = this.canvas.getBoundingClientRect();
        return new Point(
            event.pageX - rect.left,
            event.pageY - rect.top
        );
    }

    private updateCurve(e: PointerEvent) {
        e.preventDefault();
        const point = this.createPoint(e);
        this.addPoint(point);
    }

    private addPoint(point: Point) {
        const points = this.points;
        let c2;
        let c3;
        let curve;
        let tmp;

        points.push(point);

        if (points.length > 2) {

            if (points.length === 3) points.unshift(points[0]);

            tmp = this.calculateCurveControlPoints(points[0], points[1], points[2]);
            c2 = tmp.c2;
            tmp = this.calculateCurveControlPoints(points[1], points[2], points[3]);
            c3 = tmp.c1;
            curve = new Bezier(points[1], c2, c3, points[2]);
            this.addCurve(curve);

            points.shift();
        }
    }

    private addCurve(curve: Bezier) {
        const startPoint = curve.startPoint;
        const endPoint = curve.endPoint;
        const velocityFilterWeight = parseFloat(this.props.velocityFilterWeight as string);
        let velocity;
        let newWidth;

        velocity = velocityFilterWeight * endPoint.velocityFrom(startPoint)
            + (1 - velocityFilterWeight) * this.lastVelocity;

        newWidth = this.strokeWidth(velocity);
        this.drawCurve(curve, this.lastWidth, newWidth);

        this.lastVelocity = velocity;
        this.lastWidth = newWidth;
    }

    private drawCurve(curve: Bezier, startWidth: number, endWidth: number) {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        const widthDelta = endWidth - startWidth;
        let drawSteps;
        let width;
        let i;
        let t;
        let tt;
        let ttt;
        let u;
        let uu;
        let uuu;
        let x;
        let y;

        drawSteps = Math.floor(curve.length());
        context.beginPath();
        for (i = 0; i < drawSteps; i++) {
            // Calculate the Bezier (x, y) coordinate for this step.
            t = i / drawSteps;
            tt = t * t;
            ttt = tt * t;
            u = 1 - t;
            uu = u * u;
            uuu = uu * u;

            x = uuu * curve.startPoint.x;
            x += 3 * uu * t * curve.control1.x;
            x += 3 * u * tt * curve.control2.x;
            x += ttt * curve.endPoint.x;

            y = uuu * curve.startPoint.y;
            y += 3 * uu * t * curve.control1.y;
            y += 3 * u * tt * curve.control2.y;
            y += ttt * curve.endPoint.y;

            width = startWidth + ttt * widthDelta;
            this.drawPoint(x, y, width);
        }
        context.fill();
    }

    private drawPoint(x: number, y: number, size: number) {
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        context.arc(x, y, size, 0, 2 * Math.PI, false);
    }

    private strokeWidth(velocity: number) {
        const minWidth = parseFloat(this.props.minWidth as string);
        const maxWidth = parseFloat(this.props.maxWidth as string);
        return Math.max(maxWidth / (velocity + 1), minWidth);
    }

    private calculateCurveControlPoints(s1: Point, s2: Point, s3: Point) {
        const dx1 = s1.x - s2.x;
        const dy1 = s1.y - s2.y;
        const dx2 = s2.x - s3.x;
        const dy2 = s2.y - s3.y;

        const m1 = { x: (s1.x + s2.x) / 2.0, y: (s1.y + s2.y) / 2.0 };
        const m2 = { x: (s2.x + s3.x) / 2.0, y: (s2.y + s3.y) / 2.0 };

        const l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        const l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        const dxm = (m1.x - m2.x);
        const dym = (m1.y - m2.y);

        const k = l2 / (l1 + l2);
        const cm = { x: m2.x + dxm * k, y: m2.y + dym * k };

        const tx = s2.x - cm.x;
        const ty = s2.y - cm.y;

        return {
            c1: new Point(m1.x + tx, m1.y + ty),
            c2: new Point(m2.x + tx, m2.y + ty)
        };
    }

    private endCurve(e: PointerEvent) {
        e.preventDefault();

        this.canvas.removeEventListener("pointermove", this.updateCurve);
        document.removeEventListener("pointerup", this.endCurve);
        setTimeout(this.setState({ isset: true }), 1000);
    }

}
