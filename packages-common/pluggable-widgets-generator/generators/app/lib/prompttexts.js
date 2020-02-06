/*jshint -W108,-W069*/
"use strict";
var semver = require("semver");

function _promptWidgetProperties(dir, widgetName) {
    return [
        {
            type: "input",
            name: "widgetName",
            validate: function (input) {
                if (/^([a-zA-Z]*)$/.test(input)) {
                    return true;
                }
                return "Your widget can only contain letters (a-z & A-Z). Please provide a valid name";
            },
            message: "What is the name of your widget?",
            default: widgetName ? widgetName : "MyWidget"
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description for your widget",
            default: "My widget description"
        },
        {
            type: "input",
            name: "organization",
            message: "Organization name",
            default: "Mendix",
            store: true
        },
        {
            type: "input",
            name: "copyright",
            message: "Add a copyright",
            default: "2020 Mendix Technology BV",
            store: true
        },
        {
            type: "input",
            name: "license",
            message: "Add a license",
            default: "Apache-2.0",
            store: true
        },
        {
            type: "input",
            name: "version",
            validate: function (input) {
                if (semver.valid(input) && semver.satisfies(input, ">=0.0.1")) {
                    return true;
                }
                return "Your version needs to be formatted as x.x.x and starts at 0.0.1";
            },
            message: "Initial version",
            default: "1.0.0"
        },
        {
            type: "input",
            name: "author",
            message: "Author",
            default: "John",
            store: true
        },
        {
            type: "input",
            name: "projectPath",
            message: "Mendix Project path",
            default: dir ? dir : "./dist/MxTestProject",
        },
        {
            type: "list",
            name: "programmingLanguage",
            message: "Which programming language do you want to use for the widget?",
            choices: [
                {
                    name: "JavaScript ES6",
                    value: "javascript"
                },
                {
                    name: "TypeScript",
                    value: "typescript"
                }
            ],
            default: "javascript",
            store: true
        },
        {
            type: "list",
            name: "platform",
            message: "Which type of widget are you developing?",
            choices: [
                {
                    name: "For web and hybrid mobile apps",
                    value: "web"
                },
                {
                    name: "For native mobile apps",
                    value: "native"
                }
            ],
            default: "web",
            store: true
        },
        {
            type: "list",
            name: "boilerplate",
            message: "Which template do you want to use for the widget?",
            choices: [
                {
                    name: "Full Boilerplate (recommended for beginners)",
                    value: "full"
                },
                {
                    name: "Empty widget (recommended for more experienced developers)",
                    value: "empty"
                }
            ],
            default: "full",
            store: true
        }];
}

function _promptTestsInfo(props) {
    if (props) {
        const prompts = [
            {
                type: "confirm",
                name: "unitTests",
                message: "Add unit tests for the widget ? (recommended for Full Boilerplate)",
                default: props.boilerplate && props.boilerplate === "full" ? true : false
            }
        ];
        if (props.platform && props.platform === "web") {
            prompts.push({
                type: "confirm",
                name: "e2eTests",
                message: "Add End-to-end tests for the widget ? (recommended for Full Boilerplate)",
                default: props.boilerplate && props.boilerplate === "full" ? true : false
            });
        }

        return prompts;
    }
    return [];
}

module.exports = {
    promptWidgetProperties: _promptWidgetProperties,
    promptTestsInfo: _promptTestsInfo
};
