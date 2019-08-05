export const fixHeightWithRatio = (element: HTMLElement, ratio: number): void => {
    const height = element.parentElement ? element.parentElement.offsetWidth * ratio : 0;
    if (height > 0 && element.parentElement) {
        element.style.height = `${height}px`;
        element.parentElement.style.height = `${height}px`;
        if (element.parentElement.parentElement) {
            element.parentElement.parentElement.style.height = `${height}px`;
        }
    }
};

export const getRatio = (url: string): Promise<number> => {
    return fetch(`https://noembed.com/embed?url=${url}`)
        .then(response => response.json())
        .then(properties => {
            return properties.height / properties.width;
        })
        .catch(() => {
            return 0;
        });
};

export const validateUrl = (url: string): string => {
    // eslint-disable-next-line no-useless-escape
    if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(url)) {
        return url;
    }
    return "";
};
