import { NodeProps } from 'react-flow-renderer';
import s from "./NodeGroup.module.scss";
import { connectionsIcons } from '../../../icons/icons';
import useStore from '../../../store/store';


export default function NodeGroup({ id, data }: NodeProps) {

    const showGroupModal = useStore((state) => state.showGroupModal);
    const setGroupColor = useStore((state) => state.setGroupColor);
    const setGroupLabel = useStore((state) => state.setGroupLabel);
    const deleteGroupOnButtonClick = useStore((state) => state.deleteGroupOnButtonClick);


    return (
        <div className={s.wrapper}  >
            <div className={s.title}><h3>{data.label}</h3></div>
            <div className={s.icon_set}>
                <ul >
                    <li onClick={() => showGroupModal(id, 'textModal')}>{connectionsIcons.text}</li>
                    <li onClick={() => showGroupModal(id, 'colorModal')}>{connectionsIcons.pallete}</li>
                    <li onClick={() => { deleteGroupOnButtonClick(id) }} className={s.icon_delete}>{connectionsIcons.delete}</li>
                </ul>
            </div>
            {data.isTextModalVisible ? <div className={s.text_input_wrapper}>
                <label htmlFor="">New group name</label>
                <input type="text" value={data.label} onChange={(e: any) => { setGroupLabel(id, e.target.value) }} />
                <button onClick={() => showGroupModal(id, '')}>apply</button>
            </div> : null}
            {data.isColorModalVisible ? <div className={s.text_input_wrapper}>
                <label htmlFor="">Group color</label>
                <input type="color" value={data.color.split('2a')[0]} onChange={(e: any) => { setGroupColor(id, e.target.value) }} />
                <button onClick={() => showGroupModal(id, '')}>apply</button>
            </div> : null}
        </div>
    );
}
