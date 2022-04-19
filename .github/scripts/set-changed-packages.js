const { execSync } = require("child_process");

const [arg] = process.argv.slice(2);
const changedPackages = execSync(`npx lerna list --json --since origin/master${arg ? ` --scope '${arg}'` : ""}`);

execSync(`echo ::set-output name=CHANGED_PACKAGES::${changedPackages}`, { stdio: "inherit" });
