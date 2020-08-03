export function translateZoom(level: string): number {
    switch (level) {
        case "world":
            return 1;
        case "continent":
            return 5;
        case "city":
            return 10;
        case "street":
            return 15;
        case "buildings":
            return 20;
    }
    return 1;
}
