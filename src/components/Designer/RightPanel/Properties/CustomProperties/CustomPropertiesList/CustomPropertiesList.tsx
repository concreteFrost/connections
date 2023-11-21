import useStore from "../../../../../../store/store";
import { IBlockData } from "../../../../../../store/interfaces/IBlock";
import s from "./CustomPropertiesList.module.scss"
import CustomPropertiesListItem from "./CustomPropertiesListItem/CustomPropertiesListItem";

function CustomPropertiesList() {

    const selectedBlockID = useStore((state) => state.selectedBlockID)
    const blockData = useStore<IBlockData | undefined>((state) => state.flowSlice.flow.blockData.find((x: IBlockData) => x.blockIdentifier === selectedBlockID));

    return (
        <div className={s.wrapper}>
            <ul>
                {blockData?.extendedParameters && blockData?.extendedParameters.length > 0 ? blockData.extendedParameters.map((params: any) =>
                    <li key={params.name} className={s.custom_props_list}>
                        <CustomPropertiesListItem
                            params={params}
                        />
                    </li>) : null}
            </ul>
        </div>
    )
}

export default CustomPropertiesList;