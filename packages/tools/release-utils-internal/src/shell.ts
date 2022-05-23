import { exec } from "child_process";
import { readdir } from "fs/promises";
import { extname, resolve } from "path";

export function execShellCommand(cmd: string | string[], workingDirectory: string = process.cwd()): Promise<string> {
    const command = Array.isArray(cmd) ? cmd.join(" && ") : cmd;
    return new Promise<string>((resolve, reject) => {
        exec(command, { cwd: workingDirectory }, (error, stdout, stderr) => {
            if (error) {
                console.warn(stderr);
                console.warn(stdout);
                reject(error);
            }
            if (stderr) {
                console.warn(stderr);
            }
            resolve(stdout);
        });
    });
}

export async function zip(src: string, fileName: string): Promise<string> {
    return execShellCommand(`cd "${src}" && zip -r ../${fileName} .`);
}

export async function unzip(src: string, dest: string): Promise<string> {
    return execShellCommand(`unzip "${src}" -d "${dest}"`);
}

export async function getFiles(dir: string, includeExtension: string[] = []): Promise<string[]> {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
        dirents
            .filter(dirent => !dirent.name.startsWith("."))
            .map(dirent => {
                const res = resolve(dir, dirent.name);
                return dirent.isDirectory() ? getFiles(res, includeExtension) : res;
            })
    );

    const f = files.flat();

    if (!includeExtension.length) {
        return f;
    }

    return f.filter(file => extname(file) && includeExtension.includes(extname(file)));
}
