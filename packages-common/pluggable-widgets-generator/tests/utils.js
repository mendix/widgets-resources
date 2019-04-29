"use strict"
var fs = require("fs-extra");
var xml2js = require("xml2js").parseString;

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, _index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function analizeCoverage(path) {
    let valueToReturn = false;
    let percentage = 0;
    const fileContent = fs.readFileSync(path, "utf8");

    if (!fileContent) {
        throw new Error("Error reading coverage file: " + path);
    }

    xml2js(fileContent, {}, function(err, result) {
        if (err) {
            throw new Error("Error reading coverage file: " + path);
        }
        const project = result.coverage.project[0] || null;
        if (project && project.metrics && project.metrics.length > 0) {
            const metrics = project.metrics[0].$;
            percentage = Number(metrics.coveredstatements) / Number(metrics.statements);
            if (Number.isNaN(percentage) || percentage <= 0.5) {
                throw new Error("The tests are not covering at least 50% of the code");
            }
            valueToReturn = true;
        } else {
            throw new Error("Error reading coverage file: " + path);
        }
    });

    console.log('Code coverage: ' + percentage * 100 + '%');
    return valueToReturn;
}

module.exports = {
    deleteFolderRecursive,
    analizeCoverage
};
