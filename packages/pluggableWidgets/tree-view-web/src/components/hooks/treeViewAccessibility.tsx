import { useCallback, useMemo } from "react";
import { TreeViewState } from "../TreeView";
import { KeyboardHandlerHook, useKeyboardHandler } from "./useKeyboardHandler";

export const enum FocusTargetChange {
    FIRST = "FIRST",
    LAST = "LAST",
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT"
}

export type TreeViewFocusChangeHandler = (
    targetElement: EventTarget | null,
    focusTargetChange: FocusTargetChange,
    traverseOption?: "HORIZONTAL" | "VERTICAL"
) => void;

export const useTreeViewFocusChangeHandler = (treeViewElement: HTMLDivElement | null): TreeViewFocusChangeHandler => {
    return useCallback(
        (targetElement, focusTargetChange, traverseOption) => {
            if (targetElement && targetElement instanceof Element && treeViewElement) {
                const targetableBranches: HTMLHeadElement[] = Array.from(
                    treeViewElement.querySelectorAll(":scope > .widget-tree-view-branch > header[role=button]")
                );

                const numberOfTargetableBranches = targetableBranches.length;
                if (numberOfTargetableBranches === 0) {
                    return;
                }

                const getTreeViewHeadersInElement = (element: Element | Document | null): HTMLHeadElement[] =>
                    element ? Array.from(element.querySelectorAll(".widget-tree-view-branch-header[role=button]")) : [];

                switch (focusTargetChange) {
                    case FocusTargetChange.FIRST:
                        targetableBranches[0].focus();
                        break;
                    case FocusTargetChange.LAST:
                        targetableBranches[numberOfTargetableBranches - 1].focus();
                        break;
                    case FocusTargetChange.PREVIOUS: {
                        const currentBranchIndex = targetableBranches.findIndex(targetableBranch =>
                            targetableBranch.isSameNode(targetElement)
                        );
                        if (currentBranchIndex >= 0) {
                            if (currentBranchIndex === 0 && traverseOption === "VERTICAL") {
                                const parentTreeViewHeaders = getTreeViewHeadersInElement(document).filter(node =>
                                    node.nextElementSibling?.contains(targetElement)
                                );
                                if (parentTreeViewHeaders.length > 0) {
                                    parentTreeViewHeaders[parentTreeViewHeaders.length - 1].focus();
                                }
                                return;
                            }
                            const newBranchIndex = currentBranchIndex - 1;
                            const newBranchIndexProcessed = Math.max(newBranchIndex, 0);
                            if (newBranchIndexProcessed !== currentBranchIndex) {
                                targetableBranches[newBranchIndexProcessed].focus();
                            }
                        }
                        break;
                    }
                    case FocusTargetChange.NEXT: {
                        const currentBranchIndex = targetableBranches.findIndex(targetableBranch =>
                            targetableBranch.isSameNode(targetElement)
                        );
                        if (currentBranchIndex >= 0) {
                            if (traverseOption === "VERTICAL") {
                                const childTreeViewHeaders = getTreeViewHeadersInElement(
                                    targetElement.nextElementSibling
                                );
                                if (childTreeViewHeaders.length > 0) {
                                    childTreeViewHeaders[0].focus();
                                }
                                return;
                            }
                            const newBranchIndex = currentBranchIndex + 1;
                            const newBranchIndexProcessed = Math.min(newBranchIndex, numberOfTargetableBranches - 1);
                            if (newBranchIndexProcessed !== currentBranchIndex) {
                                targetableBranches[newBranchIndexProcessed].focus();
                            }
                        }
                        break;
                    }
                }
            }
        },
        [treeViewElement]
    );
};

export const useTreeViewBranchKeyboardHandler = (
    toggleTreeViewContent: () => void,
    changeFocus: TreeViewFocusChangeHandler,
    treeViewState: TreeViewState
): ReturnType<KeyboardHandlerHook> => {
    const keyHandlers = useMemo<Parameters<KeyboardHandlerHook>[0]>(
        () => ({
            Enter: toggleTreeViewContent,
            Space: toggleTreeViewContent,
            Home: event => changeFocus(event.currentTarget, FocusTargetChange.FIRST),
            End: event => changeFocus(event.currentTarget, FocusTargetChange.LAST),
            ArrowUp: event => changeFocus(event.currentTarget, FocusTargetChange.PREVIOUS, "HORIZONTAL"),
            ArrowDown: event => changeFocus(event.currentTarget, FocusTargetChange.NEXT, "HORIZONTAL"),
            ArrowRight: event => {
                if (
                    treeViewState === TreeViewState.COLLAPSED_WITH_CSS ||
                    treeViewState === TreeViewState.COLLAPSED_WITH_JS
                ) {
                    toggleTreeViewContent();
                }
                if (treeViewState === TreeViewState.EXPANDED) {
                    changeFocus(event.currentTarget, FocusTargetChange.NEXT, "VERTICAL");
                }
            },
            ArrowLeft: event => {
                if (
                    treeViewState === TreeViewState.COLLAPSED_WITH_CSS ||
                    treeViewState === TreeViewState.COLLAPSED_WITH_JS
                ) {
                    changeFocus(event.currentTarget, FocusTargetChange.PREVIOUS, "VERTICAL");
                }
                if (treeViewState === TreeViewState.EXPANDED) {
                    toggleTreeViewContent();
                }
            }
        }),
        [toggleTreeViewContent, changeFocus, treeViewState]
    );
    return useKeyboardHandler(keyHandlers);
};
