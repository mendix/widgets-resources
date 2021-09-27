export function generateUUID(): number {
    const UUIDLocation = "com.mendix.widgets.web.UUID";

    if (!(window as any)[UUIDLocation]) {
        (window as any)[UUIDLocation] = 1;
    }

    return (window as any)[UUIDLocation]++;
}
