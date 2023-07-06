import { NodeRemoveChange, NodeProps } from 'react-flow-renderer';
import { v4 as uuidv4 } from 'uuid';

export const getAllSelectedNodes = (nodes: any) => {
    let nodeCount = 0;
    for (var node of nodes) {
        if (node.hasOwnProperty("selected")) {
            if (node.selected === true)
                nodeCount++;

        }
    }

    if (nodeCount > 1) {
        return true;
    }

    return false;
};

export const addGroup = (get: any, set: any) => () => {
    console.log(get().nodes)
    if (getAllSelectedNodes(get().nodes)) {
        let maxX = -Infinity;
        let minX = Infinity;
        let maxY = -Infinity;
        let minY = Infinity;
        for (var node of get().nodes) {
            if (node.selected) {
                if (maxX < node.position.x) {
                    maxX = node.position.x
                }
                if (minX > node.position.x) {
                    minX = node.position.x
                }
                if (maxY < node.position.y) {
                    maxY = node.position.y
                }
                if (minY > node.position.y) {
                    minY = node.position.y
                }

            }
        }

        const boundX = maxX - minX + 200;
        const boundY = maxY - minY + 100;

        const newGroupNode = {
            id: uuidv4().toString(),
            type: 'group',
            data: { label: "New Group", children: [] },
            position: { x: minX - 20, y: minY - 20 },
            style: { backgroundColor: "rgb(74, 148, 190,0.1)", width: boundX, height: boundY, zIndex: 0 },
        }
        assignParent(get().nodes, newGroupNode)
        set((state: any) => ({
            nodes: [...state.nodes, newGroupNode]
        }));
    }
};

const assignParent = (nodes: Node[], nodeGroup: any) => {
    const selectedNodes = nodes.filter((n: any) => n.selected === true);

    selectedNodes.forEach((n: any) => {
        n.parentNode = nodeGroup.id;
        nodeGroup.data.children.push(n.id)
        // n.extent = 'parent'
        n.position.x -= nodeGroup.position.x;
        n.position.y -= nodeGroup.position.y;
    });
};

export const deleteGroup = (nodes: any, change: NodeRemoveChange) => {

    const groupToRemove = nodes.find((n: NodeProps) => n.id === change.id)!;
    nodes.forEach((n: any) => {
        if (n.parentNode == groupToRemove.id) {
            n.position.x += groupToRemove.position.x;
            n.position.y += groupToRemove.position.y;
            n.parentNode = null

        }
    }
    )



}

