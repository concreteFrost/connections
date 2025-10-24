export const getAllselectedBlockIDs = (nodes: any) => {
  return nodes.filter((node: any) => node.selected === true).length > 1;
};
