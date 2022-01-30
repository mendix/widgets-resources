import { basename, extname, join } from "path";
import { Analyzer } from "../analyzer";
import { XmlExtractor } from "../parsers/XmlExtractor";
import { firstWithGlob, isEnumValue } from "../util";
import { XMLParser } from "fast-xml-parser";
import { z } from "zod";
import { WidgetSchema } from "../../schema";

export enum SupportedPlatform {
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
            docsUrl: string;
            studioCategory: string;
            studioProCategory: string;
            isPluginWidget: boolean;
            offlineCapable: boolean;
            supportedPlatform: SupportedPlatform;
            config: Config;
            icons: Icons;
        }
    ) {}

    export(analyzer: Analyzer): z.infer<typeof WidgetSchema> {
        const { isPluginWidget, config, icons, ...other } = this.properties;

        return {
            ...other,
            requirements: {
                isPluginWidget,
                hasStructureModePreview: this.hasStructureModePreview(analyzer),
                ...(other.supportedPlatform === "web"
                    ? { hasDesignModePreview: this.hasDesignModePreview(analyzer) }
                    : {}),
                hasAllTileIcons:
                    this.properties.icons.tile !== undefined && this.properties.icons.tileDark !== undefined,
                hasAllDarkIcons:
                    this.properties.icons.iconDark !== undefined && this.properties.icons.tileDark !== undefined
            }
        };
    }

    getConfig() {
        return this.properties.config;
    }

    private hasStructureModePreview(analyzer: Analyzer): boolean {
        return this.properties.config.editorConfig
            ? analyzer.moduleExports(this.properties.config.editorConfig, "getPreview")
            : false;
    }

    private hasDesignModePreview(analyzer: Analyzer): boolean {
        return this.properties.config.editorPreview
            ? analyzer.moduleExports(this.properties.config.editorPreview, "preview")
            : false;
    }

    static async load(packagePath: string, widgetFileName: string): Promise<Widget> {
        const internalName = basename(widgetFileName, extname(widgetFileName));

        const { supportedPlatform, ...widgetXmlValues } = await this.widgetXmlExtractor.extract(
            join(packagePath, "src", widgetFileName),
            {
                id: xml => xml.widget["@_id"],
                name: xml => xml.widget.name,
                description: xml => xml.widget.description,
                docsUrl: xml => xml.widget.helpUrl,
                studioCategory: xml => xml.widget.studioCategory,
                studioProCategory: xml => xml.widget.studioProCategory,
                isPluginWidget: xml => xml.widget["@_pluginWidget"] ?? false,
                offlineCapable: xml => xml.widget["@_offlineCapable"] ?? false,
                supportedPlatform: xml => xml.widget["@_supportedPlatform"] ?? "web"
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
                icon: await firstWithGlob(`${packagePath}/src/${internalName}.icon.png`),
                iconDark: await firstWithGlob(`${packagePath}/src/${internalName}.icon.dark.png`),
                tile: await firstWithGlob(`${packagePath}/src/${internalName}.tile.png`),
                tileDark: await firstWithGlob(`${packagePath}/src/${internalName}.tile.dark.png`)
            }
        });
    }

    private static widgetXmlExtractor = new XmlExtractor(
        new XMLParser({
            ignoreAttributes: false
        }),
        z.object({
            widget: z.object({
                "@_id": z.string(),
                name: z.string(),
                description: z.string(),
                helpUrl: z.string().optional(),
                studioCategory: z.string().optional(),
                studioProCategory: z.string().optional(),
                "@_pluginWidget": z
                    .string()
                    .transform(value => value === "true")
                    .optional(),
                "@_offlineCapable": z
                    .string()
                    .transform(value => value === "true")
                    .optional(),
                "@_supportedPlatform": z
                    .string()
                    .transform(value => value.toLowerCase())
                    .optional()
            })
        })
    );
}

class UnsupportedPlatformError extends Error {
    constructor(packagePath: string, platform: string) {
        super(`Platform ${platform} is not supported, in ${packagePath}`);
        this.name = "UnsupportedPlatformError";
    }
}
