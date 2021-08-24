import { createElement, FC, ReactElement, useCallback, useEffect, useMemo, useState } from "react";

export function usePositionObserver(target: HTMLElement | null): [ClientRect | undefined, ReactElement] {
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

    const PositionObserver = useMemo(
        () => createElement(AnimationFrameHandler, { callback: onAnimationFrameHandler }),
        [onAnimationFrameHandler]
    );

    return [position, PositionObserver];
}

interface AnimationFrameHandlerProps {
    callback: () => void;
}

const AnimationFrameHandler: FC<AnimationFrameHandlerProps> = props => {
    const [requestId, setRequestId] = useState<number | undefined>(undefined);

    const onAnimationFrame = useCallback(() => {
        props.callback();
        setRequestId(window.requestAnimationFrame(onAnimationFrame));
    }, [props.callback]);

    useEffect(() => {
        setRequestId(window.requestAnimationFrame(onAnimationFrame));
        return () => {
            window.cancelAnimationFrame(requestId!);
        };
    }, []);

    return null;
};

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
