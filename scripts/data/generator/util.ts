import { promises as fs } from "fs";
import { dirname } from "path";
import { glob } from "glob";

export async function writeFile(path: string, content: string): Promise<void> {
    const dir = dirname(path);
    try {
        await fs.access(dir);
    } catch (_) {
        await fs.mkdir(dir, { recursive: true });
    }
    await fs.writeFile(path, content, { flag: "w+" });
}

export function isDefined<T>(val: T | undefined | null): val is T {
    return val !== undefined && val !== null;
}

export function isEnumValue<T>(e: T, token: unknown): token is T[keyof T] {
    const keys = Object.keys(e).filter(k => !/^\d/.test(k));
    const values = keys.map(k => (e as any)[k]);
    return values.includes(token);
}

export async function withGlob<T>(pattern: string, cb: (matches: string[]) => T | Promise<T>): Promise<T> {
    return new Promise((resolve, reject) =>
        glob(pattern, (error, matches) => {
            error ? reject(error) : resolve(cb(matches));
        })
    );
}

export async function firstWithGlob(pattern: string): Promise<string | undefined> {
    return await withGlob(pattern, matches => matches[0]);
}

export async function readFile(path: string): Promise<string> {
    const fileBuffer = await fs.readFile(path);
    return fileBuffer.toString();
}
