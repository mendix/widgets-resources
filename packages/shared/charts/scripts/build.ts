import sh from "shelljs";
import { green } from "ansi-colors";

async function main(): Promise<void> {
    try {
        sh.config.fatal = true;
        sh.ls("./dist/shared/dev/{plotly,ace,worker-json}.js");
        console.log(green("Found dev artifacts, skipping build"));
    } catch {
        sh.exec("npm run build:externals");
    }
}

main().catch(e => {
    console.error(e);
    process.exit(-1);
});
