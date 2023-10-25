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
        return state.setStringParameter(parameterName, value);
      case "1":
        return state.setIntegerParameter(parameterName, value);
      case "2":
        return state.setFloatParameter(parameterName, value);
      case "3":
        return state.setDateTimeParameter(parameterName, value);
      case "4":
        return state.setBooleanParameter(parameterName, value);
      case "5":
        return state.setBooleanYNParameter(parameterName, value);
      case "6":
        return state.setExecutionParameter(parameterName, value);
      case "7":
        return state.setBigIntParameter(parameterName, value);
      default:
        return state.setStringParameter(parameterName, value);
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
