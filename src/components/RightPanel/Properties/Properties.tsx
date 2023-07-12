import s from "./Properties.module.scss";
import useStore from "../../../store/store";
import blockType from "../../../store/types/blockTypes";

function Properties() {

    const propertiesData = useStore(state => state.rightPanel.base)
    const parameters = useStore((state) => state.rightPanel.parameters)

    const setNodeName = useStore(state => state.setNodeName);
    const setNodeColor = useStore(state => state.setNodeColor);
    const setNodeDescription = useStore(state => state.setNodeDescription);
    const setBlockProperty = useStore(state => state.setBlockProperty)

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
            <ul className={s.block_section}>
                {parameters.length > 0 ? Object.entries(parameters).map(([key, val]: Array<any>) =>
                    <li key={key}>
                        <label className={s.input_label}>{val.name}</label>
                        <input type={val.inputType}
                            required={val.constraints > 0 ? true : false}
                            value={val.value}
                            checked={val.value === "Y" ? true : false}
                            placeholder={val.format}
                            onChange={(e: any) => setBlockProperty(val.name, e.target.value)} />
                    </li>) : null}
            </ul>
        </div>
    </section>)
}

export default Properties;