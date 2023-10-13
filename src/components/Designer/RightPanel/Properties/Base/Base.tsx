import useStore from "../../../../../store/store";
import s from "./Base.module.scss";

function Base() {
  const propertiesData = useStore((state) => state.rightPanel.base);
  const setNodeName = useStore((state) => state.setNodeName);
  const setNodeColor = useStore((state) => state.setNodeColor);
  const setNodeDescription = useStore((state) => state.setNodeDescription);

  function _setNodeName(e: any) {
    setNodeName(e.target.value);
  }

  function _setNodeColor(e: any) {
    setNodeColor(e.target.value);
  }

  function _setNodeDescription(e: any) {
    setNodeDescription(e.target.value);
  }
  return (
    <div>
      <h5>BASE</h5>
      <ul className={s.properties_list}>
        <li>
          <label className={s.input_label}>BLOCK NAME</label>
          <input
            type="text"
            placeholder="Block Name"
            value={propertiesData.blockName}
            onChange={(e: any) => _setNodeName(e)}
          />
        </li>
        <li>
          <label className={s.input_label}>COLOR</label>
          <div className={s.color_input}>
            <input
              type="color"
              value={propertiesData.blockColor}
              onChange={(e: any) => _setNodeColor(e)}
            />
          </div>
        </li>
        <li>
          <label className={s.input_label}>DESCRIPTION</label>
          <input
            type="text"
            placeholder="Description"
            value={propertiesData.blockDescription}
            onChange={(e: any) => _setNodeDescription(e)}
          />
        </li>
      </ul>
    </div>
  );
}

export default Base;
