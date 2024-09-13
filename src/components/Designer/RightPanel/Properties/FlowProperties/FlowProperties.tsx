import s from "./FlowProperties.module.scss";
import useStore from "store/store";

function FlowProperties() {
  const flow = useStore((state) => state.flowSlice.flow);
  const {setFlowName,setFlowIsEnabled,setFlowVersion, setFlowNameInTabs} = useStore((state) => state.flowSlice);
 
  function handleSetFlowName(e:any){
    setFlowName(e.target.value)
    setFlowNameInTabs(e.target.value)
  }
  return (
    <div className={s.wrapper}>
      <h5>FLOW</h5>
      <ul>
        <li>
          <div className={s.grid_item} > <label>FLOW NAME</label></div>
          <div className={s.grid_item}>
            <input
              aria-label="flow_name"
              type="text"
              placeholder="New Flow"
              value={flow.flowName}
              onChange={handleSetFlowName}
            />
          </div>
        </li>
        <li>
          <div className={s.grid_item} ><label>FLOW VERSION</label></div>
          <div className={s.grid_item}><input
            aria-label="flow_version"
            type="text"
            value={flow.flowVersion}
            onChange={(e) => setFlowVersion(e.target.value)}
          /></div>
        </li>
        <li>
          <div className={s.grid_item}><label htmlFor="is_enabled_checkbox" >IS ENABLED</label></div>
          <div className={s.grid_item}><input
            name="checkbox"
            id="is_enabled_checkbox"
            type="checkbox"
            checked={flow.isEnabled === "true" ? true : false}
            onChange={() => setFlowIsEnabled()}
          /></div>
        </li>
      </ul>

    </div>
  );
}

export default FlowProperties;
