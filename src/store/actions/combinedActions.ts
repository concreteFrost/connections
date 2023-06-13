import { getNodeBase,setNodeColor,setNodeDescription,setNodeName } from "./rightPanelActions";
import {addNode, setSelectedNodeID, onNodesChange} from "./nodeActions";
import { handleConnect, onEdgesChange, onEdgesConnect } from "./edgesActions";

export const nodeActions={
    addNode : addNode,
    setSelectedNodeID : setSelectedNodeID,
    onNodesChange : onNodesChange
}

export const rightPanelActions = {
    getNodeBase : getNodeBase,
    setNodeColor : setNodeColor,
    setNodeDescription : setNodeDescription,
    setNodeName : setNodeName
}

export const edgeActions = {
    handleConnect : handleConnect,
    onEdgesChange:onEdgesChange,
    onEdgesConnect: onEdgesConnect

}
    

