import s from "./GroupsTable.module.scss";
import useStore from "../../../../../store/store";
import {
  Group,
  GroupWithUsers,
  User,
} from "../../../../../store/interfaces/ISecurity";
import { useEffect, useState } from "react";
import moment from "moment";
import AddGroupModal from "../../../../Modals/GroupModals/AddGroupModal";
import EditGroupModal from "../../../../Modals/GroupModals/EditGroupModal";

function GroupsTable() {
  const { groupList, deleteGroup, getGroupList, getGroupMembers } = useStore(
    (state) => state.securitySlice
  );
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isEditModalActive, setEditModalActive] = useState<boolean>(false);
  const [groupToEdit, setGroupToEdit] = useState<GroupWithUsers>();
  const {toggleConfirmationModal,setConfirmationModalActions} = useStore((state)=>state.modalWindowsSlice);

  function toggleActiveModal(isActive: boolean) {
    setIsModalActive(isActive);
  }

  function toggleEditGroupModal(isActive: boolean) {
    setEditModalActive(isActive);
  }

  async function performGroupDelete(groupId: string) {
    try {
      const res: any = await deleteGroup(groupId);
      if (res.data.success) {
        await getGroupList();
      }
    } catch (e) {
      console.log("error deleting group", e);
    }
  }

  async function fetchGroupMembers() {
    try {
      await groupList.forEach(async (group: Group) => {
        const res: any = await getGroupMembers(group.groupId);
      });
    } catch (e) {}
  }

  useEffect(() => {
    fetchGroupMembers();
  }, [groupList]);
  return (
    <section className={s.wrapper}>
      <h3>Groups</h3>
      <div className={s.table_container}>
        <table>
          <thead>
            <tr>
              <th colSpan={1}>Name</th>
              <th colSpan={1}>Created</th>
              <th colSpan={1}>Owner</th>
              <th colSpan={2}>Description</th>
              <th colSpan={1}>Members</th>
              <th colSpan={1}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupList.length > 0
              ? groupList.map((group: GroupWithUsers) => (
                  <tr key={group.groupId}>
                    <td colSpan={1}> {group.name}</td>
                    <td colSpan={1}>
                      {moment(group.dateCreated).format("MMM Do YY")}
                    </td>
                    <td colSpan={1}>{group.owner}</td>
                    <td colSpan={2}>{group.description}</td>
                    <td colSpan={1} className={s.group_members}>
                      <ul>
                        {group.groupMembers && group.groupMembers.length > 0
                          ? group.groupMembers.map((user: User) => (
                              <li key={user.userId}>{user.userName}</li>
                            ))
                          : "-"}
                      </ul>
                    </td>
                    <td colSpan={1}>
                      <div className={s.table_actions}>
                        <button
                          onClick={() => {
                            setGroupToEdit(group);
                            toggleEditGroupModal(true);
                          }}
                        >
                          EDIT
                        </button>
                        <button
                          className={s.delete_btn}
                          onClick={() => {
                            toggleConfirmationModal(
                              true,
                              `Would you like to delete ${group.name}?`
                            );
                            setConfirmationModalActions(() =>
                              performGroupDelete(group.groupId)
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
      <div className={s.add_group_wrapper}>
        <button onClick={() => toggleActiveModal(true)}>ADD GROUP</button>
      </div>
      <AddGroupModal
        isVisible={isModalActive}
        toggleAddGroupModal={toggleActiveModal}
      ></AddGroupModal>
      <EditGroupModal
        toggleAddGroupModal={toggleEditGroupModal}
        isVisible={isEditModalActive}
        groupToEdit={groupToEdit}
      ></EditGroupModal>
    </section>
  );
}

export default GroupsTable;
