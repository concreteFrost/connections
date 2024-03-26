// BaseNode component
import s from "./BaseNode.module.scss";
import useStore from "../../../store/store";
import { useEffect, useState } from "react";
import { connectionsIcons } from "../../../icons/icons";
import { Position, Handle } from "react-flow-renderer";
import { isDarkBackground } from "../../../store/actions/utils/nodeUtils";
import { Node } from "reactflow";
import flowSlice from "../../../store/slices/flowSlice";

interface Block {
  blockLabel: string;
  name: string
}

export default function BaseNode(props: any) {

  const getParameterValue = useStore((state) => state.designerVisualElementsSlice.getParameterValue);
  const { deleteBlock } = useStore((state) => state.flowSlice);
  const { getBlockProperties } = useStore((state) => state.flowSlice);
  const blocks = useStore((state) => state.flowSlice.flow.visual.blocks);
  const [isOutlined, setIsOutlined] = useState(false);

  const blockData: Block[] = useStore((state) => state.flowSlice.flow.blockData);
  const blockName = blockData.find((b: any) => b.blockIdentifier === props.id)?.name;
  const blockLabel = blockData.find((b: any) => b.blockIdentifier === props.id)?.blockLabel;

  const { toggleConfirmationModal, setConfirmationModalActions } = useStore((state) => state.modalWindowsSlice);

  useEffect(() => {
    // selectedBlockId[0] === props.id ? setIsOutlined(true) : setIsOutlined(false);
    const selectedBlock = blocks.find((b: Node<any>) => b.selected);
    if (selectedBlock?.id === props.id) {
      setIsOutlined(true);
      return
    }
    setIsOutlined(false);
  }, [blocks]);


  const nodeBodyClasses = `${s.node_body} ${isDarkBackground(props.data.color) ? s["dark-text"] : s["light-text"]
    }`;
  const iconBodyClasses = `${s.node_icon} ${isDarkBackground(props.data.color) ? s["dark-text"] : s["light-text"]
    }`;
  const wrapperClasses = `${s.node_wrapper} ${isOutlined ? s["outlined"] : s["standart"]
    }`;

  const matchedIcon = Object.entries(connectionsIcons.nodeIcons).find(
    ([key]) => key === props.icon.toLowerCase()
  )?.[1];

  return (
    <div className={wrapperClasses}>
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
        className={nodeBodyClasses}
        style={{ backgroundColor: props.data.color, zIndex: 999999 }}
      >
        <div className={s.node_icon_container}>
          <div className={iconBodyClasses}>{matchedIcon}</div>
        </div>
        <div className={s.node_title}>{blockName}</div>
        <div className={s.node_label}>{blockLabel}</div>
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
