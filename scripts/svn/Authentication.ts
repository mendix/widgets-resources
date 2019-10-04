import readline from "readline-sync";
import { promises as fs } from "fs";

main().catch(reason => {
    // eslint-disable-next-line no-console
    console.error(reason);
    process.exit(-1);
});

async function main(): Promise<void> {
    const { SPRINTR_USERNAME, SPRINTR_PASSWORD } = process.env;
    let username = SPRINTR_USERNAME;
    let password = SPRINTR_PASSWORD;
    if (!username) {
        username = readline.question("Insert your Sprintr username: ");
    }
    if (!password) {
        password = readline.question("Insert your Sprintr password: ", {
            hideEchoBack: true
        });
    }

    if (username && password) {
        await fs.writeFile(
            ".env",
            `SPRINTR_USERNAME=${username}
SPRINTR_PASSWORD=${password}`
        );
    } else {
        process.exit(-1);
    }
}
