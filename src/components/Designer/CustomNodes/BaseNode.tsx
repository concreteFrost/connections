import s from "./BaseNode.module.scss";
import useStore from "store/store";
import { useEffect, useMemo, useState, useCallback } from "react";
import { connectionsIcons } from "../../../assets/icons/icons";
import { Position, Handle } from "react-flow-renderer";
import { isDarkBackground } from "store/actions/utils/nodeUtils";
import { Node, NodeProps } from "reactflow";
import { Directive } from "store/interfaces/IAlerts";
import { BlockData } from "store/interfaces/IBlock";
import { shallow } from "zustand/shallow";
import React from "react";

interface BlockVisual{
  blockName:string,
  blockLabel:string
}

const BaseNode = (props: NodeProps) => {
  const { deleteBlock, setDirective, getBlockProperties,getParameterValue,toggleConfirmationModal, setConfirmationModalActions, flow, directives, blockData } = useStore(
    (state) => ({
      deleteBlock: state.flowSlice.deleteBlock,
      setDirective: state.flowSlice.setDirective,
      getBlockProperties: state.flowSlice.getBlockProperties,
      getParameterValue: state.designerVisualElementsSlice.getParameterValue,
      toggleConfirmationModal:state.modalWindowsSlice.toggleConfirmationModal,
      setConfirmationModalActions:state.modalWindowsSlice.setConfirmationModalActions,
      flow: state.flowSlice.flow,
      directives: state.alertSlice.directives,
      blockData: state.flowSlice.flow.blockData

    }),
    shallow
  );

  const block = blockData.find(b => b.blockIdentifier === props.id);
  const blockName = block?.name;
  const blockLabel = block?.blockLabel;

  const [isOutlined, setIsOutlined] = useState(false);


  const selectedBlockId = useMemo(() => {
    const selectedBlock = flow.visual.blocks.find((b: Node<any>) => b.selected);
    return selectedBlock ? selectedBlock.id : null;
  }, [flow.visual.blocks]);

  const matchedIcon = useMemo(() => {
    return Object.entries(connectionsIcons.nodeIcons).find(
      ([key]) => key === props.data.icon.toLowerCase()
    )?.[1];
  }, [props.data.icon]);

  useEffect(() => {
    setIsOutlined(selectedBlockId === props.id);
  }, [selectedBlockId, props.id]);

  const getDefaultBlockDirective = useCallback(() => {
    const dir = flow.blockData.find(
      (block: BlockData) => block.blockIdentifier === props.id
    )?.ehDirective;
    return dir ? dir : "undefined";
  }, [flow.blockData, props.id]);

  const handleDeleteClick = useCallback(() => {
    setConfirmationModalActions(deleteBlock);
    toggleConfirmationModal(
      true,
      `You are about to delete block. Would you like to proceed?`
    );
  }, [
    deleteBlock,
    toggleConfirmationModal,
    setConfirmationModalActions,
    blockLabel,
  ]);

  const handleNodeClick = useCallback(() => {
    getParameterValue("", "");
    getBlockProperties();
  }, [getParameterValue, getBlockProperties]);

  return (
    <div
      className={`${s.node_wrapper} ${
        isOutlined ? s["outlined"] : s["standart"]
      }`}
    >
      {isOutlined ? (
        <div className={s.delete_btn_wrapper}>
          <button onClick={handleDeleteClick}>x</button>
        </div>
      ) : null}
      <div
        onClick={handleNodeClick}
        className={`${s.node_body} ${
          isDarkBackground(props.data.color) ? s["dark-text"] : s["light-text"]
        }`}
        style={{ backgroundColor: props.data.color, zIndex: 999999 }}
      >
        <div className={s.node_icon_container}>
          <div className={`${s.node_icon} ${isDarkBackground(props.data.color) ? s["dark-text"] : s["light-text"]}`}>{matchedIcon}</div>
        </div>
        <div className={s.node_title}>{blockName}</div>
        <div className={s.node_label}>{blockLabel}</div> 
        <div className={s.directions_wrapper}>
          {getDefaultBlockDirective() !== "undefined" ? (
            <select
              value={getDefaultBlockDirective()}
              onChange={(e) => setDirective(e.target.value)}
            >
              <option value="null">Select Directive</option>
              {directives.length > 0 ? (
                directives.map((directive: Directive) => (
                  <option
                    key={directive.ehControlId}
                    value={directive.ehControlId}
                  >
                    {directive.name}
                  </option>
                ))
              ) : (
                <option value={"null"}>-</option>
              )}
            </select>
          ) : null}
        </div>
        <Handle
          type="source"
          position={Position.Right}
          className={`${s.handle} ${s.right}`}
        />
        <Handle
          type="target"
          position={Position.Left}
          className={`${s.handle} ${s.left}`}
        />
        {props.data.children}
      </div>
    </div>
  );
};

export default React.memo(BaseNode);
