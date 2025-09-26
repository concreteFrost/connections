import { TreeNode } from "store/types/visualMapping";

export const xmlToTree = (node: Element): TreeNode => {
  const text =
    node.childNodes.length === 1 && node.childNodes[0].nodeType === 3
      ? node.textContent?.trim()
      : undefined;

  const children: any[] = Array.from(node.children).map(xmlToTree);

  const nodeObj: any = {
    name: node.nodeName,
    ...(text ? { value: text } : {}),
    ...(children.length ? { children } : {}),
  };

  if (node.attributes.length > 0) {
    Array.from(node.attributes).forEach((attr) => {
      children.push({ name: `@${attr.name}`, value: attr.value });
    });
    if (children.length) nodeObj.children = children;
  }

  return nodeObj;
};

export const jsonToTree = (obj: any, key: string = "root"): TreeNode => {
  if (obj === null || typeof obj !== "object") {
    return { name: key, value: obj };
  }

  if (Array.isArray(obj)) {
    return {
      name: key,
      children: obj.map((item, index) => jsonToTree(item, `${index}`)),
    };
  }

  // объект
  return {
    name: key,
    children: Object.entries(obj).map(([k, v]) => jsonToTree(v, k)),
  };
};
