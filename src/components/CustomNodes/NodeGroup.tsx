import { Handle, NodeProps, Position } from 'react-flow-renderer';
import s from "./NodeGroup.module.scss";

export default function NodeGroup({ id, data }: NodeProps) {

    return (
        <div className={s.wrapper}>
            <div className={s.title}><h3>{data.label}</h3></div>

        </div>
    );
}
