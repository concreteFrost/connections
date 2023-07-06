import { Handle, NodeProps, Position } from 'react-flow-renderer';
import s from "./NodeGroup.module.scss";
import { connectionsIcons } from '../../icons/icons';

export default function NodeGroup({ id, data }: NodeProps) {

    return (
        <div className={s.wrapper} onClick={() => console.log('data is', data)}>
            <div className={s.title}><h3>{data.label}</h3></div>
            <div className={s.icon_set}>
                <ul>
                    <li>{connectionsIcons.text}</li>
                    <li>{connectionsIcons.pallete}</li>
                    <li className={s.icon_delete}>{connectionsIcons.delete}</li>
                </ul>
            </div>
        </div>
    );
}
