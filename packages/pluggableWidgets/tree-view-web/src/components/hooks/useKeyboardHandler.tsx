import { KeyboardEvent, KeyboardEventHandler, useCallback } from "react";

type KeyboardKey = "Enter" | "Space" | "Home" | "End" | "ArrowUp" | "ArrowDown" | "ArrowRight" | "ArrowLeft";

export type KeyboardHandlerHook = (
    keyHandlers: {
        [key in KeyboardKey]?: (event: KeyboardEvent<HTMLElement>) => void;
    }
) => KeyboardEventHandler<HTMLElement>;

const alternativeKeysMap: { [key in KeyboardKey]?: string[] } = {
    ArrowDown: ["ArrowDown", "Down"],
    ArrowLeft: ["ArrowLeft", "Left"],
    ArrowRight: ["ArrowRight", "Right"],
    ArrowUp: ["ArrowUp", "Up"],
    Space: [" "]
};

export const useKeyboardHandler: KeyboardHandlerHook = keyHandlers => {
    return useCallback(
        event => {
            const eventKey = event.key as KeyboardKey;
            const eventKeyMapped =
                eventKey in keyHandlers
                    ? eventKey
                    : (Object.keys(alternativeKeysMap) as KeyboardKey[]).find(key =>
                          alternativeKeysMap[key]?.includes(eventKey)
                      );
            if (eventKeyMapped) {
                const keyHandler = keyHandlers[eventKeyMapped];
                if (keyHandler) {
                    if (eventKeyMapped === "Enter" || eventKeyMapped === "Space") {
                        event.stopPropagation();
                    }
                    event.preventDefault();
                    keyHandler(event);
                }
            }
        },
        [keyHandlers]
    );
};
