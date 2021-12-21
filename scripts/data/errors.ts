import { join } from "path";

export class FileReadError extends Error {
    constructor(packagePath: string, filePath: string) {
        super(`Could not read file ${join(packagePath, filePath)}`);
        this.name = "FileReadError";
    }
}

export class PatternNotFoundError extends Error {
    constructor(packagePath: string, filePath: string, value: string) {
        super(`Could not find required pattern ${value} in ${join(packagePath, filePath)}`);
        this.name = "ValueNotFoundError";
    }
}
