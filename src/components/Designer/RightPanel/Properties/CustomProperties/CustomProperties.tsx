import { IBlockData } from "../../../../../store/interfaces/IBlock";
import useStore from "../../../../../store/store";
import FilteredResults from "../../FilteredResults/FilteredResults";
import s from "./CustomProperties.module.scss"
import { useState } from "react"

function CustomProperties() {

    const [isFormActive, setIsFormActive] = useState(false);
    const [errorMessage, setErrorMMessage] = useState('');
    const [propName, setPropName] = useState<string>('');
    const [propValue, setPropValue] = useState<string>('');

    const addCustomParameter = useStore((state) => state.flowSlice.addCustomParameter);
    const getParameterValue = useStore((state) => state.designerVisualElementsSlice.getParameterValue);
    const setParameter = useStore((state) => state.flowSlice.setSelectedExtendedParameter);
    const deleteExtendedParameter = useStore((state) => state.flowSlice.deleteExtendedParameter);

    const selectedBlockID = useStore((state) => state.selectedBlockID)
    const blockData = useStore<IBlockData | undefined>((state) => state.flowSlice.flow.blockData.find((x: IBlockData) => x.blockIdentifier === selectedBlockID));

    function triggerSubstitutions(e: any) {
        if (e.key === "{") {

        }
    }

    function toggleForm() {
        setIsFormActive(!isFormActive);
        setPropName('');
        setPropValue('');
    }

    function submit(e: any) {
        e.preventDefault();
        if (addCustomParameter(e.target[0].value, e.target[1].value)) {
            toggleForm()
        }
        else {
            setErrorMMessage('*parameter with that name already exists')
            setTimeout(() => {
                setErrorMMessage('')
            }, 3000);
        }
    }

    function onSubstitutionSelect(val: string) {
        setPropValue(`{${val}}`);
    }

    return (<div className={s.wrapper}>
        <h5>Custom</h5>
        <ul>
            {blockData?.extendedParameters && blockData?.extendedParameters.length > 0 ? blockData.extendedParameters.map((params: any) => <li key={params.name}>
                <input className={s.param_name} type="text" placeholder={params.name} onClick={() => {
                    getParameterValue(params.name, params.value)
                }} readOnly />
                <input className={s.param_value} type="text" placeholder={params.value} value={params.value} onChange={(e: any) => {
                    setParameter(params.name, e.target.value)
                }} />
                <button onClick={() => { deleteExtendedParameter(params.name) }}>x</button>
            </li>) : null}

        </ul>
        {!isFormActive ? <div className={s.add_property_container}> <button onClick={toggleForm}>Add</button></div> :
            <form onSubmit={(e: any) => { submit(e) }}>
                <div className={s.input_wrapper}>
                    <label >Name:</label>
                    <input type="text" placeholder="name" value={propName} onChange={(e: any) => setPropName(e.target.value)} required />
                </div>
                <div className={s.value_wrapper}>
                    <label >Value:</label>
                    <input type="text" placeholder="value" onKeyDown={triggerSubstitutions} value={propValue} onChange={(e: any) => setPropValue(e.target.value)} required />

                </div>
                <div className={s.btn_wrapper}>
                    <button>Add</button>
                    <button onClick={toggleForm}>Close</button>
                </div>
            </form>

        }
        {errorMessage.length > 0 ? <div className={s.error_message}>{errorMessage}</div> : null}
        <div className={s.filtered_results}>
            <FilteredResults inputValue={propValue} onSubstitutionSelect={onSubstitutionSelect}></FilteredResults>
        </div>
    </div>
    )
}

export default CustomProperties;