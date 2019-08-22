declare module "zip-folder" {
    export default function zipFolder(srcFolder: string, zipFilePath: string, callback: (err: string) => void): void;
}
