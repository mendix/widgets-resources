class Utils {
    public static fixHeightWithRatio(element: HTMLElement, ratio: number) {
        const height = element.parentElement ? element.parentElement!.offsetWidth * ratio : 0;
        if (height > 0) {
            element.style.height = `${height}px`;
            element.parentElement!.style.height = `${height}px`;
            if (element.parentElement!.parentElement)
                element.parentElement!.parentElement!.style.height = `${height}px`;
        }
    }

    public static getRatio(url: string): Promise<number> {
        return fetch(`https://noembed.com/embed?url=${url}`)
            .then(response => response.json())
            .then(properties => {
                return properties.height / properties.width;
            })
            .catch(() => {
                return 0;
            });
    }

    public static validateUrl = (url: string): string => {
        if (/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g.test(url))
            return url;
        return "";
    }
}
