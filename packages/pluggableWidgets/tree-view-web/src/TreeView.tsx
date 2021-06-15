import { createElement, FunctionComponent } from "react";
import { TreeViewContainerProps } from "../typings/TreeViewProps";
import { TreeView as TreeViewComponent } from "./components/TreeView";

export const TreeView: FunctionComponent<TreeViewContainerProps> = _props => {
    return <TreeViewComponent />;
};
