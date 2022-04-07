import sh from "shelljs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cspFilesDir = join(__dirname, "csp-files");
const themeDir = 'theme/web';

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
    return cspFileNames.map(
        name => [
            $file(themeDir, name),
            $file(themeDir, backupName(name)),
            name
        ]
    )
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
    console.info("Copying CSP boilerplate...");
    sh.cp(join(cspFilesDir, "*"), $file(themeDir));
}

function backup() {
    for (const [filePath, backupPath, basename] of boilerplate()) {
        if (sh.test("-f", filePath)) {
            console.info("Making backup of", basename);
            sh.mv(filePath, backupPath);
        }
    }
}

function restore() {
    for (const [filePath, backupPath, basename] of boilerplate()) {
        if (sh.test("-f", backupPath)) {
            console.info("Making restore from backup", basename);
            sh.mv(backupPath, filePath);
        }
    }
}

function cleanup() {
    const files = boilerplate().map(([file]) => file);
    console.info("Removing CSP boilerplate...");

    silent(() => sh.rm(files));
}

function isEnabled() {
    const index = getIndexPath();
    const tag = `<meta http-equiv="Content-Security-Policy" content="default-src 'self';">`;
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
    }
    done();
}

function disable() {
    console.info("Disabling CSP...");
    sh.cd(sh.env.MX_PROJECT_PATH);
    cleanup();
    restore();
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
        console.info('Usage: csp <enable|disable>')
        throw new Error(`Unknown command: ${command}`)
    };
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
