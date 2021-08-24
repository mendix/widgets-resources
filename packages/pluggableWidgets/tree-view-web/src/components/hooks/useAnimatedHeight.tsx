import { RefObject, useCallback, useRef, useState } from "react";

export const useAnimatedTreeViewContentHeight = (
    treeViewBranchBody: RefObject<HTMLDivElement>
): {
    isAnimating: boolean;
    captureElementHeight: () => void;
    animateTreeViewContent: () => (() => void) | undefined;
    cleanupAnimation: () => void;
} => {
    const currentElementHeight = useRef<number>();
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const captureElementHeight = useCallback(() => {
        currentElementHeight.current = treeViewBranchBody.current?.getBoundingClientRect().height ?? 0;
    }, []);

    const animateTreeViewContent = useCallback(() => {
        if (
            treeViewBranchBody.current &&
            currentElementHeight.current !== undefined &&
            !Number.isNaN(currentElementHeight.current)
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
    }, []);

    const cleanupAnimation = useCallback(() => {
        setIsAnimating(false);
        treeViewBranchBody.current?.style.removeProperty("height");
    }, []);

    return { isAnimating, captureElementHeight, animateTreeViewContent, cleanupAnimation };
};
