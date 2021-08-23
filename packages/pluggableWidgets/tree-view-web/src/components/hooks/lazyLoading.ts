import { RefObject, useCallback, useRef } from "react";

export function elementHasNestedTreeView(element: HTMLDivElement | null): boolean {
    return element?.lastElementChild?.className.includes("widget-tree-view") ?? true;
}

export const useTreeViewLazyLoading = (): {
    treeViewBranchBody: RefObject<HTMLDivElement>;
    hasNestedTreeView: () => boolean;
} => {
    const treeViewBranchBody = useRef<HTMLDivElement>(null);

    const hasNestedTreeView = useCallback(
        () => treeViewBranchBody.current?.lastElementChild?.className.includes("widget-tree-view") ?? true,
        []
    );

    return { treeViewBranchBody, hasNestedTreeView };
};
