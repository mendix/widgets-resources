const { execSync } = require("child_process");

const [scope] = process.argv.slice(2);
const trigger = process.env.TRIGGER;
const isMergeRequest = trigger.includes("merge-request");
const changedPackages = execSync(
    `npx lerna list --json${isMergeRequest ? ` --since origin/master${scope ? ` --scope '${scope}'` : ""}` : ""}`
);

execSync(
    `echo ::set-output name=CHANGED_PACKAGES::${JSON.stringify(changedPackages.toString().replaceAll("\n", ""))}`,
    {
        stdio: "inherit"
    }
);
