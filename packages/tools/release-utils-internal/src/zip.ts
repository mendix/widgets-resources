import sh from "./sh";

export function zip(src: string, fileName: string): void {
    sh.exec(`cd "${src}" && zip -r ${fileName} .`);
}

export function unzip(src: string, dest: string): void {
    sh.exec(`unzip "${src}" -d "${dest}"`);
}
