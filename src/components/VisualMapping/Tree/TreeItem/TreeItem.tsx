import { v4 as uuid } from "uuid";
import s from "./TreeItem.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { TreeNode } from "shared/interfaces/IVisualMapping";

export default function TreeItem({
  item,
  level = 0,
  type,
  path = "", // путь от корня
}: {
  item: TreeNode;
  level?: number;
  type: "input" | "output";
  path?: string;
}) {
  const isParent = !!item.children;
  const [isOpen, setOpen] = useState<boolean>(true);

  const currentPath = path ? `${path}/${item.name}` : item.name;

  function handleDragStart(e: React.DragEvent) {
    // Передаём строку пути
    e.dataTransfer.setData(
      "treeItem",
      JSON.stringify({
        name: item.name,
        valueType: item.value,
        docPath: currentPath,
        type,
      })
    );
  }

  return (
    <div className={s.wrapper}>
      <div
        draggable={!isParent}
        onDragStart={handleDragStart}
        style={{ marginLeft: level * 20, display: "flex", gap: 10 }}
        className={clsx(s.item, { [s.clickable]: isParent })}
        onClick={() => isParent && setOpen((prev) => !prev)}
      >
        {isParent && <span className={s.arrow}>{isOpen ? "▾" : "▸"}</span>}
        <span className={clsx(s.item_name, isParent ? s.parent : s.child)}>
          {item.name}
        </span>
        {item.value && <span>({item.value})</span>}
      </div>

      {isParent && isOpen && (
        <div className={s.children}>
          {item.children?.map((i: TreeNode) => (
            <TreeItem
              item={i}
              key={uuid()}
              level={level + 1}
              type={type}
              path={currentPath} // прокидываем текущий путь
            />
          ))}
        </div>
      )}
    </div>
  );
}
