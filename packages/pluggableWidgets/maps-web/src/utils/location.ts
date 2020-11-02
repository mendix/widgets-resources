import { Marker } from "../../typings/shared";

export function getCurrentUserLocation(): Promise<Marker> {
    return new Promise<Marker>((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        url: defaultMarkerImage
                    });
                },
                () => {
                    reject(new Error("Current user location is not available"));
                }
            );
        } else {
            reject(new Error("Current user location is not available"));
        }
    });
}

const defaultMarkerImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkAgwQECuLT1eNAAACtUlEQVRIx43Vy29VVRQG8F8r2LT0Vm2kDTUmgh1Zqsx0hpSZeuNIozMeiYaADhggjHwkRonGKbb9A6TKyCghJpRHIYoDH0QeI0tbiiFO1LaJ1LbLwd3cnn3vEbvu5J5vfWuvtb69zjotyqziBUOe8pgH8YdJPxv3tTlrsE2OWRAlvwWj+hvpLdlTuyMO2gCWXTbrFvo84kn3gX984m13ynP3u5xynbPLw5lvo93OJ+9FvWXh29wWwhXP/2d7VVeFMG1rc/Za+Gfa76lQhzEhTOVVtKfiP2jQpMxaHE2NtK2C76Xs/x9eO+LzlK5+cfPClabiWwyqqhpsOrjDNeGOx2uPx4RokG69N03XJ2DKAesb5AxhBCoWhHOZu9vZpjE6ozvjTAjzOnlVCLuy7GfTZR2y3XZvmUlHFKvYI4SXGRWWsrF5QwgnddaRilNC2F9g9VgShvle+CGTbkqY1omdxowZQsVNYTJr4ifhO34XvizAg0I4hJ1WhLBiCIeF8ESB+ZVwu1UXbhXgzeASXk/X1+K1hLClwJzFA62JsmpRR6IBy/+lqFZ/oa8A3wBPYzjRV4ziGchU6MOfXCoVcUYFQ447bge6zAq/Non4LSPCko0FxwEhnFKpI12+EcK+7BqXhU95RQi7s0EaF8KMw561wxGzQjhtXYG1Vwgv3R3l81lx3c40jfJpD2WcC8Jcbf2NCqGaudfZ70Y9eNK+LDsvitocQr9F4aoOjTagqmqgCd/guvB3mhl8KISxNS+UE0J4fxVqc1EIR9e00j4SwoT7i3BvWh9flDSSF3+ibKnC1nTEtQY5c+mup/CBMndvaiRM2JONFj32ulD39hQ7KlqbdxxMvS37xYzfsMmjBtVeu0Ufe9fivbrcYsR86cd1zvDqxZVXcNc6PWfINpvrn/cfjTtpoZn6LyulNWLKSWq8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAyLTEyVDE2OjE2OjQzKzAwOjAwPPYLaAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMi0xMlQxNjoxNjo0MyswMDowME2rs9QAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC";
