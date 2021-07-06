import { GUID } from "mendix";
import { createElement } from "react";
import { mount } from "enzyme";
import { TreeView, TreeViewProps } from "../TreeView";

const items: TreeViewProps["items"] = [
    { id: "11" as GUID, value: "First header", content: <div>First content</div> },
    { id: "22" as GUID, value: "Second header", content: <div>Second content</div> },
    { id: "33" as GUID, value: "Third header", content: <div>Third content</div> }
];

describe("TreeView", () => {
    it("shows everything properly when starting expanded", () => {
        const treeView = mount(<TreeView class="" items={items} isUserDefinedLeafNode={false} startExpanded />);

        // There is not really another way to properly identify that we're dealing with tree view branches.
        const treeViewBranches = treeView.find(".widget-tree-view-branch");
        expect(treeViewBranches).toHaveLength(items.length);

        expect(treeViewBranches.at(0).text()).toContain("First header");
        expect(treeViewBranches.at(1).text()).toContain("Second header");
        expect(treeViewBranches.at(2).text()).toContain("Third header");

        expect(treeViewBranches.at(0).text()).toContain("First content");
        expect(treeViewBranches.at(1).text()).toContain("Second content");
        expect(treeViewBranches.at(2).text()).toContain("Third content");
    });

    it("does not show the tree view item content when not starting expanded", () => {
        const treeView = mount(<TreeView class="" items={items} isUserDefinedLeafNode={false} startExpanded={false} />);

        // There is not really another way to properly identify that we're dealing with tree view branches.
        const treeViewBranches = treeView.find(".widget-tree-view-branch");
        expect(treeViewBranches).toHaveLength(items.length);

        expect(treeViewBranches.at(0).text()).toContain("First header");
        expect(treeViewBranches.at(1).text()).toContain("Second header");
        expect(treeViewBranches.at(2).text()).toContain("Third header");

        expect(treeViewBranches.at(0).text()).not.toContain("First content");
        expect(treeViewBranches.at(1).text()).not.toContain("Second content");
        expect(treeViewBranches.at(2).text()).not.toContain("Third content");
    });

    it("handles tree headers properly even if they are composed with widgets", () => {
        const newItems = [
            ...items,
            { id: "44" as GUID, value: <div>This is the 44 header</div>, content: <div>Fourth content</div> }
        ];
        const treeView = mount(<TreeView class="" items={newItems} isUserDefinedLeafNode={false} startExpanded />);

        // There is not really another way to properly identify that we're dealing with tree view branches.
        const treeViewBranches = treeView.find(".widget-tree-view-branch");
        expect(treeViewBranches).toHaveLength(newItems.length);

        expect(treeViewBranches.at(3).html()).toContain("<div>This is the 44 header</div>");
        expect(treeViewBranches.at(3).text()).toContain("Fourth content");
    });

    it("shows the tree view headers in the correct order as a button when not defined as a leaf node", () => {
        const treeView = mount(<TreeView class="" items={items} isUserDefinedLeafNode={false} startExpanded={false} />);

        const treeViewHeaders = treeView.find('[role="button"]');

        expect(treeViewHeaders).toHaveLength(items.length);
        items.forEach(item => {
            expect(treeView.text()).toContain(item.value);
        });
    });

    it("does not render the tree view headers as a button when defined as a leaf node", () => {
        const treeView = mount(<TreeView class="" items={items} isUserDefinedLeafNode startExpanded={false} />);

        const treeViewHeaders = treeView.find('[role="button"]');

        expect(treeViewHeaders).toHaveLength(0);
        items.forEach(item => {
            expect(treeView.text()).toContain(item.value);
        });
    });

    it("correctly collapses and expands the tree view branch content when clicking on the header", () => {
        const treeView = mount(<TreeView class="" items={items} isUserDefinedLeafNode={false} startExpanded={false} />);

        expect(treeView.text()).not.toContain("Second content");

        const treeViewHeaders = treeView.find('[role="button"]');
        expect(treeViewHeaders).toHaveLength(3);

        const secondTreeViewHeader = treeViewHeaders.at(1);
        // expand
        secondTreeViewHeader.simulate("click");
        expect(treeView.text()).toContain("Second content");

        // collapse
        secondTreeViewHeader.simulate("click");
        expect(treeView.text()).not.toContain("Second content");
    });

    it("correctly collapses and expands the tree view branch content when interacting through the keyboard", () => {
        const treeView = mount(<TreeView class="" items={items} isUserDefinedLeafNode={false} startExpanded={false} />);

        expect(treeView.text()).not.toContain("Second content");

        const treeViewHeaders = treeView.find('[role="button"]');
        expect(treeViewHeaders).toHaveLength(3);

        const secondTreeViewHeader = treeViewHeaders.at(1);
        // expand
        secondTreeViewHeader.simulate("keydown", { key: "Enter" });
        expect(treeView.text()).toContain("Second content");

        // collapse
        secondTreeViewHeader.simulate("keydown", { key: " " });
        expect(treeView.text()).not.toContain("Second content");
    });
});
