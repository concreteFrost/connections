import useStore from "../../../../../../store/store";
import { IBlockData } from "../../../../../../store/interfaces/IBlock";
import { useState } from "react";
import s from "./CustomPropertiesList.module.scss"
import FilteredResults from "../../../FilteredResults/FilteredResults";

interface ISelection {
    index: number,
    value: string
}

function CustomPropertiesList() {

    const selectedBlockID = useStore((state) => state.selectedBlockID)
    const getParameterValue = useStore((state) => state.designerVisualElementsSlice.getParameterValue);
    const setParameter = useStore((state) => state.flowSlice.setSelectedExtendedParameter);
    const deleteExtendedParameter = useStore((state) => state.flowSlice.deleteExtendedParameter);
    const blockData = useStore<IBlockData | undefined>((state) => state.flowSlice.flow.blockData.find((x: IBlockData) => x.blockIdentifier === selectedBlockID));

    const [selection, setSelection] = useState<ISelection>({ index: 0, value: '' })

    const setSelectionIndex = (e: any) => {
        if (e.key === "{")
            setSelection({ ...selection, index: e.target.selectionStart })
    }

    function setSelectionValue(e: any) {
        const res = e.target.value.slice(selection.index, e.target.value.length)
        const cleanedRes = res.replace(/\s.*$/, '');
        setSelection({ ...selection, value: cleanedRes })
    }

    function onSubstitutionSelect(val: string) {
        console.log(val)
        // setParameter()
    }


    return (
        <div className={s.wrapper}>
            <ul>
                {blockData?.extendedParameters && blockData?.extendedParameters.length > 0 ? blockData.extendedParameters.map((params: any) => <li key={params.name} className={s.custom_props_list}>
                    <div className={s.grid_item}>   <label className={s.param_name} placeholder={params.name} onClick={() => {
                        getParameterValue(params.name, params.value)
                    }}> {params.name}</label></div>
                    <div className={s.grid_item}> <input className={s.param_value} type="text" placeholder={params.value} value={params.value}
                        onKeyDown={(e: any) => setSelectionIndex(e)}
                        onChange={(e: any) => {
                            setParameter(params.name, e.target.value)
                            setSelectionValue(e)
                        }} /></div>

                    <div className={s.delete_param_btn}><button onClick={() => { deleteExtendedParameter(params.name) }}>x</button></div>

                    <div className={s.filtered_results}>
                        {/* <FilteredResults selection={selection} defaultInput={params.value} onSubstitutionSelect={onSubstitutionSelect}></FilteredResults> */}
                    </div>
                </li>) : null}
            </ul>
        </div>
    )
}

export default CustomPropertiesList;