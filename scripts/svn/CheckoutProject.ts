import { join } from "path";
import { SvnService } from "./SvnService";
import readline from "readline-sync";
import { config } from "dotenv";

main().catch(reason => {
    // eslint-disable-next-line no-console
    console.error(reason);
    process.exit(-1);
});

declare function require(name: string): string;

async function main(): Promise<void> {
    config({ path: "../../.env" });
    const { SPRINTR_USERNAME, SPRINTR_PASSWORD } = process.env;
    let username = SPRINTR_USERNAME;
    let password = SPRINTR_PASSWORD;
    if (!username) {
        username = readline.question("Insert your Sprintr username: ");
    }
    if (!password) {
        password = readline.question("Insert your Sprintr password: ", {
            hideEchoBack: true
        });
    }

    if (!username || !password) {
        process.exit(-1);
    }
    const svnService = new SvnService(username || "", password || "");
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
