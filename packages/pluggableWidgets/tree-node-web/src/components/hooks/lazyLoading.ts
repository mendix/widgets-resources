import { RefObject, useCallback } from "react";

export function elementHasNestedTreeNode(element: HTMLDivElement | null): boolean {
    return element?.lastElementChild?.className.includes("widget-tree-node") ?? true;
}

export const useTreeNodeLazyLoading = (
    treeNodeBranchBody: RefObject<HTMLDivElement>
): {
    hasNestedTreeNode: () => boolean;
} => {
    const hasNestedTreeNode = useCallback(
        () => treeNodeBranchBody.current?.lastElementChild?.className.includes("widget-tree-node") ?? true,
        []
    );

    return { hasNestedTreeNode };
};
