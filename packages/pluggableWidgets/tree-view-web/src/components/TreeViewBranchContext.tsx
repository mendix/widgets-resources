import { createContext, useContext, useEffect } from "react";

export interface TreeViewBranchContextProps {
    level: number;
    informParentToHaveChildNodes: (hasChildNodes: boolean) => void;
}

export const TreeViewBranchContext = createContext<TreeViewBranchContextProps>({
    level: 0,
    informParentToHaveChildNodes: () => null
});

export const useInformParentContextToHaveChildNodes = (nodes: any[] | null): void => {
    const { level, informParentToHaveChildNodes } = useContext(TreeViewBranchContext);
    useEffect(() => {
        if (level > 0 && nodes) {
            informParentToHaveChildNodes(nodes.length > 0);
        }
    }, [nodes, level, informParentToHaveChildNodes]);
};
