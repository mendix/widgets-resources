const fs = require("fs");
const path = require("path");

const actionsDir = path.join(process.cwd(), "dist/tsc/");
const testProjectDir = path.join(process.cwd(), "../test-project/mxproject/javascriptsource/actions/actions/");

fs.mkdir(testProjectDir, { recursive: true }, err => {
    if (err) {
        console.error(err);
        return;
    }

    const files = walkSync(actionsDir);

    files.forEach(from => {
        const to = testProjectDir + path.basename(from);
        fs.copyFile(from, to, err => {
            if (err) console.error(err);
        });
    });
});

function walkSync(dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        var path = dir + file;
        if (fs.statSync(path).isDirectory()) {
            filelist = walkSync(path + "/", filelist);
        } else {
            filelist.push(path);
        }
    });
    return filelist;
}
