import TreeItem from "./TreeItem/TreeItem";
import { TreeNode } from "store/types/visualMapping";

export default function VisualTree({
  treeNode,
}: {
  treeNode: TreeNode | undefined;
}) {
  return (
    <div
      style={{
        overflowX: "hidden",
        height: "90vh",
        overflowY: "auto",
        marginBottom: 100,
      }}
    >
      {treeNode && <TreeItem item={treeNode}></TreeItem>}
    </div>
  );
}
