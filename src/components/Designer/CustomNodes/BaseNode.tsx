// BaseNode component
import s from "./BaseNode.module.scss";
import useStore from "../../../store/store";
import { useEffect, useMemo, useState } from "react";
import { connectionsIcons } from "../../../assets/icons/icons";
import { Position, Handle } from "react-flow-renderer";
import { isDarkBackground } from "../../../store/actions/utils/nodeUtils";
import { Node } from "reactflow";
import { Directive } from "../../../store/interfaces/IAlerts";
import { BlockData } from "../../../store/interfaces/IBlock";

interface Block {
  blockLabel: string;
  name: string
}

export default function BaseNode(props: any) {

  const getParameterValue = useStore((state) => state.designerVisualElementsSlice.getParameterValue);
  const {deleteBlock, setDirective, getBlockProperties, flow } = useStore((state) => state.flowSlice);
  const [isOutlined, setIsOutlined] = useState(false);

  const blockData: Block[] = useStore((state) => state.flowSlice.flow.blockData);
  const blockName = blockData.find((b: any) => b.blockIdentifier === props.id)?.name;
  const blockLabel = blockData.find((b: any) => b.blockIdentifier === props.id)?.blockLabel;

  const { directives } = useStore((state) => state.alertSlice);
  const { toggleConfirmationModal, setConfirmationModalActions } = useStore((state) => state.modalWindowsSlice);

  const selectedBlockId = useMemo(() => {
    const selectedBlock = flow.visual.blocks.find((b: Node<any>) => b.selected);
    return selectedBlock ? selectedBlock.id : null;
  }, [flow.visual.blocks]);

  const matchedIcon = useMemo(() => Object.entries(connectionsIcons.nodeIcons).find(
    ([key]) => key === props.icon.toLowerCase()
  )?.[1], [props.icon])

  useEffect(() => {
    setIsOutlined(selectedBlockId === props.id);
  }, [selectedBlockId, props.id]);

  const getDefaultBlockDirective = () => {
    const dir = flow.blockData.find((block: BlockData) => block.blockIdentifier === props.id)?.ehDirective;
    return dir ? dir : "undefined"
  }

  return (
    <div className={`${s.node_wrapper} ${isOutlined ? s["outlined"] : s["standart"]}`}>
      {isOutlined ? <div className={s.delete_btn_wrapper}><button onClick={() => {
        setConfirmationModalActions(deleteBlock)
        toggleConfirmationModal(true, `You are about to delete ${blockLabel} block. Would you like to proceed?`)
      }}>x</button></div> : null}
      <div
        onClick={() => {
          getParameterValue('', '')
          getBlockProperties()
        }
        }
        className={`${s.node_body} ${isDarkBackground(props.data.color) ? s["dark-text"] : s["light-text"]
          }`}
        style={{ backgroundColor: props.data.color, zIndex: 999999 }}
      >
        <div className={s.node_icon_container}>
          <div className={`${s.node_icon} ${isDarkBackground(props.data.color) ? s["dark-text"] : s["light-text"]
            }`}>{matchedIcon}</div>
        </div>
        <div className={s.node_title}>{blockName}</div>
        <div className={s.node_label}>{blockLabel}</div>
        <div className={s.directions_wrapper}>
          {getDefaultBlockDirective() !== "undefined" ? <select value={getDefaultBlockDirective()} onChange={(e) => setDirective(e.target.value)}>
            <option value="null">Select Directive</option>
            {directives.length > 0 ? directives.map((directive: Directive) => <option key={directive.ehControlId} value={directive.ehControlId}>{directive.name}</option>) : <option value={"null"}>-</option>}
          </select> : null}
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
        {props.children}
      </div>
    </div>
  );
}
