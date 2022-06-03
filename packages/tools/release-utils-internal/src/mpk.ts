import { basename, join, parse, format } from "path";
import { z } from "zod";
import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { cp, rm, mkdir } from "shelljs";

import { execShellCommand, getFiles, unzip, zip } from "./shell";
import { ModuleInfo } from "./package-info";
import { Version } from "./version";
import { readFile, writeFile } from "fs/promises";
import { execSync } from "child_process";

async function ensureMxBuildDockerImageExists(mendixVersion: Version) {
    const version = mendixVersion.format(true);

    const existingImages = (await execShellCommand(`docker image ls -q mxbuild:${version}`)).toString().trim();
    if (!existingImages) {
        console.log(`Creating new mxbuild:${version} docker image...`);
        const dockerfilePath = join(process.cwd(), "packages/tools/pluggable-widgets-tools/scripts/mxbuild.Dockerfile");
        await execShellCommand(
            `docker build -f ${dockerfilePath} ` +
                `--build-arg MENDIX_VERSION=${version} ` +
                `-t mxbuild:${version} ${process.cwd()}`
        );
    }
}

export async function createModuleMpkInDocker(
    sourceDir: string,
    moduleName: string,
    mendixVersion: Version,
    excludeFilesRegExp: string
): Promise<void> {
    const version = mendixVersion.format(true);
    await ensureMxBuildDockerImageExists(mendixVersion);

    console.log(`Creating module ${moduleName} using mxbuild:${version}...`);
    // Build testProject via mxbuild
    const projectFile = basename((await getFiles(sourceDir, [`.mpr`]))[0]);
    const args = [
        // update widgets
        "mx",
        "update-widgets",
        "--loose-version-check",
        `/source/${projectFile}`,
        "&&",

        // and create module
        "mono",
        "/tmp/mxbuild/modeler/mxutil.exe create-module-package",
        excludeFilesRegExp ? `--exclude-files='${excludeFilesRegExp}'` : "",
        `/source/${projectFile}`,
        moduleName
    ].join(" ");

    await execShellCommand(`docker run -t -v ${sourceDir}:/source --rm mxbuild:${version} bash -c "${args}"`);
    console.log(`Module ${moduleName} created successfully.`);
    if (process.env.CI) {
        console.info("Changing sourceDir ownership...");
        execSync(`sudo chown -R "$(id -u):$(id -g)" ${sourceDir}`, { stdio: "inherit" });
    }
}

export async function createMPK(
    tmpFolder: string,
    moduleInfo: ModuleInfo,
    excludeFilesRegExp: string
): Promise<string> {
    await createModuleMpkInDocker(
        tmpFolder,
        moduleInfo.moduleNameInModeler,
        moduleInfo.minimumMXVersion,
        excludeFilesRegExp
    );
    return (await getFiles(tmpFolder, [`.mpk`]))[0];
}

const EmptyTag = z.literal("");

const FileTag = z.object({
    "@_path": z.string()
});

const FileTagArray = FileTag.array();

type FileTagArray = z.infer<typeof FileTagArray>;

const PackageFiles = z.union([FileTagArray, FileTag, EmptyTag]);

type PackageFiles = z.infer<typeof PackageFiles>;

const ModelerProjectPackageFile = z.object({
    package: z.object({
        modelerProject: z.object({
            files: z.object({
                file: PackageFiles
            })
        })
    })
});

type ModelerProjectPackageFile = z.infer<typeof ModelerProjectPackageFile>;

function joinPackageFiles(files: PackageFiles, items: FileTagArray): PackageFiles {
    if (items.length < 1) {
        return files;
    }

    // return items if files empty
    if (files === "") {
        return [...items];
    }

    if (Array.isArray(files)) {
        return [...files, ...items];
    }

    // at this point we know that files is single object
    return [files, ...items];
}

// We can't use `.parse` method as it drop all properties
// that not included in schema. Instead, we check that
// data shape match our schema and return data back as schema type.
function ensureModlerProjectPackageFile(data): ModelerProjectPackageFile {
    const result = ModelerProjectPackageFile.safeParse(data);

    if (!result.success) {
        throw result.error;
    }

    return data as ModelerProjectPackageFile;
}

export async function addFilesToPackageXml(filePath: string, paths: string[]): Promise<void> {
    const parser = new XMLParser({ ignoreAttributes: false });
    const builder = new XMLBuilder({ ignoreAttributes: false, format: true, suppressEmptyNode: true });
    const source = parse(filePath);
    const backup = { ...source, base: source.base + ".backup" };
    const fileContent = await readFile(filePath);
    const rawData = parser.parse(fileContent);
    const meta = ensureModlerProjectPackageFile(rawData);
    const currentFiles = meta.package.modelerProject.files.file;
    const newFiles = paths.map(path => ({ "@_path": path }));

    meta.package.modelerProject.files.file = joinPackageFiles(currentFiles, newFiles);
    cp("-n", filePath, format(backup));
    await writeFile(filePath, builder.build(meta));
    rm(format(backup));
}

export async function exportModuleWithWidgets(mpk: string, widgets: string[]): Promise<void> {
    const mpkEntry = parse(mpk);
    const target = join(mpkEntry.dir, "tmp");
    const widgetsOut = join(target, "widgets");
    const packageXml = join(target, "package.xml");
    const packageFilePaths = widgets.map(path => `widgets/${parse(path).base}`);
    rm("-rf", target);
    console.info("Unzip module mpk...");
    await unzip(mpk, target);
    mkdir("-p", widgetsOut);
    console.info(`Adding ${widgets.length} widgets to ${mpkEntry.base}...`);
    cp(widgets, widgetsOut);
    console.info(`Adding file entries to package.xml...`);
    await addFilesToPackageXml(packageXml, packageFilePaths);
    rm(mpk);
    console.info("Create module zip archive...");
    await zip(target, mpk);
    rm("-rf", target);
}
