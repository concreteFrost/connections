import { IBlockParameters } from "../../../../../../../store/interfaces/IBlock";
import useStore from "../../../../../../../store/store";
import s from "./InputLabel.module.scss";

interface InputLabelProps {
  blockData: IBlockParameters;

  defineInputType: () => string;
  setCurrentParameter: (parameterName: string, value: any) => void;
  setSelectionIndex: (e: any) => void;
  setSelectionValue: (e: any) => void;
}

function InputLabel(props: InputLabelProps) {
  const _getParameterValue = useStore((state) => state.designerVisualElementsSlice.getParameterValue);
  const setTooltipText = useStore((state) => state.designerVisualElementsSlice.setTooltipText);

  function getParameterValue(value: any) {
    _getParameterValue(props.blockData.name, value);
  }
  return (
    <>
      <div className={s.grid_item}>
        <label
          className="tooltip-item"
          onClick={() => {
            getParameterValue(props.blockData.value);
          }}
          onMouseEnter={() => setTooltipText(props.blockData.name)}
        >
          {props.blockData.name}
        </label>
      </div>
      <div className={s.grid_item}>
        <input
          type={props.defineInputType()}
          required={props.blockData.constraints > 0 ? true : false}
          value={props.blockData.value}
          checked={props.blockData.value === "Y" ? true : false}
          onChange={(e: any) => {
            props.setSelectionValue(e)
            props.setCurrentParameter(props.blockData.name, e.target.value);
          }}
          onKeyDown={(e: any) => props.setSelectionIndex(e)}
          onClick={() => {
            getParameterValue(props.blockData.value);
          }}
        />
      </div>

    </>
  );
}

export default InputLabel;
