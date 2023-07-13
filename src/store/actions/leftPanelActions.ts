import { v4 as uuidv4 } from 'uuid';
import { NodeType } from "../types/nodeTypes";
import blockType from '../types/blockTypes';
import { array } from 'yargs';

function setDefaultValueAndFormat(dataType: number) {

    switch (dataType) {
        case 0:
            return blockType.string
        case 1:
            return blockType.integer
        case 2:
            return blockType.float
        case 3:
            return blockType.dateTime
        case 4:
            return blockType.boolean
        case 5:
            return blockType.booleanYN
        case 6:
            return blockType.execution
        case 7:
            return blockType.bigInt
        case 8:
            return blockType.blockRef
        default:
            return blockType.default

    }
}


export const getNodesList = (set: any) => (data: any) => {

    const updatedNodesList = []

    for (let d of data) {
 
        updatedNodesList.push({
            type: 'pointer', data: {
                name: d.name,
                blockVersion:"4.1.8",
                blockLabel: d.name,
                blockType:"",
                description: d.description,
                typeName: d.libraryType,
                baseTypeName: d.category,
                color: '#FFFFFF',
                icon: d.name.toLowerCase().split(' ').join('_'),
                parameters: d.parameters.map((parameter: any) => {
                    return{
                    name: parameter.name,         
                    value: setDefaultValueAndFormat(parameter.dataType)?.value,
                    required: parameter.constraints > 0 ? true : false,
                    format: setDefaultValueAndFormat(parameter.dataType)?.format,
                    placeholder : setDefaultValueAndFormat(parameter.dataType)?.placeholder,
                    inputType: setDefaultValueAndFormat(parameter.dataType).inputType
                    }
                })
            }
        })
    }
    
    set({ nodeList: updatedNodesList })

}

export const addNode =
    (get: any, set: any) => (type: NodeType, posX: number, posY: number) => {
        const newNode = {
            id: uuidv4().toString(),
            type: type.type,
            data: type.data,
            position: { x: posX, y: posY },
        };

        set((state: any) => ({
            nodes: [...state.nodes, newNode],
        }));

        // console.log(get().nodes)
    };
