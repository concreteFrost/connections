import useStore from "../../../../store/store";
import PropertiesInput from "./PropertiesInput/PropertiesInput";
import s from "./Block.module.scss";

function Block() {
    const parameters = useStore((state) => state.rightPanel.parameters)
  return (
    <div>
      <h5>BLOCK</h5>
      <ul className={s.block_section}>
        {parameters.length > 0
          ? Object.entries(parameters).map(([key, val]: Array<any>) => (
              <li key={key}>
                <PropertiesInput
                  blockData={val}
                  classData={s.input_label}
                ></PropertiesInput>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default Block;
