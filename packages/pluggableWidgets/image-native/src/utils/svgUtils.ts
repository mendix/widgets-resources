import { ensure } from "@mendix/pluggable-widgets-tools";

interface Size {
    width: number;
    height: number;
}
interface Position {
    x: number;
    y: number;
}

interface Attributes {
    width?: number;
    height?: number;
    viewbox?: Size;
}

const extractorRegExps = {
    height: /\sheight=(['"])([^%]+?)\1/,
    root: /<svg\s([^>"']|"[^"]*"|'[^']*')*>/,
    viewbox: /\sviewBox=(['"])(.+?)\1/,
    width: /\swidth=(['"])([^%]+?)\1/
};

const INCH_CM = 2.54;
const units: { [unit: string]: number } = {
    cm: 96 / INCH_CM,
    em: 16,
    ex: 8,
    m: (96 / INCH_CM) * 100,
    mm: 96 / INCH_CM / 10,
    pc: 96 / 72 / 12,
    pt: 96 / 72
};

function parseLength(len: string) {
    const m = /(-?[0-9.]+)([a-z]*)/.exec(len);
    if (!m || !m[1]) {
        return undefined;
    }
    const unitRate = (m[2] ? units[m[2]] : undefined) ?? 1;
    return Math.round(parseFloat(m[1]) * unitRate);
}

function parseViewbox(viewbox: string): Size {
    const bounds = viewbox.split(" ");
    return {
        width: parseLength(ensure(bounds[2]))!,
        height: parseLength(ensure(bounds[3]))!
    };
}

export function getPositionFromSVG(xml: string): Position {
    const root = extractorRegExps.root.exec(xml);
    const viewbox = extractorRegExps.viewbox.exec(root?.[0] as string);
    if (!viewbox?.[2]) {
        return { x: 0, y: 0 };
    }
    const bounds = viewbox[2].split(" ");
    return {
        x: parseLength(ensure(bounds[0]))!,
        y: parseLength(ensure(bounds[1]))!
    };
}

function parseAttributes(root: string): Attributes {
    const width = extractorRegExps.width.exec(root);
    const height = extractorRegExps.height.exec(root);
    const viewbox = extractorRegExps.viewbox.exec(root);
    return {
        height: height?.[2] ? parseLength(height[2]) : undefined,
        width: width?.[2] ? parseLength(width[2]) : undefined,
        viewbox: viewbox?.[2] ? parseViewbox(viewbox[2]) : undefined
    };
}
function calculateByViewbox(attrs: Attributes, viewbox: Size): Size {
    const ratio = viewbox.width / viewbox.height;
    if (attrs.width) {
        return {
            height: Math.floor(attrs.width / ratio),
            width: attrs.width
        };
    }
    if (attrs.height) {
        return {
            height: attrs.height,
            width: Math.floor(attrs.height * ratio)
        };
    }
    return {
        height: viewbox.height,
        width: viewbox.width
    };
}

export function calculateSvgDimensions(xml: string): Size {
    const root = extractorRegExps.root.exec(xml);

    if (root?.[0]) {
        const attrs = parseAttributes(root[0]);
        if (attrs.width && attrs.height) {
            return {
                width: attrs.width,
                height: attrs.height
            };
        }
        if (attrs.viewbox) {
            return calculateByViewbox(attrs, attrs.viewbox);
        }
    }
    return { width: 0, height: 0 };
}
