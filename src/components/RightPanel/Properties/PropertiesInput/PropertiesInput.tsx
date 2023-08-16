import { useState } from "react";
import useStore from "../../../../store/store";
import { BlockParametersType } from "../../../../store/types/blockParametersTypes";
import s from "./PropertiesInput.module.scss"

function PropertiesInput(props: { blockData: BlockParametersType, classData: string }) {
  const setStringParameter = useStore((state) => state.setStringParameter);
  const setIntegerParameter = useStore((state) => state.setIntegerParameter);
  const setFloatParameter = useStore((state) => state.setFloatParameter);
  const setBooleanParameter = useStore((state) => state.setBooleanParameter);
  const setBooleanYNParameter = useStore((state) => state.setBooleanYNParameter);
  const setDateTimeParameter = useStore((state) => state.setDateTimeParameter);
  const setExecutionParameter = useStore((state) => state.setExecutionParameter);
  const setBigIntParameter = useStore((state) => state.setBigIntParameter);

  function setCurrentParameter(parameterName: string, value: any) {
    switch (props.blockData.format) {
      case "0":
        return setStringParameter(parameterName, value);
      case "1":
        return setIntegerParameter(parameterName, value);
      case "2":
        return setFloatParameter(parameterName, value);
      case "3":
        return setDateTimeParameter(parameterName, value);
      case "4":
        return setBooleanParameter(parameterName, value);
      case "5":
        return setBooleanYNParameter(parameterName, value);
      case "6":
        return setExecutionParameter(parameterName, value);
      case "7":
        return setBigIntParameter(parameterName, value);
      default:
        return setStringParameter(parameterName, value);
    }
  }

  function defineInputType() {
    switch (props.blockData.format) {
      case "0":
        return 'text'
      case "1":
        return 'number'
      case "2":
        return 'number'
      case "3":
        return 'date'
      case "4":
        return 'checkbox'
      case "5":
        return 'checkbox'
      case "6":
        return 'text'
      case "7":
        return 'number'
      default:
        return 'text'
    }
  }
  return (
    <>
      <label className={props.classData}>{props.blockData.name}</label>
      <div className={s.input_container}>
      <input
        type={defineInputType()}
        required={props.blockData.constraints > 0 ? true : false}
        value={props.blockData.value}
        checked={props.blockData.value === "Y" ? true : false}
        onChange={(e: any) => {
          setCurrentParameter(props.blockData.name, e.target.value);
        }}
      />
      </div>
    
    </>
  );
}

export default PropertiesInput;
