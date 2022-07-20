export function useHasUserMedia(): boolean {
    return typeof navigator?.mediaDevices?.getUserMedia === "function";
}
