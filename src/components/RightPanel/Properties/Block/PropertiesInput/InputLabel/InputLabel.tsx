
import { IBlockParametersType } from "../../../../../../store/interfaces/IBlock";
import s from "./InputLabel.module.scss";

function InputLabel(props: {
  blockData: IBlockParametersType;
  classData: string;
  defineInputType: () => string;
  setCurrentParameter: (parameterName: string, value: any) => void;
  handleInput: (e: any) => void;
}) {
  return (
    <>
      <label className={props.classData}>{props.blockData.name}</label>
      <div className={s.input_container}>
        <input
          type={props.defineInputType()}
          required={props.blockData.constraints > 0 ? true : false}
          value={props.blockData.value}
          checked={props.blockData.value === "Y" ? true : false}
          onChange={(e: any) => {
            props.setCurrentParameter(props.blockData.name, e.target.value);
            props.handleInput(e);
          }}
        />
      </div>
    </>
  );
}

export default InputLabel;
