import s from "./FlowProperties.module.scss";
import useStore from "../../../../../store/store";

function FlowProperties() {
  const flow = useStore((state) => state.flow);
  const setFlowName = useStore((state) => state.setFlowName);
  const setFlowVersion = useStore((state) => state.setFlowVersion);
  const setFlowIsEnabled = useStore((state) => state.setFlowIsEnabled);
  return (
    <div>
      <h5>FLOW</h5>
      <ul className={s.properties_list}>
        <li>
          <label className={s.input_label}>FLOW NAME</label>
          <input
            type="text"
            placeholder="New Flow"
            value={flow.flowName}
            onChange={(e: any) => setFlowName(e.target.value)}
          />
        </li>
        <li>
          <label className={s.input_label}>FLOW VERSION</label>
          <input
            type="text"
            placeholder="1.0.0.0"
            value={flow.flowVersion}
            onChange={(e: any) => setFlowVersion(e.target.value)}
          />
        </li>
        <li>
          <label className={s.input_label}>IS ENABLED</label>
          <input
            type="checkbox"

            checked={flow.isEnabled === "true" ? true : false}
            onChange={() => setFlowIsEnabled()}
          />
        </li>
      </ul>
    </div>
  );
}

export default FlowProperties;
