import s from "./UsersTable.module.scss";
import useStore from "../../../../../store/store";
import { useEffect, useState } from "react";
import { IGroup, IRole, IUser } from "../../../../../store/interfaces/ISecurity";
import moment from "moment";
import EditUserModal from "./UserModal/EditUserModal";
import AddUserModal from "./UserModal/AddUserModal";

function UsersTable() {

    const { userList, getUserList, getGroupList, getRolesList, getUser } = useStore((state) => state.securitySlice);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState<boolean>(true)

    function toggleEditUser(user: IUser | null) {
        setIsModalVisible(user !== null ? true : false)
    }

    function toggleAddUserModal(isVisible: boolean) {
        setIsAddUserModalVisible(isVisible)
    }

    async function fetchData() {
        try {
            await getUserList();
            await getGroupList()
            await getRolesList()
        }
        catch (e) {
            console.log('error fetching groups');
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <section className={s.wrapper}>
            <h3>Users</h3>
            <div className={s.table_container}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Name</th>
                            <th colSpan={2}>Created</th>
                            <th colSpan={2}>Email</th>
                            <th colSpan={2}>Phone</th>
                            <th colSpan={2}>Roles</th>
                            <th colSpan={2}>Groups</th>
                            <th colSpan={1}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.length > 0 ? userList.map((user: IUser) => <tr key={user.userId}>
                            <td colSpan={2}> {user.userName}</td>
                            <td colSpan={2}> {moment(user.dateCreated).format('MMM Do YY')}</td>
                            <td colSpan={2}> {user.emailAddress} ({user.emailConfirmed ? `confirmed` : 'not confirmed'})</td>
                            <td colSpan={2}> {user.phone} ({user.phoneConfirmed ? 'confirmed' : 'not confirmed'})</td>
                            <td colSpan={2}>
                                <ul>
                                    {user.userRoles && user.userRoles.length > 0 ? user.userRoles.map((role: IRole) => <li key={role.roleId}>{role.roleName}</li>) : "-"}
                                </ul>
                            </td>
                            <td colSpan={2}>
                                <ul>
                                    {user.belongsToGroups && user.belongsToGroups.length > 0 ? user.belongsToGroups.map((group: IGroup) => <li key={group.groupId}>{group.name}</li>) : "-"}
                                </ul>
                            </td>
                            <td colSpan={1} className={s.table_actions}><button onClick={async () => {
                                await getUser(user)
                                await toggleEditUser(user)
                            }}>EDIT</button>
                                <button className={s.delete_btn}>X</button></td>
                        </tr>)
                            : null}
                    </tbody>
                </table>
                <div className={s.add_user_wrapper}>
                    <button onClick={() => toggleAddUserModal(true)}>ADD USER</button>
                </div>
            </div>
            <EditUserModal
                isVisible={isModalVisible}
                toggleEditUser={toggleEditUser}
            ></EditUserModal>
            <AddUserModal isVisible={isAddUserModalVisible} toggleAddUserModal={toggleAddUserModal}></AddUserModal>
        </section>
    )
}

export default UsersTable;