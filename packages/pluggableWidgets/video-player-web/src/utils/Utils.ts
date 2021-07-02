export const validateUrl = (url: string): string => {
    // eslint-disable-next-line no-useless-escape
    if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(url)) {
        return url;
    }
    return "";
};
