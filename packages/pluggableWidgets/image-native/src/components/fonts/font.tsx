import { createIconSet } from "react-native-vector-icons";
import { ensure } from "@mendix/pluggable-widgets-tools";
import { glyphMap } from "./Halflings";

export const GlyphIcon = createIconSet(glyphMap, "GLYPHICONS Halflings", "glyphicons-halflings-regular.ttf");

interface Icon {
    uri: string;
    scale: number;
}

interface ImageSourcesCache {
    [iconClassName: string]: Icon;
}

export const getIcon = (iconName: string): Promise<Icon> => GlyphIcon.getImageSource(iconName, 20, "black");

export const preloadIcons = (iconNames: string[]): Promise<ImageSourcesCache> =>
    Promise.all(iconNames.map(iconName => getIcon(iconName))).then(imageSources =>
        iconNames.reduce(buildImageCache(imageSources), {})
    );

const buildImageCache = (imageSources: Icon[]) => (
    imageSourcesCache: ImageSourcesCache,
    iconName: string,
    index: number
) => {
    imageSourcesCache[iconName] = ensure(imageSources[index]);
    return imageSourcesCache;
};
