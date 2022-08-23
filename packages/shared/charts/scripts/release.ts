import sh from "shelljs";
import { green } from "ansi-colors";

async function main(): Promise<void> {
    try {
        sh.config.fatal = true;
        sh.ls("./dist/shared/prod/{plotly,ace,worker-json}.js");
        console.log(green("Found prod artifacts, skipping build"));
    } catch {
        sh.exec("npm run release:externals");
    }
}

main().catch(e => {
    console.error(e);
    process.exit(-1);
});
