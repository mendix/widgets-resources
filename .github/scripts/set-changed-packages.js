const { execSync } = require("child_process");

const [scope] = process.argv.slice(2);
const trigger = process.env.TRIGGER;
const isMergeRequest = trigger.includes("pull-request");

const changedPackages = JSON.parse(
    execSync(
        `npx lerna list --json${isMergeRequest ? ` --since origin/master` : ""}${scope ? ` --scope '${scope}'` : ""}`
    ).toString()
);

execSync(`echo '::set-output name=CHANGED_PACKAGES::${JSON.stringify(changedPackages)}'`, {
    stdio: "inherit"
});
