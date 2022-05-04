const { execSync } = require("child_process");

const [scope] = process.argv.slice(2);
const trigger = process.env.TRIGGER;
const isMergeRequest = trigger.includes("pull-request");

console.log(
    `npx lerna list --json${isMergeRequest ? ` --since origin/master` : ""}${scope ? ` --scope '${scope}'` : ""}`
);
const changedPackages = execSync(
    `npx lerna list --json${isMergeRequest ? ` --since origin/master` : ""}${scope ? ` --scope '${scope}'` : ""}`
);
const changedPackagesFormattedForLerna = changedPackages.map(p => p.name).join(",") + ","; // end comma useful when only one package is changed.
console.log(changedPackagesFormattedForLerna);

execSync(`echo "::set-output name=CHANGED_PACKAGES::\'{${changedPackagesFormattedForLerna}}\'"`, {
    stdio: "inherit"
});
