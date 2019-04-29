const chalk = require("chalk");

module.exports = {
    getBanner: pkg =>
        [
            "",
            chalk.bold.bgBlueBright("  __  ____   __ ") + "           _     _            _    ",
            chalk.bold.bgBlueBright(" |  \\/  \\ \\ / / ") + "          (_)   | |          | |   ",
            chalk.bold.bgBlueBright(" | \\  / |\\ V /  ") + " __      ___  __| | ____  ___| |_  ",
            chalk.bold.bgBlueBright(" | |\\/| | > <   ") + " \\ \\ /\\ / / |/ _  |/ _  |/ _ \\ __| ",
            chalk.bold.bgBlueBright(" | |  | |/ . \\  ") + "  \\ V  V /| | (_| | (_| |  __/ |_  ",
            chalk.bold.bgBlueBright(" |_|  |_/_/ \\_\\ ") + "   \\_/\\_/ |_|\\__._|\\__. |\\___|\\__| ",
            chalk.bold.bgBlueBright("                ")+"                   __/ |          ",
            "                                  |___/           ",
            " Generator, version: " + pkg.version,
            " Issues? Please report them at : " + chalk.italic.blueBright(pkg.bugs.url),
            ""
        ].join("\n"),

    PACKAGE_READ_ERROR:
        "Error reading package.json. Please check the file or remove it before you run the generator again. Error: ",
    DIR_NOT_EMPTY_ERROR: chalk.bold.red(
        "The directory you are trying to use is not empty, please open the generator in an empty folder or type yo @mendix/widget WidgetName\n"
    ),

    INSTALL_FINISH_MSG:
        "File configuration done, now running " +
        chalk.blueBright("npm install") +
        " to install development dependencies",
    END_NPM_NEED_INSTALL_MSG:
        "\n\n> Dependencies should be installed using " +
        chalk.bold.blueBright("npm install") +
        " before I can run the build using " +
        chalk.blueBright("gulp") +
        " < \n\n",
    END_RUN_BUILD_MSG_PATH:
        "\n> Copied files, now running " +
        chalk.blueBright("npm config set") +
        " to set your widget path (change this path based on you configurations)) \n\n",
    END_RUN_BUILD_MSG:
        "\n\n> I will now run " +
        chalk.bold.blueBright("gulp") +
        " to build the mpk (do this before open Mendix Studio Pro)< \n\n",
    END_SUCCESS:
        "\n\n\n Widget successfully built!! Please open " +
        chalk.bold.blueBright("Mendix Studio Pro") +
        " and start playing with your new widget.\n\n\n"
};
