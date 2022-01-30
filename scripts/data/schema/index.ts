import { z } from "zod";
import { SupportedPlatform } from "../generator/model/widget";

export const WidgetSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    docsUrl: z.string().optional(),
    supportedPlatform: z.nativeEnum(SupportedPlatform),
    offlineCapable: z.boolean(),
    studioCategory: z.string().optional(),
    studioProCategory: z.string().optional(),
    requirements: z.object({
        isPluginWidget: z.boolean(),
        hasStructureModePreview: z.boolean(),
        hasDesignModePreview: z.boolean().optional(),
        hasAllTileIcons: z.boolean(),
        hasAllDarkIcons: z.boolean()
    })
});

export const WidgetPackageSchema = z.object({
    name: z.string(),
    version: z.string(),
    widgets: z.array(WidgetSchema)
});

export const JSActionSchema = z.object({
    name: z.string(),
    group: z.string()
});

export const JSActionPackageSchema = z.object({
    name: z.string(),
    version: z.string(),
    jsActions: z.array(JSActionSchema)
});

export const OutputSchema = z.object({
    widgetPackages: z.array(WidgetPackageSchema),
    jsActionPackages: z.array(JSActionPackageSchema)
});
