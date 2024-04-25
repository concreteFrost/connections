import useStore from "../../../../../../store/store";
import { useState, useEffect } from "react";
import { IBlockParameters } from "../../../../../../store/interfaces/IBlock";
import FilteredResults from "../../../FilteredResults/FilteredResults";
import InputLabel from "./InputLabel/InputLabel";

interface ISelection {
  index: number,
  value: string
}

interface PropertiesInputProps {
  blockData: IBlockParameters;
}

function PropertiesInput(props: PropertiesInputProps) {
  const state = useStore((state) => state);

  const [selection, setSelection] = useState<ISelection>({ index: 0, value: '' })

  function setCurrentParameter(parameterName: string, value: any) {
    const format = String(props.blockData.format); 
    switch (format) {
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
