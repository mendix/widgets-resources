import sh from "shelljs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const log = {
    info: (...args) => console.info(...args),
    error: (...args) => {
        console.error("Ooops! We have a problem:", ...args);
    }
};
const __dirname = dirname(fileURLToPath(import.meta.url));
const cspFilesDir = join(__dirname, "csp-files");

function $file(p) {
    return join(sh.env.MX_PROJECT_PATH, p);
}

function silent(operation) {
    const silent = sh.config.silent;
    sh.config.silent = true;
    operation();
    sh.config.silent = silent;
}

function themeWebListing() {
    const dir = $file("theme/web");
    log.info(dir, "contnet:");
    log.info(sh.ls(dir).stdout);
}

function done() {
    log.info("Done.", "\n");
    themeWebListing();
}

function copy() {
    log.info("Copy CSP boilerplate...");
    sh.cp(join(cspFilesDir, "*"), $file("theme/web"));
}

function backup() {
    const backup = $file("theme/web/index.backup.html");
    const index = $file("theme/web/index.html");
    if (sh.test("-f", index)) {
        log.info("Making backup for index.html...");
        sh.mv(index, backup);
    }
}

function restore() {
    const backup = $file("theme/web/index.backup.html");
    if (sh.test("-f", backup)) {
        log.info("Restoring previous index.html...");
        sh.mv(backup, $file("theme/web/index.html"));
    }
}

function cleanup() {
    const files = ["theme/web/index.html", "theme/web/appSetup.js", "theme/web/unsupported-browser.js"].map($file);
    log.info("Removing CSP boilerplate...");

    silent(() => sh.rm(files));
}

function isEnabled() {
    const index = $file("theme/web/index.html");
    const tag = `<meta http-equiv="Content-Security-Policy" content="default-src 'self';">`;
    return sh.test("-f", index) && sh.grep("-l", tag, index).length > 1;
}

function enable() {
    log.info("You asked to enable CSP...");
    sh.cd(sh.env.MX_PROJECT_PATH);
    if (isEnabled()) {
        log.info("CSP already enabled in target project.");
    } else {
        backup();
        copy();
    }
    done();
}

function disable() {
    log.info("You asked to disable CSP...");
    sh.cd(sh.env.MX_PROJECT_PATH);
    cleanup();
    restore();
    done();
}

async function main() {
    log.info("Toggle CSP", "\n");

    if (sh.test("-f", ".env")) {
        log.info(".env file is found, loading vars...");
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

    log.info("Your target project is:");
    log.info(sh.env.MX_PROJECT_PATH, "\n");

    const command = process.argv[2];

    if (command === "enable") enable();
    else if (command === "disable") disable();
    else throw new Error(`Unknown command: ${command}`);
}

main().catch(e => {
    log.error(e);
    process.exit(-1);
});
