export function getGoogleMapsStyles(styles?: string): google.maps.MapTypeStyle[] {
    if (styles && styles.trim()) {
        try {
            return JSON.parse(styles);
        } catch (error) {
            console.error(`Invalid Map styles, ${error.message}`);
        }
    }

    return [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        }
    ];
}
