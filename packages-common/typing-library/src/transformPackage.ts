import { promises } from "fs";
import { join } from "path";
import { promisify } from "util";
import { parseString } from "xml2js";
import replaceExt from "replace-ext";
import { PackageContent } from "./PackageContent";
import { WidgetXML } from "./WidgetXML";
import { transformJsonContent } from "./functions";

const { mkdir, readFile, stat, writeFile } = promises;
const parseStringAsync = promisify(parseString);

export async function transformPackage(content: string, basePath: string) {
    const contentXml = (await parseStringAsync(content)) as PackageContent;
    if (!contentXml) {
        throw new Error("Empty XML, please check your src folder for file package.xml");
    }

    const resultBasePath = join(basePath, "../typings/");
    try {
        await stat(resultBasePath);
    } catch {
        await mkdir(resultBasePath);
    }

    const widgetFileXmls = contentXml.package.clientModule[0].widgetFiles
        .map((wf) => wf.widgetFile)
        .reduce((a, e) => a.concat(e), [])
        .filter((wfXml) => wfXml.$.path);

    for (const widgetFileXml of widgetFileXmls) {
        const sourcePath = widgetFileXml.$.path;

        let source = await readFile(join(basePath, sourcePath), "utf-8");
        let sourceXml;
        try {
            sourceXml = (await parseStringAsync(source)) as WidgetXML;
        } catch (err) {
            throw new Error(
                `Incorrect widget xml file ${sourcePath}, please check Mendix Documentation: ${err.message}`
            );
        }

        const generatedContent = transformJsonContent(sourceXml, toWidgetName(sourcePath));

        const resultPath = replaceExt(sourcePath, "Props.d.ts");
        await writeFile(join(resultBasePath, resultPath), generatedContent);
    }
}

function toWidgetName(file: string) {
    file = file.replace(".xml", "");
    const parts = file.split("/");
    return parts.length > 0 ? parts[parts.length - 1] : "";
}
