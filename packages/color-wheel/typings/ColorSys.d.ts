declare module "colorsys" {
    interface HSV {
        h: number;
        s: number;
        v: number;
    }

    const colorsys: {
        hsvToHex(hsv: HSV): string;
    };

    export default colorsys;
}
