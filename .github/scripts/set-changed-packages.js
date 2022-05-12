const { execSync } = require("child_process");

const [scope] = process.argv.slice(2);
const trigger = process.env.TRIGGER;
const isMergeRequest = trigger.includes("pull-request");

const changedPackages = JSON.parse(
    execSync(
        `npx lerna list --json${isMergeRequest ? ` --since origin/master` : ""}${scope ? ` --scope '${scope}'` : ""}`
    )
);
const changedPackagesFormattedForLerna = `'{${changedPackages.map(p => p.name).join(",")},}'`; // end comma useful when only one package is changed.

execSync(`echo '::set-output name=CHANGED_PACKAGES::${JSON.stringify(changedPackages)}'`, {
    stdio: "inherit"
});

execSync(`echo '::set-output name=CHANGED_PACKAGES_FORMATTED_FOR_LERNA::${changedPackagesFormattedForLerna}'`, {
    stdio: "inherit"
});
