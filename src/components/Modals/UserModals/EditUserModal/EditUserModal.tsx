import s from "./EditUserModal.module.scss";
import useStore from "store/store";
import { Group, Role, User } from "store/interfaces/ISecurity";
import { useState, useEffect } from "react";
import useEscapeKeyHandler from "hooks/useEscapeKeyHandler";
import { generatePasswordAPI, getGroupListAPI, getRoleListAPI, resetPasswordAPI, updateUserAPI } from "api/security";

interface EditUserModalProps {
  isVisible: boolean;
  toggleEditUser: (isVisible: boolean) => void;
}

function EditUserModal(props: EditUserModalProps) {
  const {
    userToEdit,
    getUserList, // to update data in UsersTable and GroupsTable
    getGroupList,
  } = useStore((state) => state.securitySlice);
  const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);
  const [_userToEdit, setUserToEdit] = useState<User | null>(userToEdit);
  const [isResetPasswordActive, setResetPasswordActive] =
    useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [emailUserPassword, setEmailUserPassword] = useState<boolean>(false);

  const [groupList, setGroupList] = useState<Array<Group>>([]);
  const [rolesList, setRolesList] = useState<Array<Role>>([]);

  async function _getRolesList() {
    try {
      const res: any = await getRoleListAPI();
      if(res.data.length>0){
        setRolesList(res.data)
      }
    } catch (error) {
        console.log('error getting roles in edit user modal')
    }
  }

  //isolating from BLL to avoid extra renders in UsersTable and GroupsTable
  async function _getGroupsList() {
    try {
      const res: any = await getGroupListAPI();
      if (res.data.success) {
        setGroupList(res.data.groups);
      }
    } catch (error) {
        console.log('error getting groups in edit user modal')
    }
  }

  async function fetchRolesAndGroups() {
    try {
        await _getRolesList();
        await _getGroupsList();
    } catch (e) {
      console.log("error fetching groups", e);
    }
  }

  async function performResetPassword() {
    if (userToEdit)
      try {
        const res: any = await resetPasswordAPI(
          userToEdit?.userId,
          newPassword,
          emailUserPassword
        );
        if (!res.data.success) {
          toggleMessageModal(res.data.message);
        } else {
          toggleMessageModal("success!!!");
        }
      } catch (e) {
        console.log("error reseting user password", e);
      }
  }

  async function performPasswordGeneration() {
    try {
      const res: any = await generatePasswordAPI(1, 12);
      setNewPassword(res.data.message);
    } catch (e) {
      console.log("error generating password", e);
    }
  }

  function setTextProps(propName: keyof User, value: any) {
    if (_userToEdit) {
      setUserToEdit({ ..._userToEdit, [propName]: value });
    }
  }
  function setUserGroups(group: Group) {
    if (_userToEdit) {
      const updatedGroups = (_userToEdit.belongsToGroups ?? []).some(
        (existingGroup) => existingGroup.groupId === group.groupId
      )
        ? (_userToEdit.belongsToGroups ?? []).filter(
            (existingGroup) => existingGroup.groupId !== group.groupId
          )
        : [...(_userToEdit.belongsToGroups ?? []), group];

      setUserToEdit({
        ..._userToEdit,
        belongsToGroups: updatedGroups,
      });
    }
  }

  function setUserRoles(role: Role) {
    if (_userToEdit) {
      console.log(role);
      const updatedRoles = (_userToEdit.userRoles ?? []).some(
        (existingRole) => existingRole.roleId === role.roleId
      )
        ? (_userToEdit.userRoles ?? []).filter(
            (existingRole) => existingRole.roleId !== role.roleId
          )
        : [...(_userToEdit.userRoles ?? []), role];

      setUserToEdit({
        ..._userToEdit,
        userRoles: updatedRoles,
      });
    }
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (_userToEdit) {
        const res: any = await updateUserAPI(_userToEdit);

        if (res.data.success) {
          await toggleMessageModal("success!!!");
          await getUserList();
          await getGroupList();
          await props.toggleEditUser(false);
        } else {
          await toggleMessageModal(res.data.message);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (props.isVisible) {
      setUserToEdit(userToEdit);
      fetchRolesAndGroups();
    }
  }, [props.isVisible]);

  useEscapeKeyHandler(() => props.toggleEditUser(false));

  return (
    <>
      {props.isVisible && _userToEdit ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <header className={s.modal_header}>EDIT</header>
            <main className={s.modal_body}>
              <form onSubmit={submitForm} className={s.form}>
                <section className={s.text_values_wrapper}>
                  <div className={s.text_values_item}>
                    {/*USER NAME */}
                    <label htmlFor="userName">User Name:</label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={_userToEdit.userName}
                      onChange={(e) => setTextProps("userName", e.target.value)}
                      required
                    />
                    {/*EMAIL */}
                    <label htmlFor="emailAddress">Email Address:</label>
                    <input
                      type="text"
                      id="emailAddress"
                      name="emailAddress"
                      value={_userToEdit.emailAddress}
                      onChange={(e) =>
                        setTextProps("emailAddress", e.target.value)
                      }
                    />
                  </div>

                  <div className={s.text_values_item}>
                    {/*PHONE */}
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={_userToEdit.phone}
                      onChange={(e) => setTextProps("phone", e.target.value)}
                    />
                    {/*LEVEL */}
                    <label htmlFor="userLevel">User Level:</label>
                    <input
                      type="number"
                      id="userLevel"
                      name="userLevel"
                      value={_userToEdit.userLevel}
                      onChange={(e) =>
                        setTextProps("userLevel", e.target.value)
                      }
                      required
                    />
                  </div>
                </section>

                <section className={s.reset_password_wrapper}>
                  <div className={s.reset_password_item}>
                    <button
                      type="button"
                      className={s.reset_password_btn}
                      onClick={() =>
                        setResetPasswordActive(!isResetPasswordActive)
                      }
                    >
                      RESET PASSWORD
                    </button>
                  </div>
                  {/*RESET PASSWORD */}
                  {isResetPasswordActive ? (
                    <>
                      <div className={s.reset_password_item}>
                        <label htmlFor="newPassword">New Password:</label>
                        <input
                          type="text"
                          id="newPassword"
                          name="newPassword"
                          value={newPassword}
                          onChange={(e: any) => setNewPassword(e.target.value)}
                        />
                        <div className={s.generate_password_btn}>
                          <button
                            type="button"
                            onClick={performPasswordGeneration}
                          >
                            GENERATE
                          </button>
                        </div>
                      </div>
                      <div className={s.reset_password_footer}>
                        <div>
                          <label htmlFor="newPassword">Email user:</label>
                          <input
                            type="checkbox"
                            checked={emailUserPassword}
                            onChange={(e: any) =>
                              setEmailUserPassword(!emailUserPassword)
                            }
                          />
                        </div>

                        <button type="button" onClick={performResetPassword}>
                          Reset
                        </button>
                      </div>
                    </>
                  ) : null}
                </section>

                <section className={s.dropdown_wrapper}>
                  <div className={s.dropdown_item}>
                    {/* GROUPS */}
                    <label htmlFor="belongsToGroups">Belongs To Groups:</label>
                    <div className={s.group_wrapper}>
                      {groupList.length > 0
                        ? groupList.map((group: Group) => (
                            <div
                              key={group.groupId}
                              className={s.group_wrapper_item}
                            >
                              <label>{group.name}</label>
                              <input
                                type="checkbox"
                                checked={_userToEdit.belongsToGroups?.some(
                                  (userGroup: Group) =>
                                    userGroup.groupId === group.groupId
                                )}
                                onChange={() => setUserGroups(group)}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                  <div className={s.dropdown_item}>
                    {/* ROLES */}
                    <label htmlFor="userRoles">User Roles:</label>
                    <div className={s.group_wrapper}>
                      {rolesList.length > 0
                        ? rolesList.map((role: Role) => (
                            <div
                              key={role.roleId}
                              className={s.group_wrapper_item}
                            >
                              <label>{role.roleName}</label>
                              <input
                                type="checkbox"
                                checked={_userToEdit.userRoles?.some(
                                  (userRole: Role) =>
                                    userRole.roleId === role.roleId
                                )}
                                onChange={() => setUserRoles(role)}
                              />
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </section>

                <section className={s.checkboxes_wrapper}>
                  <div className={s.checkboxes_item}>
                    {/*IS ACTIVE */}
                    <label htmlFor="isActive">Is Active:</label>
                    <input
                      type="checkbox"
                      id="isActive"
                      name="isActive"
                      checked={_userToEdit.isActive}
                      onChange={(e: any) =>
                        setTextProps("isActive", !_userToEdit.isActive)
                      }
                    />
                  </div>
                </section>
                <section className={s.form_btns_wrapper}>
                  <button>UPDATE</button>
                  <button onClick={() => props.toggleEditUser(false)}>
                    CANCEL
                  </button>
                </section>
              </form>
            </main>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default EditUserModal;
