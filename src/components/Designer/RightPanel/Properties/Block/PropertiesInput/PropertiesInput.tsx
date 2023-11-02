import useStore from "../../../../../../store/store";
import { IBlockParameters } from "../../../../../../store/interfaces/IBlock";
import FilteredResults from "../../../FilteredResults/FilteredResults";
import InputLabel from "./InputLabel/InputLabel";

function PropertiesInput(props: {
  blockData: IBlockParameters;
  classData: string;
}) {
  const state = useStore((state) => state);

  function setCurrentParameter(parameterName: string, value: any) {
    switch (props.blockData.format) {
      case "0":
        return state.flowSlice.setStringParameter(parameterName, value);
      case "1":
        return state.flowSlice.setIntegerParameter(parameterName, value);
      case "2":
        return state.flowSlice.setFloatParameter(parameterName, value);
      case "3":
        return state.flowSlice.setDateTimeParameter(parameterName, value);
      case "4":
        return state.flowSlice.setBooleanParameter(parameterName, value);
      case "5":
        return state.flowSlice.setBooleanYNParameter(parameterName, value);
      case "6":
        return state.flowSlice.setExecutionParameter(parameterName, value);
      case "7":
        return state.flowSlice.setBigIntParameter(parameterName, value);
      default:
        return state.flowSlice.setStringParameter(parameterName, value);
    }
  }

  function defineInputType() {
    switch (props.blockData.format) {
      case "0":
        return "text";
      case "1":
        return "number";
      case "2":
        return "number";
      case "3":
        return "date";
      case "4":
        return "checkbox";
      case "5":
        return "checkbox";
      case "6":
        return "text";
      case "7":
        return "number";
      default:
        return "text";
    }
  }

  function onSubstitutionSelect(e: any) {
    setCurrentParameter(props.blockData.name, `{${e}}`);
  }

  return (
    <>
      <InputLabel
        blockData={props.blockData}
        classData={props.classData}
        defineInputType={defineInputType}
        setCurrentParameter={setCurrentParameter}
      />
      <FilteredResults
        inputValue={props.blockData.value}
        onSubstitutionSelect={onSubstitutionSelect}
      />
    </>
  );
}

export default PropertiesInput;
