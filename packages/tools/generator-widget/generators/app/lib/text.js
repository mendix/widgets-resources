const chalk = require("chalk");
const { join } = require("path");

const pkg = require(join(__dirname, "../../../package.json"));

module.exports = {
    BANNER: `

    ${chalk.bgBlueBright(chalk.bold.white("  __  ____   __ "))}           _     _            _    
    ${chalk.bold.bgBlueBright(chalk.bold.white(" |  \\/  \\ \\ / / "))}          (_)   | |          | |   
    ${chalk.bold.bgBlueBright(chalk.bold.white(" | \\  / |\\ V /  "))} __      ___  __| | ____  ___| |_  
    ${chalk.bold.bgBlueBright(chalk.bold.white(" | |\\/| | > <   "))} \\ \\ /\\ / / |/ _  |/ _  |/ _ \\ __| 
    ${chalk.bold.bgBlueBright(chalk.bold.white(" | |  | |/ . \\  "))}  \\ V  V /| | (_| | (_| |  __/ |_  
    ${chalk.bold.bgBlueBright(chalk.bold.white(" |_|  |_/_/ \\_\\ "))}   \\_/\\_/ |_|\\__._|\\__. |\\___|\\__| 
    ${chalk.bold.bgBlueBright(chalk.bold.white("                "))}                    __/ |          
                                       |___/           
     Widget Generator, version: ${pkg.version}
                
    `,

    DIR_NOT_EMPTY_ERROR: chalk.bold.red(
        "The directory you are trying to use is not empty, please open the generator in an empty folder or type yo @mendix/widget WidgetName\n"
    ),
    INSTALL_FINISH_MSG:
        "File configuration done, now running " + chalk.blueBright("npm install") + " to install dependencies",
    END_NPM_NEED_INSTALL_MSG:
        "\n\n> Dependencies should be installed using " +
        chalk.bold.blueBright("npm install") +
        " before I can run the build using " +
        chalk.blueBright("Pluggable Widgets Tools") +
        " < \n\n",
    END_RUN_BUILD_MSG:
        "\n\n> I will now run " + chalk.bold.blueBright("Pluggable Widgets Tools") + " to build the widget mpk. < \n\n",
    END_SUCCESS:
        "\n\n\n Widget successfully built!! Please open " +
        chalk.bold.blueBright("Mendix Studio Pro") +
        " and start playing with your new widget.\n\n\n"
};
