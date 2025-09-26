import { v4 as uuid } from "uuid";
import s from "./TreeItem.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { TreeNode } from "store/types/visualMapping";

export default function TreeItem({
  item,
  level = 0,
}: {
  item: TreeNode;
  level?: number;
}) {
  const isParent = !!item.children;
  const [isOpen, setOpen] = useState<boolean>(true);

  return (
    <div className={s.wrapper}>
      <div
        style={{ marginLeft: level * 20 }}
        className={clsx(s.item, { [s.clickable]: isParent })}
        onClick={() => {
          if (isParent) setOpen((prev) => !prev);
        }}
      >
        {isParent && <span className={s.arrow}>{isOpen ? "▾" : "▸"}</span>}
        <span className={clsx(s.item_name, isParent ? s.parent : s.child)}>
          {item.name}
        </span>
      </div>

      {isParent && isOpen && (
        <div className={s.children}>
          {item.children?.map((i: any) => (
            <TreeItem item={i} key={uuid()} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
