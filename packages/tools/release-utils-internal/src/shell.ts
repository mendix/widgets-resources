import execa from "execa";
import { readdir } from "fs/promises";
import { extname, resolve } from "path";

export function exec(command: string, options?: execa.Options): execa.ExecaChildProcess {
    return execa(command, { shell: true, ...options });
}

export async function zip(src: string, fileName: string): Promise<string> {
    const { stdout } = await exec(`cd "${src}" && zip -r ${fileName} .`);
    return stdout.trim();
}

export async function unzip(src: string, dest: string): Promise<string> {
    const { stdout } = await exec(`unzip "${src}" -d "${dest}"`);
    return stdout.trim();
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
