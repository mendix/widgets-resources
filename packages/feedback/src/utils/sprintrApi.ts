import { stringify } from "querystringify";
import { Dimensions, Platform } from "react-native";

const SPRINTR_FEEDBACK_URL = "https://sprintr.home.mendix.com/submitissue/";

export async function sendToSprintr(data: {
    feedbackMsg: string;
    sprintrAppId: string;
    screenshot: string;
}): Promise<boolean> {
    const shortname = data.feedbackMsg ? data.feedbackMsg.substring(0, 200) : "";
    const description = data.feedbackMsg ? data.feedbackMsg.substring(200) : "";

    const body = {
        apiversion: "1.0",
        application: data.sprintrAppId,
        username: "Unknown Native User",
        emailaddress: "unknown@example.com",
        userroles: "",
        shortname,
        description,
        img: data.screenshot,
        browser: "Native for " + Platform.OS,
        screensize: Dimensions.get("window").width + "x" + Dimensions.get("window").height,
        issuetype: "issue",
        documentType: "Page",
        documentName: "Unknown Native Page"
    };

    return fetch(SPRINTR_FEEDBACK_URL, {
        method: "POST",
        body: stringify(body),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        mode: "no-cors",
        referrer: "no-referrer"
    })
        .then(response => response.ok)
        .catch(() => false);
}
