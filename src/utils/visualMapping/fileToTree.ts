import { TreeNode } from "store/interfaces/IVisualMapping";

export const xsdToTree = (node: Element): TreeNode => {
  const children: TreeNode[] = [];

  // Рекурсивный обход
  Array.from(node.children).forEach((child) => {
    const childTree = xsdToTree(child);

    // Если это служебный узел (complexType, sequence), прокидываем его детей выше
    if (["xs:complexType", "xs:sequence"].includes(child.nodeName)) {
      if (childTree.children) {
        children.push(...childTree.children);
      }
    } else {
      children.push(childTree);
    }
  });

  // Базовый объект
  const nodeObj: TreeNode = {
    name: node.nodeName.replace("xs:", ""),
    ...(children.length ? { children } : {}),
  };

  // Атрибут name → заменяет nodeName
  const nameAttr = node.getAttribute("name");
  if (nameAttr) {
    nodeObj.name = nameAttr;
  }

  // Атрибут type → кладём в value
  const typeAttr = node.getAttribute("type");
  if (typeAttr) {
    nodeObj.value = typeAttr.replace("xs:", "");
  }

  // Обрабатываем остальные атрибуты (ref, minOccurs и т.п.)
  // Array.from(node.attributes).forEach((attr) => {
  //   if (attr.name !== "name" && attr.name !== "type") {
  //     children.push({
  //       name: `@${attr.name}`,
  //       value: attr.value,
  //     });
  //   }
  // });
  if (children.length) nodeObj.children = children;

  return nodeObj;
};

function cleanBase64(str: string) {
  return str
    .replace(/(\r\n|\n|\r)/gm, "") // убираем переводы строк
    .replace(/ /g, "") // убираем пробелы
    .replace(/-/g, "+") // если вдруг web-safe base64
    .replace(/_/g, "/"); // если вдруг web-safe base64
}

export function decodeBase64(base64: string): string {
  const cleaned = cleanBase64(base64);

  // используем window.atob, но отлавливаем падение
  try {
    return atob(cleaned);
  } catch (e) {
    // если падает, пробуем через Buffer (Node.js или polyfill)
    return Buffer.from(cleaned, "base64").toString("utf-8");
  }
}

export function convertXSDToTreeNode(text: string): TreeNode {
  const decoded = decodeBase64(text);
  const parser = new DOMParser().parseFromString(
    decoded as string,
    "application/xml"
  );

  return xsdToTree(parser.documentElement);
}

// export const xmlToTree = (node: Element): TreeNode => {
//   const text =
//     node.childNodes.length === 1 && node.childNodes[0].nodeType === 3
//       ? node.textContent?.trim()
//       : undefined;

//   const children: any[] = Array.from(node.children).map(xmlToTree);

//   const nodeObj: any = {
//     name: node.nodeName,
//     ...(text ? { value: text } : {}),
//     ...(children.length ? { children } : {}),
//   };

//   if (node.attributes.length > 0) {
//     Array.from(node.attributes).forEach((attr) => {
//       children.push({ name: `@${attr.name}`, value: attr.value });
//     });
//     if (children.length) nodeObj.children = children;
//   }

//   return nodeObj;
// };

// export const jsonToTree = (obj: any, key: string = "root"): TreeNode => {
//   if (obj === null || typeof obj !== "object") {
//     return { name: key, value: obj };
//   }

//   if (Array.isArray(obj)) {
//     return {
//       name: key,
//       children: obj.map((item, index) => jsonToTree(item, `${index}`)),
//     };
//   }

//   // объект
//   return {
//     name: key,
//     children: Object.entries(obj).map(([k, v]) => jsonToTree(v, k)),
//   };
// };
