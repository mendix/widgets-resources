import { RefObject, useCallback, useRef, useState } from "react";

export const useAnimatedTreeNodeContentHeight = (
    treeNodeBranchBody: RefObject<HTMLDivElement>
): {
    isAnimating: boolean;
    captureElementHeight: () => void;
    animateTreeNodeContent: () => (() => void) | undefined;
    cleanupAnimation: () => void;
} => {
    const currentElementHeight = useRef<number>();
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const captureElementHeight = useCallback(() => {
        currentElementHeight.current = treeNodeBranchBody.current?.getBoundingClientRect().height ?? 0;
    }, []);

    const animateTreeNodeContent = useCallback(() => {
        if (
            treeNodeBranchBody.current &&
            currentElementHeight.current !== undefined &&
            !Number.isNaN(currentElementHeight.current)
        ) {
            const newElementHeight = treeNodeBranchBody.current.getBoundingClientRect().height;
            if (newElementHeight - currentElementHeight.current !== 0) {
                setIsAnimating(true);
                treeNodeBranchBody.current.style.height = `${currentElementHeight.current}px`;
                const timeout = setTimeout(() => {
                    treeNodeBranchBody.current!.style.height = `${newElementHeight}px`;
                    currentElementHeight.current = newElementHeight;
                }, 1);
                return () => clearTimeout(timeout);
            }
        }
    }, []);

    const cleanupAnimation = useCallback(() => {
        setIsAnimating(false);
        treeNodeBranchBody.current?.style.removeProperty("height");
    }, []);

    return { isAnimating, captureElementHeight, animateTreeNodeContent, cleanupAnimation };
};
