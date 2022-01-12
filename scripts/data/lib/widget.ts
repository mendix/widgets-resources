import { basename, extname, join } from "path";
import { Analyzer } from "./analyzer";
import { WidgetXmlParser } from "./widgetXmlParser";
import { firstWithGlob, isEnumValue } from "./util";

enum SupportedPlatform {
    WEB = "web",
    NATIVE = "native",
    BOTH = "both"
}

interface Icons {
    icon: string | undefined;
    iconDark: string | undefined;
    tile: string | undefined;
    tileDark: string | undefined;
}

interface Config {
    editorConfig: string | undefined;
    editorPreview: string | undefined;
}

export class Widget {
    constructor(
        private properties: {
            id: string;
            name: string;
            description: string;
            studioCategory: string;
            studioProCategory: string;
            isPluginWidget: boolean;
            offlineCapable: boolean;
            supportedPlatform: SupportedPlatform;
            config: Config;
            icons: Icons;
        }
    ) {}

    export(analyzer: Analyzer): object {
        const { config, icons, ...other } = this.properties;

        return {
            ...other,
            hasStructurePreview: this.hasStructurePreview(analyzer),
            hasDesignPreview: this.hasDesignPreview(analyzer),
            hasAllTileIcons: this.properties.icons.tile !== undefined && this.properties.icons.tileDark !== undefined,
            hasAllDarkIcons:
                this.properties.icons.iconDark !== undefined && this.properties.icons.tileDark !== undefined
        };
    }

    getConfig() {
        return this.properties.config;
    }

    private hasStructurePreview(analyzer: Analyzer): boolean {
        return this.properties.config.editorConfig
            ? analyzer.moduleExports(this.properties.config.editorConfig, "getPreview")
            : false;
    }

    private hasDesignPreview(analyzer: Analyzer): boolean {
        return this.properties.config.editorPreview
            ? analyzer.moduleExports(this.properties.config.editorPreview, "preview")
            : false;
    }

    static async load(packagePath: string, widgetFileName: string): Promise<Widget> {
        const internalName = basename(widgetFileName, extname(widgetFileName));

        const { supportedPlatform, ...widgetXmlValues } = await WidgetXmlParser.forWidgetXml().extractFromXml(
            join(packagePath, "src", widgetFileName),
            {
                id: xml => xml.widget["@_id"],
                name: xml => xml.widget.name,
                description: xml => xml.widget.description,
                studioCategory: xml => xml.widget.studioCategory,
                studioProCategory: xml => xml.widget.studioProCategory,
                isPluginWidget: xml => xml.widget["@_pluginWidget"] === "true",
                offlineCapable: xml => xml.widget["@_offlineCapable"] === "true",
                supportedPlatform: xml => xml.widget["@_supportedPlatform"]?.toLowerCase() ?? "web"
            }
        );

        if (!isEnumValue(SupportedPlatform, supportedPlatform)) {
            throw new UnsupportedPlatformError(packagePath, supportedPlatform);
        }

        return new Widget({
            ...widgetXmlValues,
            supportedPlatform,
            config: {
                editorConfig: await firstWithGlob(`${packagePath}/src/${internalName}.editorConfig.{js,jsx,ts,tsx}`),
                editorPreview: await firstWithGlob(`${packagePath}/src/${internalName}.editorPreview.{js,jsx,ts,tsx}`)
            },
            icons: {
                icon: await firstWithGlob(`${packagePath}/src/${internalName}.icon.{jpg,jpeg,png}`),
                iconDark: await firstWithGlob(`${packagePath}/src/${internalName}.icon.dark.{jpg,jpeg,png}`),
                tile: await firstWithGlob(`${packagePath}/src/${internalName}.tile.{jpg,jpeg,png}`),
                tileDark: await firstWithGlob(`${packagePath}/src/${internalName}.tile.dark.{jpg,jpeg,png}`)
            }
        });
    }
}

class UnsupportedPlatformError extends Error {
    constructor(packagePath: string, platform: string) {
        super(`Platform ${platform} is not supported, in ${packagePath}`);
        this.name = "UnsupportedPlatformError";
    }
}
