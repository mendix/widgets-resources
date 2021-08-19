export function getWidth(widthUnit: "pixels" | "percentage", width: number): string {
    return `${width}${widthUnit === "pixels" ? "px" : "vw"}`;
}
