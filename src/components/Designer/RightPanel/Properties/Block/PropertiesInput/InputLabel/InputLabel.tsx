import { IBlockParameters } from "../../../../../../../store/interfaces/IBlock";
import useStore from "../../../../../../../store/store";
import s from "./InputLabel.module.scss";

function InputLabel(props: {
  blockData: IBlockParameters;
  classData: string;
  defineInputType: () => string;
  setCurrentParameter: (parameterName: string, value: any) => void;
}) {
  const _getParameterValue = useStore((state) => state.getParameterValue);
  function getParameterValue(value: any) {
    if (props.defineInputType() === "text" && props.blockData.format !== "6") {
      _getParameterValue(props.blockData.name, value);
    }
    else {
      _getParameterValue('', '')
    }
  }
  return (
    <>
      <label
        className={props.classData}
        onClick={() => {
          getParameterValue(props.blockData.value);
        }}
      >
        {props.blockData.name}
      </label>
      <div className={s.input_container}>
        <input
          type={props.defineInputType()}
          required={props.blockData.constraints > 0 ? true : false}
          value={props.blockData.value}
          checked={props.blockData.value === "Y" ? true : false}
          onChange={(e: any) => {

            props.setCurrentParameter(props.blockData.name, e.target.value);
          }}
          onClick={() => {
            getParameterValue(props.blockData.value);
          }}
        />
      </div>
    </>
  );
}

export default InputLabel;
