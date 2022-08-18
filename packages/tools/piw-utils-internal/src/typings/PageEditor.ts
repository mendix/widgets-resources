export type Properties = PropertyGroup[];

export type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

export type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[]; // Property needs to remain here for compatibility with Studio Pro < 8.12
};

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

export type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

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
