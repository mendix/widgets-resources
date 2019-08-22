declare module "node-svn-ultimate" {
    interface OptionsParams {
        trustServerCert?: boolean;
        username?: string;
        password?: string;
        shell?: string;
        cwd?: any;
        quiet?: boolean;
        force?: boolean;
        revision?: number;
        depth?: string;
        ignoreExternals?: boolean;
        params?: string[];
    }

    export namespace commands {
        /**
         * Checks out a repository to a working copy
         * @param branchUrl - Repository URL
         * @param destination - Working copy dir
         * @param options - Options object
         * @param callback - Complete callback
         */
        export function checkout(
            branchUrl: string,
            destination: string,
            options: OptionsParams,
            callback: (error: Error) => void
        ): void;

        /**
         * Performs an svn cleanup operation on the working copy
         * @param workingCopy - Working copy directory to clean
         * @param options - Options object
         * @param callback - Complete callback
         */
        export function cleanup(workingCopy: string, options: OptionsParams, callback: (error: Error) => void): void;

        /**
         * Performs an svn status command on a working copy
         * @param workingCopy - Working copy target
         * @param options - Options object
         * @param callback - Complete callback
         */
        export function status(
            workingCopy: string,
            options: OptionsParams,
            callback: (error: Error, data: any) => void
        ): void;

        /**
         * Commits a working copy to a repository
         * @param files - Array of files / folders to commit
         * @param options - Options object
         * @param callback - Complete callback
         */
        export function commit(
            files: string | string[],
            options: OptionsParams,
            callback: (error: Error) => void
        ): void;

        /**
         * Copies a file / folder within either a working copy or a URL
         * @param source - URLs / files to copy
         * @param destination - destination URL
         * @param options - Options object
         * @param callback - Complete callback
         */
        export function copy(
            source: string | string[],
            destination: string,
            options: OptionsParams,
            callback: (error: Error) => void
        ): void;
    }
    export namespace utils {
        export function getRevision(target: string, options?: OptionsParams, callback?: () => void): void;
        export function getWorkingCopyRevision(wcDir: string, options?: OptionsParams, callback?: () => void): void;
        export function parseUrl(url: string): any;
        export function getTags(url: string, options?: OptionsParams, callback?: () => void): void;
        export function getLatestTag(url: string, options: OptionsParams, callback?: () => void): void;
    }
}
