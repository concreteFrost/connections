// BaseNode component

import s from "./BaseNode.module.scss";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import { connectionsIcons } from "../../icons/icons";
import { Position, Handle } from "react-flow-renderer";

interface Block {
  blockLabel: string;
  name: string
}

function hexToRgb(hex: any) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

const isDarkBackground = (color: string) => {
  const rgb = hexToRgb(color);
  if (rgb) {
    const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
    return luminance < 0.5;
  }
  return false;
};

export default function BaseNode(props: any) {
  const setSelectedNodeId = useStore((state) => state.setSelectedNodeID);
  const getNodeData = useStore((state) => state.getNodeBase);
  const getNodeBase = useStore((state) => state.getBlockData);
  const selectedNodeId = useStore((state) => state.selectedNode);
  const [isOutlined, setIsOutlined] = useState(false);

  const blockData: Block[] = useStore((state) => state.flow.blockData);
  const blockName = blockData.find((b: any) => b.blockIdentifier === props.id)?.name;
  const blockLabel = blockData.find((b: any) => b.blockIdentifier === props.id)?.blockLabel;

  function _setSelectedNodeID() {
    setSelectedNodeId(props.id);
    getNodeData();
    getNodeBase();
  }

  useEffect(() => {
    selectedNodeId === props.id ? setIsOutlined(true) : setIsOutlined(false);
  }, [selectedNodeId]);

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
      <div
        onClick={_setSelectedNodeID}
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
