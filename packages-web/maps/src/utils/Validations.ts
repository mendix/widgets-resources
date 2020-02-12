export const validLocation = (location: { latitude?: any; longitude?: any }): boolean => {
    const { latitude: lat, longitude: lng } = location;

    return (
        typeof lat === "number" &&
        typeof lng === "number" &&
        lat <= 90 &&
        lat >= -90 &&
        lng <= 180 &&
        lng >= -180 &&
        !(lat === 0 && lng === 0)
    );
};
