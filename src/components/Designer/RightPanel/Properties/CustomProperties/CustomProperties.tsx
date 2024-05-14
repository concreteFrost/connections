import s from "./CustomProperties.module.scss"
import CustomPropertiesList from "./CustomPropertiesList/CustomPropertiesList";
import AddCustomPropertyForm from "./AddCustomProperty/AddCustomPropertyForm";

function CustomProperties() {

    return (<div className={s.wrapper}>
        <h5>Custom</h5>
        <CustomPropertiesList></CustomPropertiesList>
        <AddCustomPropertyForm></AddCustomPropertyForm>
    </div>
    )
}

export default CustomProperties;