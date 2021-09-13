import { EventHandler, SyntheticEvent, useCallback, useMemo } from "react";
import { TreeNodeState } from "../TreeNode";
import { KeyboardHandlerHook, useKeyboardHandler } from "./useKeyboardHandler";

export const enum FocusTargetChange {
    FIRST = "FIRST",
    LAST = "LAST",
    PREVIOUS = "PREVIOUS",
    NEXT = "NEXT"
}

export type TreeNodeFocusChangeHandler = (
    targetElement: EventTarget | null,
    focusTargetChange: FocusTargetChange,
    traverseOption?: "HORIZONTAL" | "VERTICAL"
) => void;

export const useTreeNodeFocusChangeHandler = (): TreeNodeFocusChangeHandler => {
    return useCallback((targetElement, focusTargetChange, traverseOption) => {
        if (targetElement && targetElement instanceof Element) {
            const getTreeNodeHeadersInElement = (el: Element | Document | null): HTMLElement[] => {
                if (el) {
                    const allBranches = Array.from(el.querySelectorAll<HTMLElement>("li.widget-tree-node-branch"));
                    const hiddenBodies = Array.from(el.querySelectorAll(".widget-tree-node-body[aria-hidden=true]"));
                    return allBranches.filter(node => !hiddenBodies.some(hiddenBody => hiddenBody.contains(node)));
                }
                return [];
            };

            const currentTreeNodeScope = Array.from(
                document.body.querySelectorAll(".widget-tree-node[role=tree]")
            ).find(element => element.contains(targetElement));

            if (!currentTreeNodeScope) {
                return;
            }

            const targetableBranches = getTreeNodeHeadersInElement(currentTreeNodeScope);

            const numberOfTargetableBranches = targetableBranches.length;
            if (numberOfTargetableBranches === 0) {
                return;
            }

            const currentBranchIndex = targetableBranches.findIndex(branch => branch.isSameNode(targetElement));

            switch (focusTargetChange) {
                case FocusTargetChange.FIRST:
                    targetableBranches[0].focus();
                    break;
                case FocusTargetChange.LAST:
                    targetableBranches[numberOfTargetableBranches - 1].focus();
                    break;
                case FocusTargetChange.PREVIOUS: {
                    if (traverseOption === "VERTICAL") {
                        const parentTreeNodeHeaders = getTreeNodeHeadersInElement(document).filter(node =>
                            node.lastElementChild?.contains(targetElement)
                        );
                        if (parentTreeNodeHeaders.length > 0) {
                            parentTreeNodeHeaders[parentTreeNodeHeaders.length - 1].focus();
                        }
                        return;
                    }
                    const newBranchIndex = currentBranchIndex - 1;
                    const newBranchIndexProcessed = Math.max(newBranchIndex, 0);
                    if (newBranchIndexProcessed !== currentBranchIndex) {
                        targetableBranches[newBranchIndexProcessed].focus();
                    }
                    break;
                }
                case FocusTargetChange.NEXT: {
                    if (traverseOption === "VERTICAL") {
                        const childTreeNodeHeaders = getTreeNodeHeadersInElement(targetElement.lastElementChild);
                        if (childTreeNodeHeaders.length > 0) {
                            childTreeNodeHeaders[0].focus();
                        }
                        return;
                    }
                    const newBranchIndex = currentBranchIndex + 1;
                    const newBranchIndexProcessed = Math.min(newBranchIndex, numberOfTargetableBranches - 1);
                    if (newBranchIndexProcessed !== currentBranchIndex) {
                        targetableBranches[newBranchIndexProcessed].focus();
                    }
                    break;
                }
            }
        }
    }, []);
};

export const useTreeNodeBranchKeyboardHandler = (
    toggleTreeNodeContent: EventHandler<SyntheticEvent<HTMLElement>>,
    changeFocus: TreeNodeFocusChangeHandler,
    treeNodeState: TreeNodeState,
    isActualLeafNode: boolean,
    eventTargetIsNotCurrentBranch: (event: SyntheticEvent<HTMLElement>) => boolean
): ReturnType<KeyboardHandlerHook> => {
    const keyHandlers = useMemo<Parameters<KeyboardHandlerHook>[0]>(
        () => ({
            Enter: toggleTreeNodeContent,
            Space: toggleTreeNodeContent,
            Home: event => changeFocus(event.currentTarget, FocusTargetChange.FIRST),
            End: event => changeFocus(event.currentTarget, FocusTargetChange.LAST),
            ArrowUp: event => changeFocus(event.currentTarget, FocusTargetChange.PREVIOUS, "HORIZONTAL"),
            ArrowDown: event => changeFocus(event.currentTarget, FocusTargetChange.NEXT, "HORIZONTAL"),
            ArrowRight: event => {
                if (
                    treeNodeState === TreeNodeState.COLLAPSED_WITH_CSS ||
                    treeNodeState === TreeNodeState.COLLAPSED_WITH_JS
                ) {
                    toggleTreeNodeContent(event);
                } else if (treeNodeState === TreeNodeState.EXPANDED || isActualLeafNode) {
                    changeFocus(event.currentTarget, FocusTargetChange.NEXT, "VERTICAL");
                }
            },
            ArrowLeft: event => {
                if (
                    treeNodeState === TreeNodeState.COLLAPSED_WITH_CSS ||
                    treeNodeState === TreeNodeState.COLLAPSED_WITH_JS ||
                    isActualLeafNode
                ) {
                    changeFocus(event.currentTarget, FocusTargetChange.PREVIOUS, "VERTICAL");
                } else if (treeNodeState === TreeNodeState.EXPANDED) {
                    toggleTreeNodeContent(event);
                }
            }
        }),
        [toggleTreeNodeContent, changeFocus, treeNodeState, isActualLeafNode]
    );

    const keyboardHandler = useKeyboardHandler(keyHandlers);

    return useCallback(
        event => {
            if (eventTargetIsNotCurrentBranch(event)) {
                return;
            }
            return keyboardHandler(event);
        },
        [eventTargetIsNotCurrentBranch, keyboardHandler]
    );
};
