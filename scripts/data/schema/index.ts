import { z } from "zod";
import { SupportedPlatform } from "../supportedPlatform";

export const IconSchema = z.object({
    name: z.string(),
    image: z.string()
});

export const IconsSchema = z.object({
    icon: IconSchema.optional(),
    iconDark: IconSchema.optional(),
    tile: IconSchema.optional(),
    tileDark: IconSchema.optional()
});

export const WidgetRequirementsSchema = z.object({
    isPluginWidget: z.boolean(),
    hasStructureModePreview: z.boolean(),
    hasDesignModePreview: z.boolean().optional(),
    hasAllTileIcons: z.boolean(),
    hasAllDarkIcons: z.boolean()
});

export const ContentSchema = z.object({
    id: z.string(),
    name: z.string()
});

export const WidgetSchema = ContentSchema.extend({
    description: z.string(),
    docsUrl: z.string().optional(),
    studioCategory: z.string().optional(),
    studioProCategory: z.string().optional(),
    supportedPlatform: z.nativeEnum(SupportedPlatform),
    offlineCapable: z.boolean(),
    requirements: WidgetRequirementsSchema,
    icons: IconsSchema
});

export const JSActionSchema = ContentSchema.extend({
    group: z.string()
});

export const ContentPackageSchema = z.object({
    name: z.string(),
    version: z.string()
});

export const WidgetPackageSchema = ContentPackageSchema.extend({
    items: z.array(WidgetSchema)
});

export const JSActionPackageSchema = ContentPackageSchema.extend({
    items: z.array(JSActionSchema)
});

export const OutputSchema = z.object({
    widgetPackages: z.array(WidgetPackageSchema),
    jsActionPackages: z.array(JSActionPackageSchema)
});
