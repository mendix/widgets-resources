import { join } from "path";
import { SvnService } from "./SvnService";
// eslint-disable-next-line no-console
main().catch(console.error);

declare function require(name: string): string;

async function main(): Promise<void> {
    const svnService = new SvnService("username", "password");
    const cwd = process.cwd();

    if (cwd) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const packageContent: any = require(join(cwd, "package.json"));
        const testProjects: any[] = packageContent.config.testProjects;

        if (!testProjects) {
            throw new Error("No TestProjects detected for the widget " + packageContent.widgetName);
        }

        testProjects.forEach(testProject => {
            const testPath = join(cwd, testProject.path);
            // eslint-disable-next-line no-console
            console.log(
                `Checking testProject ${packageContent.config.testProjectId}, branch ${testProject.branch}, revision ${testProject.revision} to ${testPath}`
            );

            svnService.checkOutBranch(
                packageContent.config.testProjectId,
                testProject.branch,
                testPath,
                testProject.revision
            );
        });
    }
}
