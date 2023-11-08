import { IBlockData } from "../../../../../store/interfaces/IBlock";
import useStore from "../../../../../store/store";
import FilteredResults from "../../FilteredResults/FilteredResults";
import s from "./CustomProperties.module.scss"
import { useState } from "react"
import CustomPropertiesList from "./CustomPropertiesList/CustomPropertiesList";
import AddCustomPropertyForm from "./AddCustomProperty/AddCustomPropertyForm";

interface ISelection {
    index: number,
    value: string
}

function CustomProperties() {





    return (<div className={s.wrapper}>
        <h5>Custom</h5>
        <CustomPropertiesList></CustomPropertiesList>
        <AddCustomPropertyForm></AddCustomPropertyForm>
        <div className={s.filtered_results}>
            {/* <FilteredResults selection={selection} defaultInput={propValue} onSubstitutionSelect={onSubstitutionSelect}></FilteredResults> */}
        </div>
    </div>
    )
}

export default CustomProperties;