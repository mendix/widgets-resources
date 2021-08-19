import { RefObject, useCallback, useLayoutEffect, useRef, useState } from "react";

export const useAnimatedTreeViewContentHeight = <T extends any>(
    treeViewBranchBody: RefObject<HTMLDivElement>,
    dependency: T,
    shouldAnimate: (dependency: T) => boolean
): {
    isAnimating: boolean;
    captureElementHeight: () => void;
    cleanupAnimation: () => void;
} => {
    const currentElementHeight = useRef<number>();
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const captureElementHeight = useCallback(() => {
        currentElementHeight.current = treeViewBranchBody.current?.getBoundingClientRect().height ?? 0;
    }, []);

    useLayoutEffect(() => {
        if (
            treeViewBranchBody.current &&
            currentElementHeight.current !== undefined &&
            Number.isInteger(currentElementHeight.current) &&
            shouldAnimate(dependency)
        ) {
            const newElementHeight = treeViewBranchBody.current.getBoundingClientRect().height;
            if (newElementHeight - currentElementHeight.current !== 0) {
                setIsAnimating(true);
                treeViewBranchBody.current.style.height = `${currentElementHeight.current}px`;
                const timeout = setTimeout(() => {
                    treeViewBranchBody.current!.style.height = `${newElementHeight}px`;
                    currentElementHeight.current = newElementHeight;
                }, 1);
                return () => clearTimeout(timeout);
            }
        }
    }, [dependency, shouldAnimate]);

    const cleanupAnimation = useCallback(() => {
        setIsAnimating(false);
        treeViewBranchBody.current?.style.removeProperty("height");
    }, []);

    return { isAnimating, captureElementHeight, cleanupAnimation };
};
