import SevereServiceError from "webdriverio/build/utils/SevereServiceError";
import { config } from "../wdio.conf";
import { createReadStream, existsSync } from "fs";
import FormData from "form-data";
import axios from "axios";

export async function uploadApp(binaryPath: string, customId: string): Promise<void> {
    if (!existsSync(binaryPath)) {
        throw new SevereServiceError(`Unable to find binary at: ${binaryPath}`);
    }

    try {
        const form = new FormData({});
        form.append("file", createReadStream(binaryPath));
        form.append("data", `{"custom_id": "${customId}"}`);

        console.log(`Uploading app with ID ${customId} starting...`);
        await axios({
            method: "post",
            url: "https://api-cloud.browserstack.com/app-automate/upload",
            headers: {
                ...form.getHeaders(),
                Authorization: `Basic ${Buffer.from(`${config.user}:${config.key}`).toString("base64")}`
            },
            data: form,
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        });
        console.log(`Uploading app with ID ${customId} done!`);
    } catch (error) {
        throw new SevereServiceError(`Something went wrong while uploading an app: ${error}`);
    }
}

export async function setSessionStatus(sessionID: string, status: string): Promise<void> {
    try {
        const result = await axios({
            method: "put",
            url: `https://api-cloud.browserstack.com/app-automate/sessions/${sessionID}.json`,
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + Buffer.from(`${config.user}:${config.key}`).toString("base64")
            },
            data: { status }
        });
        console.log(`Updated status for session: ${sessionID} ${result}`);
    } catch (error) {
        throw new SevereServiceError(`Failed to set test status: ${error}`);
    }
}
