declare module "mendix/components/Icon" {
    import { ImageURISource } from "react-native";

    export type Option<T> = T | undefined;

    interface GlyphIcon {
        type: "glyph";
        iconClass: string;
    }
    interface WebImageIcon {
        type: "image";
        iconUrl: string;
    }
    interface NativeImageIcon {
        type: "image";
        iconUrl: ImageURISource;
    }

    export type WebIcon = GlyphIcon | WebImageIcon | undefined;
    export type NativeIcon = GlyphIcon | NativeImageIcon | undefined;
    export type WebImage = Option<{
        uri: string;
        altText?: string;
    }>;
    export type NativeImage = Option<ImageURISource>;
    type WebImageValue = WebImage | WebIcon;
    type NativeImageValue = NativeImage | NativeIcon;
    export type ImageValue = WebImageValue | NativeImageValue;
    export {};

    export interface IconStyle {
        size: number;
        color: string;
    }
    export interface Props {
        name?: string;
        size?: number;
        icon?: NativeIcon;
        color?: string;
    }
    export const Icon: (props: Props) => JSX.Element;
}
