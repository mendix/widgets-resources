import { createContext, useContext, useEffect } from "react";

export interface TreeViewBranchContextProps {
    level: number;
    informParentOfChildNodes: (numberOfNodes: number | undefined) => void;
}

export const TreeViewBranchContext = createContext<TreeViewBranchContextProps>({
    level: 0,
    informParentOfChildNodes: () => null
});

export const useInformParentContextOfChildNodes = (
    nodes: any[] | null,
    identifyParentIsTreeView: () => boolean
): void => {
    const { level, informParentOfChildNodes } = useContext(TreeViewBranchContext);
    useEffect(() => {
        if (level > 0 && identifyParentIsTreeView()) {
            informParentOfChildNodes(nodes?.length);
        }
    }, [nodes, level, informParentOfChildNodes, identifyParentIsTreeView]);
};
