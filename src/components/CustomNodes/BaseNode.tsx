// BaseNode component

import s from "./BaseNode.module.scss";
import useStore from '../../store/store';
import {useEffect, useState} from "react";

export default function BaseNode(props: any) {
    const setSelectedNodeId = useStore(state => state.setSelectedNodeID);
    const getNodeData = useStore(state => state.getNodeBase);
    const selectedNodeId = useStore(state=>state.selectedNode);
    const [isOutlined,setIsOutlined] = useState(false)

    function _setSelectedNodeID() {
        setSelectedNodeId(props.id);
        getNodeData(props.data);
        
    }

    useEffect(()=>{
        selectedNodeId === props.id ?  setIsOutlined(true) : setIsOutlined(false)
    },[selectedNodeId])

    function hexToRgb(hex: any) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    const isDarkBackground = (color: string) => {
        const rgb = hexToRgb(color);
        if (rgb) {
            const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
            return luminance < 0.5;
        }
        return false; // Return false for invalid colors
    };

    const nodeBodyClasses = `${s.node_body} ${isDarkBackground(props.data.color) ? s['dark-text'] : s['light-text']}`;
    const iconBodyClasses = `${s.node_icon} ${isDarkBackground(props.data.color) ? s['dark-text'] : s['light-text']}`;
    const wrapperClasses = `${s.node_wrapper} ${isOutlined ? s['outlined'] : s['standart']}`

    return (
        <div className={wrapperClasses}>
        <div onClick={_setSelectedNodeID} className={nodeBodyClasses} style={{ backgroundColor: props.data.color }}>
            <div className={s.node_icon_container}>
                <div className={iconBodyClasses}>{props.icon}</div>
            </div>
            <div className={s.node_title}>{props.data.title}</div>
            {props.children}
        </div>
        </div>
    );
}
