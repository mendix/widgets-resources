export function ensure<T>(arg?: T): T {
    if (arg == null) {
        throw new Error("Did not expect an argument to be undefined");
    }
    return arg;
}
