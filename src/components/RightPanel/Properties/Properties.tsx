import s from "./Properties.module.scss";
import useStore from "../../../store/store";

function Properties() {

    const propertiesData = useStore(state => state.rightPanel.base)

    const setNodeName = useStore(state => state.setNodeName);
    const setNodeColor = useStore(state => state.setNodeColor);
    const setNodeDescription = useStore(state => state.setNodeDescription);

    function _setNodeName(e: any) {
        setNodeName(e.target.value);
    }

    function _setNodeColor(e: any) {
        setNodeColor(e.target.value);
    }

    function _setNodeDescription(e: any) {
        setNodeDescription(e.target.value);
    }
    return (<section className={s.section_container}>
        <div className={s.section_header}>
            PROPERTIES
        </div>
        <div>
            <h5>BASE</h5>
            <ul>
                <li>
                    <label className={s.input_label} >Block Name</label>
                    <input type="text" placeholder="Block Name" value={propertiesData.blockName} onChange={(e: any) => _setNodeName(e)} />
                </li>
                <li>
                    <label className={s.input_label}>Color</label>
                    <div className={s.color_input}>
                        <input type="color" value={propertiesData.blockColor} onChange={(e: any) => _setNodeColor(e)} />
                    </div>
                </li>
                <li>
                    <label className={s.input_label}>Description</label>
                    <input type="text" placeholder="Description" value={propertiesData.blockDescription} onChange={(e: any) => _setNodeDescription(e)} />
                </li>
            </ul>
            <h5>BLOCK</h5>
            <ul>
                <li>
                    <label className={s.input_label}>Append</label>
                    <div className={s.radio}>
                        <div>
                            <label className={s.radio_label}>Yes</label>
                            <input type="radio" placeholder="Description" />
                        </div>
                        <div>
                            <label className={s.radio_label}>No</label>
                            <input type="radio" placeholder="Description" />
                        </div>

                    </div>
                </li>
                <li>
                    <label className={s.input_label}>Enabled</label>
                    <div className={s.radio}>
                        <div>
                            <label className={s.radio_label}>Yes</label>
                            <input type="radio" placeholder="Description" />
                        </div>
                        <div>
                            <label className={s.radio_label}>No</label>
                            <input type="radio" placeholder="Description" />
                        </div>
                    </div>
                </li>
                <li>
                    <label className={s.input_label}>EXEC Instruction</label>
                    <input type="text" placeholder="Instruction" />
                </li>
                <li>
                    <label className={s.input_label}>File Name</label>
                    <input type="text" placeholder="File Name" />
                </li>
                <li>
                    <label className={s.input_label}>Text</label>
                    <input type="text" placeholder="Text" />
                </li>
            </ul>
        </div>
    </section>)
}

export default Properties;