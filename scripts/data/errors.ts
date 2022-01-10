export class UnsupportedPlatformError extends Error {
    constructor(packagePath: string, platform: string) {
        super(`Platform ${platform} is not supported, in ${packagePath}`);
        this.name = "UnsupportedPlatformError";
    }
}
