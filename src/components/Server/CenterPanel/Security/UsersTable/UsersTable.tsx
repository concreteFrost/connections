import s from "./UsersTable.module.scss";
import useStore from "../../../../../store/store";
import { useState } from "react";
import {
  IGroup,
  IRole,
  IUser,
} from "../../../../../store/interfaces/ISecurity";
import moment from "moment";
import EditUserModal from "../../../../Modals/UserModals/EditUserModal/EditUserModal";
import AddUserModal from "../../../../Modals/UserModals/AddUserModal/AddUserModal";

function UsersTable() {
  const { userList, getUser, deleteUser, getUserList, getGroupList } = useStore(
    (state) => state.securitySlice
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] =
    useState<boolean>(false);
  const { toggleConfirmationModal, setConfirmationModalActions } = useStore(
    (state) => state.modalWindowsSlice
  );

  function toggleEditUser(isVisible: boolean) {
    setIsModalVisible(isVisible);
  }

  function toggleAddUserModal(isVisible: boolean) {
    setIsAddUserModalVisible(isVisible);
  }

  async function performUserDelete(userId: string) {
    try {
      const res: any = await deleteUser(userId);
      if (res.data.success) {
        await getUserList();
        await getGroupList();
      }
    } catch (e) {
      console.log("error deleting user", e);
    }
  }

  return (
    <section className={s.wrapper}>
      <h3>Users</h3>
      <div className={s.table_container}>
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Name</th>
              <th colSpan={1}>Created</th>
              <th colSpan={2}>Contacts</th>
              <th colSpan={2}>Roles</th>
              <th colSpan={2}>Groups</th>
              <th colSpan={1}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0
              ? userList.map((user: IUser) => (
                  <tr key={user.userId}>
                    <td colSpan={2}> {user.userName}</td>
                    <td colSpan={1}>
                      {" "}
                      {moment(user.dateCreated).format("MMM Do YY")}
                    </td>
                    <td colSpan={2} className={s.contacts}>
                      <div>
                        <span>Email: </span>
                        {user.emailAddress} (
                        {user.emailConfirmed ? `confirmed` : "not confirmed"})
                      </div>
                      <div>
                        <span>Phone: </span> {user.phone} (
                        {user.phoneConfirmed ? "confirmed" : "not confirmed"})
                      </div>
                    </td>
                    <td colSpan={2}>
                      <ul>
                        {user.userRoles && user.userRoles.length > 0
                          ? user.userRoles.map((role: IRole) => (
                              <li key={role.roleId}>{role.roleName}</li>
                            ))
                          : "-"}
                      </ul>
                    </td>
                    <td colSpan={2}>
                      <ul>
                        {user.belongsToGroups && user.belongsToGroups.length > 0
                          ? user.belongsToGroups.map((group: IGroup) => (
                              <li key={group.groupId}>{group.name}</li>
                            ))
                          : "-"}
                      </ul>
                    </td>
                    <td colSpan={1}>
                      <div className={s.table_actions}>
                        <button
                          onClick={async () => {
                            await getUser(user);
                            await toggleEditUser(true);
                          }}
                        >
                          EDIT
                        </button>
                        <button
                          className={s.delete_btn}
                          onClick={() => {
                            toggleConfirmationModal(
                              true,
                              `Would you like to delete ${user.userName}?`
                            );
                            setConfirmationModalActions(() =>
                              performUserDelete(user.userId)
                            );
                          }}
                        >
                          X
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <div className={s.add_user_wrapper}>
        <button onClick={() => toggleAddUserModal(true)}>ADD USER</button>
      </div>
      <EditUserModal
        isVisible={isModalVisible}
        toggleEditUser={toggleEditUser}
      ></EditUserModal>
      <AddUserModal
        isVisible={isAddUserModalVisible}
        toggleAddUserModal={toggleAddUserModal}
      ></AddUserModal>
    </section>
  );
}

export default UsersTable;
