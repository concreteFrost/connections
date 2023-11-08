import s from "./FlowProperties.module.scss";
import useStore from "../../../../../store/store";

function FlowProperties() {
  const flow = useStore((state) => state.flowSlice.flow);
  const setFlowName = useStore((state) => state.flowSlice.setFlowName);
  const setFlowIsEnabled = useStore((state) => state.flowSlice.setFlowIsEnabled);
  const setFlowVersion = useStore((state) => state.flowSlice.setFlowVersion);
  return (
    <div className={s.wrapper}>
      <h5>FLOW</h5>
      <ul>
        <li>
          <div className={s.grid_item}> <label>FLOW NAME</label></div>
          <div className={s.grid_item}>
            <input
              type="text"
              placeholder="New Flow"
              value={flow.flowName}
              onChange={(e: any) => setFlowName(e.target.value)}
            />
          </div>
        </li>
        <li>
          <div className={s.grid_item}><label>FLOW VERSION</label></div>
          <div className={s.grid_item}><input
            type="text"
            value={flow.flowVersion}
            onChange={(e) => setFlowVersion(e.target.value)}
          /></div>
        </li>
        <li>
          <div className={s.grid_item}><label>IS ENABLED</label></div>
          <div className={s.grid_item}><input
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
