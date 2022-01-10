import { join } from "path";

export class FileReadError extends Error {
    constructor(packagePath: string, filePath: string) {
        super(`Could not read file ${join(packagePath, filePath)}`);
        this.name = "FileReadError";
    }
}

export class XmlValueNotFoundError extends Error {
    constructor(packagePath: string, filePath: string, value: string) {
        super(`Could not find required pattern ${value} in ${join(packagePath, filePath)}`);
        this.name = "PatternNotFoundError";
    }
}

export class UnsupportedPlatformError extends Error {
    constructor(packagePath: string, platform: string) {
        super(`Platform ${platform} is not supported, in ${packagePath}`);
        this.name = "UnsupportedPlatformError";
    }
}
