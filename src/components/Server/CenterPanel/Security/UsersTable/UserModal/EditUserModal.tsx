import s from "./EditUserModal.module.scss";
import useStore from "../../../../../../store/store";
import { IGroup, IRole, IUser } from "../../../../../../store/interfaces/ISecurity";
import { useState, useEffect } from 'react';

interface EditUserModalProps {
    isVisible: boolean,
    toggleEditUser: (user: IUser | null) => void;
}

function EditUserModal(props: EditUserModalProps) {

    const { userToEdit, getUserList, groupList, rolesList, updateUser } = useStore((state) => state.securitySlice);
    const { toggleMessageModal, setModalMessage } = useStore((state) => state.modalWindowsSlice);
    const [_userToEdit, setUserToEdit] = useState<IUser | null>(userToEdit);

    function setTextProps(propName: keyof IUser, value: any) {
        if (_userToEdit) {
            setUserToEdit({ ..._userToEdit, [propName]: value })
        }

    }
    function setUserGroups(group: IGroup) {
        if (_userToEdit) {
            const updatedGroups = (_userToEdit.belongsToGroups ?? []).some(existingGroup => existingGroup.groupId === group.groupId)
                ? (_userToEdit.belongsToGroups ?? []).filter(existingGroup => existingGroup.groupId !== group.groupId)
                : [...(_userToEdit.belongsToGroups ?? []), group];

            setUserToEdit({
                ..._userToEdit,
                belongsToGroups: updatedGroups,
            });
        }
    }

    function setUserRoles(role: IRole) {
        if (_userToEdit) {
            const updatedRoles = (_userToEdit.userRoles ?? []).some(existingRole => existingRole.roleId === role.roleId)
                ? (_userToEdit.userRoles ?? []).filter(existingRole => existingRole.roleId !== role.roleId)
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
                const res: any = await updateUser(_userToEdit);
                await toggleMessageModal();
                if (res.data.success) {
                    await setModalMessage('success!!!');
                    await getUserList();
                    await props.toggleEditUser(null);
                } else {
                    await setModalMessage(res.data.message);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }


    useEffect(() => {
        setUserToEdit(userToEdit)
    }, [props.isVisible])

    return (<>
        {props.isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}>EDIT</header>
                <main className={s.modal_body}>
                    <form onSubmit={submitForm} className={s.form}>
                        <section className={s.text_values_wrapper}>
                            <div className={s.text_values_item}>
                                {/*USER NAME */}
                                <label htmlFor="userName">User Name:</label>
                                <input type="text" id="userName" name="userName" value={_userToEdit?.userName ? _userToEdit?.userName : ''}
                                    onChange={(e) => setTextProps('userName', e.target.value)}
                                    required />
                                {/*EMAIL */}
                                <label htmlFor="emailAddress">Email Address:</label>
                                <input type="text" id="emailAddress" name="emailAddress" value={_userToEdit?.emailAddress ? _userToEdit?.emailAddress : ''}
                                    onChange={(e) => setTextProps('emailAddress', e.target.value)}
                                />
                            </div>

                            <div className={s.text_values_item}>
                                {/*PHONE */}
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" value={_userToEdit?.phone ? _userToEdit?.phone : ''}
                                    onChange={(e) => setTextProps('phone', e.target.value)}
                                />
                                {/*LEVEL */}
                                <label htmlFor="userLevel">User Level:</label>
                                <input type="number" id="userLevel" name="userLevel" value={_userToEdit?.userLevel ? _userToEdit?.userLevel : ''}
                                    onChange={(e) => setTextProps('userLevel', e.target.value)}
                                    required />
                            </div>
                        </section>

                        <section className={s.dropdown_wrapper}>
                            <div className={s.dropdown_item}>
                                {/* GROUPS */}
                                <label htmlFor="belongsToGroups">Belongs To Groups:</label>
                                <div className={s.group_wrapper}>
                                    {groupList.length > 0 ? (
                                        groupList.map((group: IGroup) => (
                                            <div key={group.groupId} className={s.group_wrapper_item}>
                                                <label>{group.name}</label>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        _userToEdit?.belongsToGroups?.some(
                                                            (userGroup: IGroup) => userGroup.groupId === group.groupId
                                                        )
                                                    }
                                                    onChange={() => setUserGroups(group)}
                                                />
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                            </div>
                            <div className={s.dropdown_item}>
                                {/* ROLES */}
                                <label htmlFor="userRoles">User Roles:</label>
                                <div className={s.group_wrapper}>
                                    {rolesList.length > 0 ? (
                                        rolesList.map((role: IRole) => (
                                            <div key={role.roleId} className={s.group_wrapper_item}>
                                                <label>{role.roleName}</label>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        _userToEdit?.userRoles?.some(
                                                            (userRole: IRole) => userRole.roleId === role.roleId
                                                        )
                                                    }
                                                    onChange={() => setUserRoles(role)}
                                                />
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                            </div>
                        </section>

                        <section className={s.checkboxes_wrapper}>
                            <div className={s.checkboxes_item}>
                                {/*IS ACTIVE */}
                                <label htmlFor="isActive">Is Active:</label>
                                <input type="checkbox" id="isActive" name="isActive" checked={_userToEdit?.isActive}
                                    onChange={(e: any) => setTextProps('isActive', !_userToEdit?.isActive)} />
                            </div>
                        </section>
                        <section className={s.form_btns_wrapper}>
                            <button>UPDATE</button>
                            <button onClick={() => props.toggleEditUser(null)}>CANCEL</button>
                        </section>
                    </form>
                </main>

            </div>
        </div> : null}
    </>)

}

export default EditUserModal;