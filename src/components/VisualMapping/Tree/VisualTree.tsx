import TreeItem from "./TreeItem/TreeItem";
import { TreeNode } from "store/interfaces/IVisualMapping";

export default function VisualTree({
  treeNode,
  type,
}: {
  treeNode: TreeNode | undefined;
  type: "input" | "output";
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
      {treeNode && <TreeItem item={treeNode} type={type}></TreeItem>}
    </div>
  );
}
