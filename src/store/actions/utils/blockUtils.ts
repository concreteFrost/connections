import { Node } from "react-flow-renderer";
import { RFState } from "../../types/rfState";
import { FlowSlice } from "../../slices/flowSlice";

export const blockAlignment = (get: () => RFState, selectedBlocks: Node<any>[], alignment: 'x' | 'y') => {
    const middleBlock = selectedBlocks.reduce((acc, curr) => {
        const accPosition = alignment === 'x' ? acc.position.x : acc.position.y;
        const currPosition = alignment === 'x' ? curr.position.x : curr.position.y;
        return (accPosition + acc.width!) / 2 > (currPosition + curr.width!) / 2 ? curr : acc;
    });

    const middlePosition = (middleBlock.position[alignment] + middleBlock.width!) / 2;

    const updatedBlocks = get().flowSlice.flow.visual.blocks.map((block: Node<any>) => {
        if (block.selected) {
            const delta = Math.floor(middlePosition - (block.position[alignment] + block.width! / 2));
            const newPosition = {
                x: alignment === 'x' ? block.position.x + delta : block.position.x,
                y: alignment === 'y' ? block.position.y + delta : block.position.y
            };
            return { ...block, position: newPosition };
        } else {
            return block;
        }
    });

    return updatedBlocks;
}


export const getSelectedBlock=(flowSlice: FlowSlice):Node<any>=>{
    return flowSlice.flow.visual.blocks.find((b:Node<any>)=> b.selected === true)!;
}