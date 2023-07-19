import s from "./Properties.module.scss";
import useStore from "../../../store/store";
import PropertiesInput from "./PropertiesInput/PropertiesInput";


function Properties() {

    const propertiesData = useStore(state => state.rightPanel.base)
    const parameters = useStore((state) => state.rightPanel.parameters)

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
            <ul className={s.properties_list}>
                <li>
                    <label className={s.input_label} >BLOCK NAME</label>
                    <input type="text" placeholder="Block Name" value={propertiesData.blockName} onChange={(e: any) => _setNodeName(e)} />
                </li>
                <li>
                    <label className={s.input_label}>COLOR</label>
                    <div className={s.color_input}>
                        <input type="color" value={propertiesData.blockColor} onChange={(e: any) => _setNodeColor(e)} />
                    </div>
                </li>
                <li>
                    <label className={s.input_label}>DESCRIPTION</label>
                    <input type="text" placeholder="Description" value={propertiesData.blockDescription} onChange={(e: any) => _setNodeDescription(e)} />
                </li>
            </ul>
            <h5>BLOCK</h5>
            <ul className={s.block_section}>
                {parameters.length > 0 ? Object.entries(parameters).map(([key, val]: Array<any>) => <li key={key}><PropertiesInput blockData={val} classData={s.input_label}></PropertiesInput></li>
                ) : null}
            </ul>
        </div>
    </section>)
}

export default Properties;