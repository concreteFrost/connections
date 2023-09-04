import useStore from "../../../../store/store";
import { BlockParametersType } from "../../../../store/types/blockParametersTypes";
import { useState } from "react";
import FilteredResults from "./FilteredResults/FilteredResults";
import InputLabel from "./InputLabel/InputLabel";

function PropertiesInput(props: {
  blockData: BlockParametersType;
  classData: string;
}) {
  const state = useStore((state) => state);
  const substitutions = useStore((state) => state.flow.substitutions);

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

  const [filteredSubstitutions, setFilteredSubstitutions] = useState(
    Array<any>
  );

  function handleInput(e: any) {
    const inputValue = e.target.value;

    if (inputValue.length <= 1) {
      clearFilteredSubstitutions()
      return;
    }

    const searchTerm = inputValue.substring(1).toLowerCase();

    const res = substitutions.filter((sub: any) => {
      const substitution = sub.subKey.toLowerCase();

      return substitution.startsWith(searchTerm);
    });

    if (inputValue.startsWith("{")) {
      setFilteredSubstitutions(res); // Update the filtered results state
    } else {
      clearFilteredSubstitutions()
    }
  }

  function onSubstitutionSelect(e: any) {
    setCurrentParameter(props.blockData.name, `{${e}}`);
    setFilteredSubstitutions([]);
  }

  function clearFilteredSubstitutions() {
    setFilteredSubstitutions([]);
  }

  return (
    <>
      <InputLabel
        blockData={props.blockData}
        classData={props.classData}
        defineInputType={defineInputType}
        setCurrentParameter={setCurrentParameter}
        handleInput={handleInput}
      />
      <FilteredResults
        filteredSubstitutions={filteredSubstitutions}
        onSubstitutionSelect={onSubstitutionSelect}
        clearFilteredSubstitutions={clearFilteredSubstitutions}
      />
    </>
  );
}

export default PropertiesInput;
