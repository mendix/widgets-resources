import { createContext, useContext, useEffect } from "react";

export interface TreeViewBranchContextProps {
    level: number;
    informParentToHaveChildNodes: (hasChildNodes: boolean) => void;
    childShouldShowPlaceholder: boolean;
}

export const TreeViewBranchContext = createContext<TreeViewBranchContextProps>({
    level: 0,
    informParentToHaveChildNodes: () => null,
    childShouldShowPlaceholder: false
});

export const useInformParentContextToHaveChildNodes = (
    nodes: any[] | null,
    identifyParentIsTreeView: () => boolean
): void => {
    const { level, informParentToHaveChildNodes } = useContext(TreeViewBranchContext);
    useEffect(() => {
        if (level > 0 && nodes && identifyParentIsTreeView()) {
            informParentToHaveChildNodes(nodes.length > 0);
        }
    }, [nodes, level, informParentToHaveChildNodes, identifyParentIsTreeView]);
};
