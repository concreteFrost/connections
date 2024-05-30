import useStore from "../../../../../../store/store";
import { useState, useEffect } from "react";
import { BlockParameters } from "../../../../../../store/interfaces/IBlock";
import FilteredResults from "../../../FilteredResults/FilteredResults";
import InputLabel from "./InputLabel/InputLabel";

interface ISelection {
  index: number,
  value: string
}

interface PropertiesInputProps {
  blockData: BlockParameters;
}

function PropertiesInput(props: PropertiesInputProps) {
  const flowSlice = useStore((state) => state.flowSlice);

  const [selection, setSelection] = useState<ISelection>({ index: 0, value: '' })
  function setCurrentParameter(parameterName: string, value: any) {
    const format = String(props.blockData.format); 
    switch (format) {
      case "0":
        return flowSlice.setStringParameter(parameterName, value);
      case "1":
        return flowSlice.setIntegerParameter(parameterName, value);
      case "2":
        return flowSlice.setFloatParameter(parameterName, value);
      case "3":
        return flowSlice.setDateTimeParameter(parameterName, value);
      case "4":
        return flowSlice.setBooleanParameter(parameterName, value);
      case "5":
        return flowSlice.setBooleanYNParameter(parameterName, value);
      case "6":
        return flowSlice.setExecutionParameter(parameterName, value);
      case "7":
        return flowSlice.setBigIntParameter(parameterName, value);
      default:
        return flowSlice.setStringParameter(parameterName, value);
    }
  }

  function defineInputType() {
    const format = String(props.blockData.format); // Преобразуем в строку
    switch (format) {
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
    setCurrentParameter(props.blockData.name, e);
  }

  const setSelectionIndex = (e: any) => {
    if (e.key === "{") {
      setSelection({ ...selection, index: e.target.selectionStart })
    }

  }

  function setSelectionValue(e: any) {
    const res = e.target.value.slice(selection.index, e.target.value.length)
    const cleanedRes = res.replace(/\s.*$/, '');
    setSelection({ ...selection, value: cleanedRes })
  }

  return (
    <>
      <InputLabel
        blockData={props.blockData}
        defineInputType={defineInputType}
        setCurrentParameter={setCurrentParameter}
        setSelectionIndex={setSelectionIndex}
        setSelectionValue={setSelectionValue}
      />
      <FilteredResults
        selection={selection}
        defaultInput={props.blockData.value}
        onSubstitutionSelect={onSubstitutionSelect}
      />
    </>
  );
}

export default PropertiesInput;
