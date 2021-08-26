import { useCallback, useRef, useState } from "react";

export function usePositionObserver(target: HTMLElement | null): [ClientRect | undefined, () => () => void] {
    const [position, setPosition] = useState<ClientRect>();

    const onAnimationFrameHandler = useCallback(() => {
        if (!target) {
            return;
        }

        const newPosition: ClientRect = target.getBoundingClientRect();

        if (shouldUpdatePosition(newPosition, position)) {
            setPosition(newPosition);
        }
    }, [position, target]);

    return [position, useAnimationFrameHandler(onAnimationFrameHandler)];
}

function useAnimationFrameHandler(callback: () => void) {
    const requestId = useRef<number | undefined>();

    const onAnimationFrame = useCallback(() => {
        callback();
        requestId.current = window.requestAnimationFrame(onAnimationFrame);
    }, [callback]);

    return useCallback(() => {
        requestId.current = window.requestAnimationFrame(onAnimationFrame);
        return () => {
            window.cancelAnimationFrame(requestId.current!);
        };
    }, [onAnimationFrame]);
}

function shouldUpdatePosition(a?: ClientRect, b?: ClientRect): boolean {
    return (
        !a ||
        !b ||
        a.height !== b.height ||
        a.width !== b.width ||
        a.bottom !== b.bottom ||
        a.top !== b.top ||
        a.left !== b.left ||
        a.right !== b.right
    );
}
