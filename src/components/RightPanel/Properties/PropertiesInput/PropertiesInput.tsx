import useStore from "../../../../store/store";
import { BlockProps } from "../../../../store/types/blockTypes";

function PropertiesInput(props:{blockData: BlockProps, classData : string}) {
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
    }
  }
  return (
    <>
      <label className={props.classData}>{props.blockData.name}</label>
      <input
        type={props.blockData.inputType}
        required={props.blockData.constraints > 0 ? true : false}
        value={props.blockData.value}
        checked={props.blockData.value === "Y" ? true : false}
        placeholder={props.blockData.placeholder ?? props.blockData.placeholder}
        onChange={(e: any) =>
          setCurrentParameter(props.blockData.name, e.target.value)
        }
      />
    </>
  );
}

export default PropertiesInput;
