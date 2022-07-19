/**
 * Structure preview typings
 */

type BaseProps = {
    type: string;
    grow?: number;
};

export type StructurePreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps;

export type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image. Will only be read if no svg image is passed
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

export type ContainerProps = BaseProps & {
    type: "Container";
    children?: StructurePreviewProps[];
    borders?: boolean;
    borderRadius?: number;
    borderWidth?: number;
    backgroundColor?: string;
    padding?: number;
};

export type RowLayoutProps = BaseProps & {
    type: "RowLayout";
    children: StructurePreviewProps[];
    borders?: boolean;
    borderRadius?: number;
    borderWidth?: number;
    columnSize?: "fixed" | "grow";
    backgroundColor?: string;
    padding?: number;
};

export type TextProps = BaseProps & {
    type: "Text";
    content: string;
    fontSize?: number;
    fontColor?: string;
    bold?: boolean;
    italic?: boolean;
};

export type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object;
    placeholder?: string;
};

export type SelectableProps = BaseProps & {
    object: object;
    child: StructurePreviewProps;
};
