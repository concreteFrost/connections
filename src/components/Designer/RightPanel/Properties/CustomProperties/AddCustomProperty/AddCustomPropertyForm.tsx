import s from "./AddCustomProperty.module.scss";
import useStore from "../../../../../../store/store";
import { useState } from "react";


function AddCustomPropertyForm() {
    const [propName, setPropName] = useState<string>('');
    const [propValue, setPropValue] = useState<string>('');

    const [isFormActive, setIsFormActive] = useState(false);
    const [errorMessage, setErrorMMessage] = useState('');

    const addCustomParameter = useStore((state) => state.flowSlice.addCustomParameter);

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

    return (
        <div className={s.wrapper}>
            {!isFormActive ? <div className={s.add_property_container}> <button onClick={toggleForm}>Add</button></div>
                :
                <form onSubmit={(e: any) => { submit(e) }}>
                    <div className={s.input_wrapper}>
                        <div className={s.grid_item}>  <label >Name:</label></div>
                        <div className={s.grid_item}> <input type="text" placeholder="name" value={propName} onChange={(e: any) => setPropName(e.target.value)} required /></div>
                    </div>
                    <div className={s.value_wrapper}>
                        <div className={s.grid_item}><label >Value:</label></div>
                        <div className={s.grid_item}><input type="text" placeholder="value" value={propValue} onChange={(e: any) => setPropValue(e.target.value)} required /></div>
                    </div>
                    <div className={s.btn_wrapper}>
                        <button>Add</button>
                        <button onClick={toggleForm}>Close</button>
                    </div>
                </form>}

            {errorMessage.length > 0 ? <div className={s.error_message}>{errorMessage}</div> : null}
        </div>)


}

export default AddCustomPropertyForm;