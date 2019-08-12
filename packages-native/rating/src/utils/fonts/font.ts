import { createIconSet } from "react-native-vector-icons";
import { glyphMap } from "./Halflings";

export const GlyphIcon = createIconSet(glyphMap, "GLYPHICONS Halflings", "glyphicons-halflings-regular.ttf");

export interface Icon {
    uri: string;
    scale: number;
}

export interface ImageSourcesCache {
    [iconClassName: string]: Icon;
}

export const getIcon = async (iconName: string, size: number, color: string): Promise<Icon> =>
    GlyphIcon.getImageSource(iconName, size, color);

export interface IconConfiguration {
    name: string;
    size: number;
    color: string;
}

export const preloadIcons = async (icons: IconConfiguration[]): Promise<ImageSourcesCache> =>
    Promise.all(icons.map(icon => getIcon(icon.name, icon.size, icon.color))).then(imageSources =>
        icons.reduce(buildImageCache(imageSources), {})
    );

const buildImageCache: Function = (imageSources: Icon[]) => (
    imageSourcesCache: ImageSourcesCache,
    iconConfiguration: IconConfiguration,
    index: number
): ImageSourcesCache => {
    imageSourcesCache[iconConfiguration.name] = imageSources[index];
    return imageSourcesCache;
};
