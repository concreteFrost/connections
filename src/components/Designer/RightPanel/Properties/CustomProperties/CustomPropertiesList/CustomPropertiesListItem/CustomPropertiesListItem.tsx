import s from "./CustomPropertiesListItem.module.scss";
import useStore from "../../../../../../../store/store";
import FilteredResults from "../../../../FilteredResults/FilteredResults";
import { useState } from "react";

interface CustomPropertiesListItemProps {
    params: any;

}
interface ISelection {
    index: number,
    value: string
}

function CustomPropertiesListItem(props: CustomPropertiesListItemProps) {
    const getParameterValue = useStore((state) => state.designerVisualElementsSlice.getParameterValue);
    const deleteExtendedParameter = useStore((state) => state.flowSlice.deleteExtendedParameter);
    const setParameter = useStore((state) => state.flowSlice.setSelectedExtendedParameter);


    const [selection, setSelection] = useState<ISelection>({ index: 0, value: '' })

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

    return (<>
        <div className={s.custom_prop_grid_item}>
            <label className={s.param_name} placeholder={props.params.name} onClick={() => {
                getParameterValue(props.params.name, props.params.value)
            }}> {props.params.name}</label></div>
        <div className={s.custom_prop_grid_item}>
            <input className={s.param_value} type="text" value={props.params.value}
                onKeyDown={(e: any) => setSelectionIndex(e)}
                onChange={(e: any) => {
                    setSelectionValue(e)
                    setParameter(props.params.name, e.target.value)
                }}
                onClick={() => { getParameterValue(props.params.name, props.params.value) }}
            />
        </div>
        <div className={s.delete_param_btn}><button onClick={() => { deleteExtendedParameter(props.params.name) }}>x</button></div>
        <FilteredResults
            selection={selection}
            defaultInput={props.params.value}
            onSubstitutionSelect={(e: string) => setParameter(props.params.name, e)}
        />
    </>)

}

export default CustomPropertiesListItem;