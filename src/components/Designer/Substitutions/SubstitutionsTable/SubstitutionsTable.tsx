import { ISubstitutions } from "../../../../store/interfaces/ISubstitutions";
import useStore from "../../../../store/store";
import s from "./SubstitutionsTable.module.scss"

function SubstitutionsTable() {

    const substitutions = useStore(state => state.flow.substitutions);
    const addConfig = useStore(state => state.addConfig);
    const deleteSubstitution = useStore(state => state.deleteSubstitution);
    const getBlockData = useStore((state) => state.getBlockProperties);

    function _deleteSubstitution(s: any) {
        deleteSubstitution(s);
        // getBlockData();
    }
    return (
        <div className={s.subs_table}>

            <table >
                <thead>
                    <tr>
                        <th colSpan={2}>KEY</th>
                        <th colSpan={3}>DEBUG</th>
                        <th colSpan={3}>RELEASE</th>
                        <th colSpan={1}>REMOVE</th>
                    </tr>
                </thead>
                <tbody>
                    {substitutions.length > 0 ? substitutions.map((s: ISubstitutions) => <tr key={s.subKey}>
                        <td colSpan={2}>{s.subKey}</td>
                        <td colSpan={3}><input type="text" value={s.subConfigs[0].configValue} onChange={(e: any) => { addConfig(s.subKey, "Debug", e.target.value) }} /></td>
                        <td colSpan={3} ><input type="text" value={s.subConfigs[1].configValue} onChange={(e: any) => { addConfig(s.subKey, "Release", e.target.value) }} /></td>
                        <td colSpan={1}> <span ><button onClick={() => _deleteSubstitution(s.subKey)} >X</button></span></td>
                    </tr>) : null}
                </tbody>
            </table>
        </div>)
}

export default SubstitutionsTable;