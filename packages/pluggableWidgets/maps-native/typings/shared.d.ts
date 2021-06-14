
export interface ModeledMarker {
    address?: string;
    latitude?: number;
    longitude?: number;
    title?: string;
    description?: string;
    onClick?: ActionValue;
    icon?: NativeIcon | GlyphIcon;
    iconSize?: number;
    iconColor?: string;
}

export interface Marker {
    latitude: number;
    longitude: number;
    url: string;
    onClick?: ActionValue;
    title?: string;
}
