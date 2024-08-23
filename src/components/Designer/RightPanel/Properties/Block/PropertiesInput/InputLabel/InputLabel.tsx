import { useEffect } from "react";
import { BlockParameters } from "store/interfaces/IBlock";
import useStore from "store/store";
import s from "./InputLabel.module.scss";

export interface InputLabelProps {
  blockData: BlockParameters;

  defineInputType: () => string;
  setCurrentParameter: (parameterName: string, value: any) => void;
  setSelectionIndex: (e: any) => void;
  setSelectionValue: (e: any) => void;
}

function InputLabel(props: InputLabelProps) {
  const _getParameterValue = useStore(
    (state) => state.designerVisualElementsSlice.getParameterValue
  );
  const setTooltipText = useStore(
    (state) => state.designerVisualElementsSlice.setTooltipText
  );

  useEffect(() => {
    getParameterValue(props.blockData.value);
  }, [props.blockData]);

  function getParameterValue(value: any) {
    _getParameterValue(props.blockData.name, value);
  }

  return (
    <>
      <div className={s.grid_item}>
        <label
          className="tooltip-item"
          onMouseEnter={() =>
            setTooltipText(
              `${props.blockData.name}: ${props.blockData.description}`
            )
          }
        >
          {props.blockData.name}
        </label>
      </div>
      <div className={s.grid_item}>
        {props.blockData.name !== "GRCCALLREF" ? (
          <input
            data-testid="test_properties_input"
            type={props.defineInputType()}
            required={props.blockData.required}
            value={props.blockData.value}
            checked={props.blockData.value === "Y" ? true : false}
            onChange={(e: any) => {
              props.setSelectionValue(e);
              props.setCurrentParameter(props.blockData.name, e.target.value);
            }}
            onKeyDown={(e: any) => props.setSelectionIndex(e)}
            onClick={() => {
              getParameterValue(props.blockData.value);
            }}
          />
        ) : (
          <select value={props.blockData.value} onChange={(e)=>props.setCurrentParameter(props.blockData.name, e.target.value)}>
            <option value="">Select the endpoint</option>
            <option value="INCB">Create Incident From Metric Breach</option>
            <option value="INGI">Get Incident By Id</option>
            <option value="CTIS">Get Control Summary By Id</option>
            <option value="MTGI">Get Metric By Id</option>
            <option value="INCP">Incident Post</option>
            <option value="CTLC">Link Control</option>
            <option value="MTUM">Update Metric</option>
            <option value="GRCCALLREF">UI Description</option>
          </select>
        )}
      </div>
    </>
  );
}

export default InputLabel;