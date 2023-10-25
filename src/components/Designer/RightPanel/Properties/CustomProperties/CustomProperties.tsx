import useStore from "../../../../../store/store";
import s from "./CustomProperties.module.scss"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

function CustomProperties() {

    const [isFormActive, setIsFormActive] = useState(false);
    const addCustomParameter = useStore((state) => state.addCustomParameter);
    const extendedParameters = useStore((state) => state.rightPanel.extendedParameters);

    function toggleForm() {
        setIsFormActive(!isFormActive);
    }

    function submit(e: any) {
        e.preventDefault();
        addCustomParameter(e.target[0].value, e.target[1].value);
        toggleForm();
    }

    return (<div className={s.wrapper}>
        <h5>Custom</h5>
        <ul>
            {extendedParameters.length > 0 ? extendedParameters.map((params: any) => <li key={uuidv4()}>
                <input type="text" placeholder={params.name} />
                <input type="text" placeholder={params.value} />
            </li>) : null}

        </ul>
        {!isFormActive ? <div className={s.add_property_container}> <button onClick={toggleForm}>Add</button></div> :
            <form onSubmit={(e: any) => { submit(e) }}>
                <div className={s.input_wrapper}>
                    <label >Name:</label>
                    <input type="text" placeholder="name" required />
                </div>
                <div className={s.input_wrapper}>
                    <label >Value:</label>
                    <input type="text" placeholder="value" required />
                </div>
                <div className={s.btn_wrapper}>
                    <button>Add</button>
                    <button onClick={toggleForm}>Close</button>
                </div>

            </form>
        }



    </div>
    )
}

export default CustomProperties;