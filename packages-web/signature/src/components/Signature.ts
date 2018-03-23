import { Component, createElement } from "react";
import { Alert } from "./Alert";

import { Bezier } from "./bezier";
import { Point } from "./point";
import { Canvas } from "./canvas";
import "../ui/Signature.scss";

export interface SignatureProps {
    alertMessage?: string;
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
    imageUrl?: string;
    onClickAction(imageUrl?: string): void;
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
        this.resetCanvas = this.resetCanvas.bind(this);
        this.beginCurve = this.beginCurve.bind(this);
        this.updateCurve = this.updateCurve.bind(this);
        this.endCurve = this.endCurve.bind(this);

    }

    render() {
        return createElement("div", {
            className: "widget-Signature signature-unset"
        },
            createElement(Canvas, {
                gridx: this.props.gridx,
                gridy: this.props.gridy,
                height: this.props.height,
                getItemNode: this.getCanvasRef,
                gridBorder: this.props.gridBorder,
                width: this.props.width
            }),
            createElement("button", {
                className: "btn btn-default",
                onClick: this.resetCanvas
            }, "Reset"),
            createElement("button", {
                className: "btn btn-primary",
                onClick: () => this.props.onClickAction(this.canvas.toDataURL()),
                style: { visibility: this.state.isset ? "visible" : "hidden" }
            }, "Save"),
            createElement(Alert, { message: this.props.alertMessage || "", bootstrapStyle: "danger" })
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

    private resetCanvas() {
        this.setState({ isset: false });
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        context.clearRect(0, 0, this.props.width, this.props.height);
        this.drawGrid();
    }

    private drawGrid() {
        const { width, height, showGrid, gridColor, gridx, gridy } = this.props;
        if (!showGrid) return;

        let x = gridx;
        let y = gridy;
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        context.beginPath();

        for (; x < width; x += gridx) {
            context.moveTo(x, 0);
            context.lineTo(x, height);
        }

        for (; y < height; y += gridy) {
            context.moveTo(0, y);
            context.lineTo(width, y);
        }

        context.lineWidth = 1;
        context.strokeStyle = gridColor;
        context.stroke();
    }

    private beginCurve(e: PointerEvent) {
        e.preventDefault();
        const context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        context.fillStyle = this.props.penColor;
        context.lineWidth = this.dotSize();
        context.lineJoin = "round";
        context.beginPath();

        this.points = [];
        this.lastVelocity = 0;
        this.lastWidth = (parseFloat(this.props.minWidth) + parseFloat(this.props.maxWidth) / 2);
        this.drawPoint(e.x, e.y, this.dotSize());
        this.canvas.addEventListener("pointermove", this.updateCurve);
        document.addEventListener("pointerup", this.endCurve);
    }

    private dotSize() {
        return (parseFloat(this.props.minWidth) + parseFloat(this.props.maxWidth) / 2);
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
        const minWidth = parseFloat(this.props.minWidth);
        const maxWidth = parseFloat(this.props.maxWidth);
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
        this.setState({ isset: true });
    }
}
