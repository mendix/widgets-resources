import { GUID } from "mendix";
import { createElement, ReactElement, ReactNode } from "react";
import { mount, ReactWrapper } from "enzyme";
import { TreeView, TreeViewProps } from "../TreeView";

const items: TreeViewProps["items"] = [
    { id: "11" as GUID, value: "First header", content: <div>First content</div> },
    { id: "22" as GUID, value: "Second header", content: <div>Second content</div> },
    { id: "33" as GUID, value: "Third header", content: <div>Third content</div> }
];

const defaultProps: TreeViewProps = {
    name: "",
    class: "",
    items: [],
    isUserDefinedLeafNode: false,
    shouldLazyLoad: false,
    startExpanded: false,
    showCustomIcon: false,
    iconPlacement: "right",
    expandIcon: null,
    collapseIcon: null
};

describe("TreeView", () => {
    it("shows everything properly when starting expanded", () => {
        const treeView = mount(
            <TreeView {...defaultProps} class="" items={items} isUserDefinedLeafNode={false} startExpanded />
        );

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
        const treeView = mount(
            <TreeView {...defaultProps} class="" items={items} isUserDefinedLeafNode={false} startExpanded={false} />
        );

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
        const treeView = mount(
            <TreeView {...defaultProps} class="" items={newItems} isUserDefinedLeafNode={false} startExpanded />
        );

        // There is not really another way to properly identify that we're dealing with tree view branches.
        const treeViewBranches = treeView.find(".widget-tree-view-branch");
        expect(treeViewBranches).toHaveLength(newItems.length);

        expect(treeViewBranches.at(3).html()).toContain("<div>This is the 44 header</div>");
        expect(treeViewBranches.at(3).text()).toContain("Fourth content");
    });

    it("shows the tree view headers in the correct order as a button when not defined as a leaf node", () => {
        const treeView = mount(
            <TreeView {...defaultProps} class="" items={items} isUserDefinedLeafNode={false} startExpanded={false} />
        );

        const treeViewHeaders = treeView.find('[role="button"]');

        expect(treeViewHeaders).toHaveLength(items.length);
        items.forEach(item => {
            expect(treeView.text()).toContain(item.value);
        });
    });

    it("does not render the tree view headers as a button when defined as a leaf node", () => {
        const treeView = mount(
            <TreeView {...defaultProps} class="" items={items} isUserDefinedLeafNode startExpanded={false} />
        );

        const treeViewHeaders = treeView.find('[role="button"]');

        expect(treeViewHeaders).toHaveLength(0);
        items.forEach(item => {
            expect(treeView.text()).toContain(item.value);
        });
    });

    it("correctly collapses and expands the tree view branch content when clicking on the header", () => {
        const treeView = mount(
            <TreeView {...defaultProps} class="" items={items} isUserDefinedLeafNode={false} startExpanded={false} />
        );

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
        const treeView = mount(
            <TreeView {...defaultProps} class="" items={items} isUserDefinedLeafNode={false} startExpanded={false} />
        );

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

    const customIconProps: Partial<TreeViewProps> = {
        showCustomIcon: true,
        expandIcon: { type: "glyph", iconClass: "expand-icon" },
        collapseIcon: { type: "image", iconUrl: "collapse-image" }
    };

    function getExpandIconFromBranchHeader(header: ReactWrapper<any>): ReactWrapper<any> {
        return header.findWhere(
            node => node.type() === "span" && node.hasClass("glyphicon") && node.hasClass("expand-icon")
        );
    }

    function getCollapseImageFromBranchHeader(header: ReactWrapper<any>): ReactWrapper<any> {
        return header.findWhere(node => node.type() === "img" && node.prop("src") === "collapse-image");
    }

    it("shows custom the expand and close icon accordingly", () => {
        const treeView = mount(
            <TreeView
                {...defaultProps}
                {...customIconProps}
                class=""
                items={items}
                isUserDefinedLeafNode={false}
                startExpanded={false}
            />
        );

        // There is not really another way to properly identify that we're dealing with tree view branches.
        const treeViewBranches = treeView.find(".widget-tree-view-branch");
        const firstTreeViewBranchHeader = treeViewBranches.at(0).find("header");

        expect(firstTreeViewBranchHeader).toHaveLength(1);
        expect(firstTreeViewBranchHeader.text()).toContain("First header");

        expect(getExpandIconFromBranchHeader(firstTreeViewBranchHeader)).toHaveLength(1);
        expect(getCollapseImageFromBranchHeader(firstTreeViewBranchHeader)).toHaveLength(0);

        firstTreeViewBranchHeader.simulate("click");

        const updatedFirstHeader = treeView.find(".widget-tree-view-branch").at(0).find("header");

        expect(getExpandIconFromBranchHeader(updatedFirstHeader)).toHaveLength(0);
        expect(getCollapseImageFromBranchHeader(updatedFirstHeader)).toHaveLength(1);
    });

    it("is not clickable and doesn't show an icon when its child has no nodes", () => {
        const nestedItems: TreeViewProps["items"] = [
            {
                id: "11" as GUID,
                value: "Parent treeview with a nested treeview that is empty",
                content: (
                    <TreeView
                        {...defaultProps}
                        class=""
                        items={[]}
                        isUserDefinedLeafNode={false}
                        startExpanded={false}
                    />
                )
            }
        ];

        const treeView = mount(
            <TreeView
                {...defaultProps}
                {...customIconProps}
                class=""
                items={nestedItems}
                isUserDefinedLeafNode={false}
                startExpanded
            />
        );

        const parentTreeViewHeader = treeView.findWhere(
            node => node.type() === "header" && node.text().includes("Parent treeview")
        );
        expect(parentTreeViewHeader).toHaveLength(1);
        expect(parentTreeViewHeader.getDOMNode().getAttribute("role")).not.toBe("button");
        expect(getExpandIconFromBranchHeader(parentTreeViewHeader)).toHaveLength(0);
        expect(getCollapseImageFromBranchHeader(parentTreeViewHeader)).toHaveLength(0);
    });

    it("is clickable and shows an icon when its child has nodes", () => {
        const nestedItems: TreeViewProps["items"] = [
            {
                id: "11" as GUID,
                value: "Parent treeview with a nested treeview that is filled",
                content: (
                    <TreeView
                        {...defaultProps}
                        class=""
                        items={items}
                        isUserDefinedLeafNode={false}
                        startExpanded={false}
                    />
                )
            }
        ];

        const treeView = mount(
            <TreeView
                {...defaultProps}
                {...customIconProps}
                class=""
                items={nestedItems}
                isUserDefinedLeafNode={false}
                startExpanded
            />
        );

        const parentTreeViewHeader = treeView.findWhere(
            node => node.type() === "header" && node.text().includes("Parent treeview")
        );

        expect(parentTreeViewHeader).toHaveLength(1);
        expect(parentTreeViewHeader.getDOMNode().getAttribute("role")).toBe("button");

        expect(getExpandIconFromBranchHeader(parentTreeViewHeader)).toHaveLength(0);
        expect(getCollapseImageFromBranchHeader(parentTreeViewHeader)).toHaveLength(1);
    });

    it("does not influence the parent if it is not immediately in the chain", () => {
        const RandomOtherWidget = ({ children }: { children: ReactNode }): ReactElement => <div>{children}</div>;
        const nestedItems: TreeViewProps["items"] = [
            {
                id: "11" as GUID,
                value: "Parent treeview with a nested treeview that is empty and wrapped with a random other widget",
                content: (
                    <RandomOtherWidget>
                        <TreeView
                            {...defaultProps}
                            class=""
                            items={[]}
                            isUserDefinedLeafNode={false}
                            startExpanded={false}
                        />
                    </RandomOtherWidget>
                )
            }
        ];

        const treeView = mount(
            <TreeView
                {...defaultProps}
                {...customIconProps}
                class=""
                items={nestedItems}
                isUserDefinedLeafNode={false}
                startExpanded
            />
        );

        const parentTreeViewHeader = treeView.findWhere(
            node => node.type() === "header" && node.text().includes("Parent treeview")
        );

        expect(parentTreeViewHeader).toHaveLength(1);
        expect(parentTreeViewHeader.getDOMNode().getAttribute("role")).toBe("button");

        expect(getExpandIconFromBranchHeader(parentTreeViewHeader)).toHaveLength(0);
        expect(getCollapseImageFromBranchHeader(parentTreeViewHeader)).toHaveLength(1);
    });

    it("is treated as a leaf node even if the user does not specify as a leaf but also dont specify content", () => {
        const treeView = mount(
            <TreeView
                {...defaultProps}
                {...customIconProps}
                class=""
                items={[{ id: "11" as GUID, value: "First header", content: undefined }]}
                isUserDefinedLeafNode={false}
                startExpanded
            />
        );

        const treeViewHeader = treeView.findWhere(
            node => node.type() === "header" && node.text().includes("First header")
        );

        expect(treeViewHeader).toHaveLength(1);
        expect(treeViewHeader.getDOMNode().getAttribute("role")).not.toBe("button");
    });
});
