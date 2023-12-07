import s from "./GroupsTable.module.scss";
import useStore from "../../../../../store/store";
import { IGroup } from "../../../../../store/interfaces/ISecurity";
import { useEffect, useState } from "react";
import moment from "moment";
import AddGroupModal from "./AddGroupModal";

function GroupsTable() {

    const { groupList, deleteGroup, getGroupList } = useStore((state) => state.securitySlice);
    const [isModalActive, setIsModalActive] = useState<boolean>(false);

    function toggleActiveModal(isActive: boolean) {
        setIsModalActive(isActive);
    }

    async function performGroupDelete(groupId: string) {
        try {
            const res: any = await deleteGroup(groupId)
            console.log(res)
            if (res.data.success) {
                await getGroupList()
            }
        }
        catch (e) {
            console.log('error deleting group', e);
        }
    }

    useEffect(() => { console.log(groupList) }, [])
    return (
        <section className={s.wrapper}>
            <h3>Groups</h3>
            <div className={s.table_container}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Name</th>
                            <th colSpan={1}>Created</th>
                            <th colSpan={2}>Owner</th>
                            <th colSpan={2}>Description</th>
                            <th colSpan={1}>Active</th>
                            <th colSpan={1}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupList.length > 0 ? groupList.map((group: IGroup) => <tr key={group.groupId}>
                            <td colSpan={2}> {group.name}</td>
                            <td colSpan={1}> {moment(group.dateCreated).format('MMM Do YY')}</td>
                            <td colSpan={2}>{group.owner}</td>
                            <td colSpan={2}>{group.description}</td>
                            <td colSpan={1}>{group.active}</td>
                            <td colSpan={1} className={s.table_actions}>
                                <button className={s.delete_btn} onClick={() => performGroupDelete(group.groupId)}>X</button></td>
                        </tr>)
                            : null}
                    </tbody>
                </table>
            </div>
            <div className={s.add_group_wrapper}>
                <button onClick={() => toggleActiveModal(true)}>ADD GROUP</button>
            </div>
            <AddGroupModal
                isVisible={isModalActive}
                toggleAddGroupModal={toggleActiveModal}
            ></AddGroupModal>
        </section>
    )
}

export default GroupsTable;