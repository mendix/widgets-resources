import { Dimensions, Platform } from "react-native";

const SPRINTR_FEEDBACK_BASE_URL = "https://feedback-api.mendix.com/rest/v3/feedbackapi";

export async function sendToSprintr(data: {
    feedbackMsg: string;
    sprintrAppId: string;
    screenshot: string;
}): Promise<boolean> {
    const title = data.feedbackMsg ? data.feedbackMsg.substring(0, 200) : "";
    const description = data.feedbackMsg ? data.feedbackMsg.substring(200) : "";
    const body = {
        title,
        description,
        issueType: "Issue",
        submitter: {
            userId: "",
            email: "unknown@example.com",
            displayName: "Unknown Native User"
        },
        metadata: {
            userRoles: "",
            location: "",
            form: "",
            userAgent: `Native for ${Platform.OS}`,
            screenWidth: Math.round(Dimensions.get("window").width), // API receives whole number screenWidth
            screenHeight: Math.round(Dimensions.get("window").height) // API receives whole number screenHeight
        },
        imageAttachment: data.screenshot
    };

    return fetch(`${SPRINTR_FEEDBACK_BASE_URL}/projects/${data.sprintrAppId}/issues`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json", ClientIdentifier: "feedback-native-v2" },
        mode: "no-cors",
        referrer: "no-referrer"
    })
        .then(response => response.ok)
        .catch(() => false);
}
