import { RefObject, useCallback } from "react";

export function elementHasNestedTreeView(element: HTMLDivElement | null): boolean {
    return element?.lastElementChild?.className.includes("widget-tree-view") ?? true;
}

export const useTreeViewLazyLoading = (
    treeViewBranchBody: RefObject<HTMLDivElement>
): {
    hasNestedTreeView: () => boolean;
} => {
    const hasNestedTreeView = useCallback(
        () => treeViewBranchBody.current?.lastElementChild?.className.includes("widget-tree-view") ?? true,
        []
    );

    return { hasNestedTreeView };
};
