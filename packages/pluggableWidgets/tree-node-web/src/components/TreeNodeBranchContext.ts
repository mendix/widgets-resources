import { createContext, useContext, useEffect } from "react";

export interface TreeNodeBranchContextProps {
    level: number;
    informParentOfChildNodes: (numberOfNodes: number | undefined) => void;
}

export const TreeNodeBranchContext = createContext<TreeNodeBranchContextProps>({
    level: 0,
    informParentOfChildNodes: () => null
});

export const useInformParentContextOfChildNodes = (
    nodes: any[] | null,
    identifyParentIsTreeNode: () => boolean
): void => {
    const { level, informParentOfChildNodes } = useContext(TreeNodeBranchContext);
    useEffect(() => {
        if (level > 0 && identifyParentIsTreeNode()) {
            informParentOfChildNodes(nodes?.length);
        }
    }, [nodes, level, informParentOfChildNodes, identifyParentIsTreeNode]);
};
