import sh from "shelljs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cspFilesDir = join(__dirname, "csp-files");
const themeDir = 'theme/web';
const deploymentPublic = 'deployment/web';

const cspFileNames = [
    "appSetup.js",
    "index.html",
    "unsupported-browser.js"
]

function backupName(name) {
    return `backup.${name}`;
}

function $file(...args) {
    return join(sh.env.MX_PROJECT_PATH, ...args);
}

function boilerplate() {
    return cspFileNames.map(name => ({
        fileAbs: $file(themeDir, name),
        backupAbs: $file(themeDir, backupName(name)),
        name: name
    }));
}

function getIndexPath() {
    return $file(themeDir, "index.html");
}

function silent(operation) {
    const silent = sh.config.silent;
    sh.config.silent = true;
    operation();
    sh.config.silent = silent;
}

function done() {
    console.info("Done.", "\n");
}

function copy() {
    console.info("Copying CSP boilerplate to theme directory...");
    sh.cp(join(cspFilesDir, "*"), $file(themeDir));
}

function backup() {
    for (const { fileAbs, backupAbs, name: basename } of boilerplate()) {
        if (sh.test("-f", fileAbs)) {
            console.info("Making backup of", basename);
            sh.mv(fileAbs, backupAbs);
        }
    }
}

function restore() {
    for (const { fileAbs, backupAbs, name: basename } of boilerplate()) {
        if (sh.test("-f", backupAbs)) {
            console.info("Making restore from backup", basename);
            sh.mv(backupAbs, fileAbs);
        }
    }
}

function cleanup() {
    console.info("Removing CSP boilerplate from theme...");
    const files = boilerplate().map(({ fileAbs }) => fileAbs);
    silent(() => sh.rm(files));

    console.log("Removing CSP boilerplate from deployment...");
    silent(() => sh.rm(cspFileNames.map(file => $file(deploymentPublic, file))))
}

function isEnabled() {
    const index = getIndexPath();
    const tag = `http-equiv="Content-Security-Policy" content="default-src 'self';"`;
    return sh.test("-f", index) && sh.grep("-l", tag, index).length > 1;
}

function enable() {
    console.info("Enabling CSP...");
    sh.cd(sh.env.MX_PROJECT_PATH);
    if (isEnabled()) {
        console.info("CSP already enabled in target project.");
    } else {
        backup();
        copy();
        console.info("Important: please, restart your project in studio (Rerun locally)")
    }

    done();
}

function disable() {
    console.info("Disabling CSP...");
    sh.cd(sh.env.MX_PROJECT_PATH);
    cleanup();
    restore();
    console.info("Important: please, stop and run again your project in studio")
    done();
}

async function main() {
    console.info("Toggle CSP", "\n");

    if (sh.test("-f", ".env")) {
        console.info(".env file is found, loading vars...");
        dotenv.config({ path: join(process.cwd(), ".env") });
    }

    if (!sh.env.MX_PROJECT_PATH) {
        throw new Error("MX_PROJECT_PATH is missing. Please set it before running this command.");
    }

    if (!sh.test("-d", sh.env.MX_PROJECT_PATH)) {
        throw new Error(
            `path provided in MX_PROJECT_PATH is not pointing to the directory. Current value: ${sh.env.MX_PROJECT_PATH}`
        );
    }

    console.info("Your target project is:");
    console.info(sh.env.MX_PROJECT_PATH, "\n");

    const command = process.argv[2];

    if (command === "enable") enable();
    else if (command === "disable") disable();
    else {
        console.error("Error: unknown command:", command);
        console.info('Usage: csp <enable|disable>');
        process.exit(1);
    };
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
