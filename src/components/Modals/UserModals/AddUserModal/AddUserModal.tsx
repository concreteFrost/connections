import s from "./AddUserModal.module.scss";
import useStore from "../../../../store/store";
import { Group, Role, NewUser } from "../../../../store/interfaces/ISecurity";
import { useState } from "react";


interface EditUserModalProps {
    isVisible: boolean,
    toggleAddUserModal: (isVisible: boolean) => void;
}

const initialUser: NewUser = {
    userName: '',
    password: '',
    userLogin: '',
    isActive: false,
    emailAddress: '',
    emailConfirmed: false,
    phone: '',
    phoneConfirmed: false,
    userLevel: 0,
    restrictedToIPAddress: '',
    addToGroups: [],
    userRoleIds: [],
}

function AddUserModal(props: EditUserModalProps) {

    const { addUser, getUserList, groupList, rolesList, generatePassword, getGroupList } = useStore((state) => state.securitySlice);
    const [newUser, setNewUser] = useState<NewUser>(initialUser);
    const { toggleMessageModal } = useStore((state) => state.modalWindowsSlice);

    function setTextProps(propName: keyof NewUser, value: any) {
        if (newUser) {
            setNewUser({ ...newUser, [propName]: value })
        }

    }
    function setUserGroups(group: Group) {
        if (newUser) {
            const updatedGroups = (newUser.addToGroups ?? []).some(existingGroup => existingGroup === group.groupId)
                ? (newUser.addToGroups ?? []).filter(existingGroup => existingGroup !== group.groupId)
                : [...(newUser.addToGroups ?? []), group.groupId];

            setNewUser({
                ...newUser,
                addToGroups: updatedGroups,
            });
        }
    }

    function setUserRoles(role: Role) {
        if (newUser) {
            const updatedRoles = (newUser.userRoleIds ?? []).some(existingRole => existingRole === role.roleId)
                ? (newUser.userRoleIds ?? []).filter(existingRole => existingRole !== role.roleId)
                : [...(newUser.userRoleIds ?? []), role.roleId];

            setNewUser({
                ...newUser,
                userRoleIds: updatedRoles,
            });
        }
    }

    async function performPasswordGeneration() {
        try {
            const res: any = await generatePassword(1, 12);
            setTextProps('password', res)
        }
        catch (e) {
            console.log('error generating password', e);
        }
    }


    async function submitForm(e: React.FormEvent) {
        e.preventDefault();
        try {
            {
                const res: any = await addUser(newUser);
              
                if (res.data.success) {
                    await toggleMessageModal("success!!!");
                    await getUserList();
                    await getGroupList()
                    await props.toggleAddUserModal(false)
                } else {
                    await toggleMessageModal(res.data.message);
                }
            }
        } catch (e) {
            console.error(e);
        }

    }

    return (<>
        {props.isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}>ADD USER</header>
                <main className={s.modal_body}>
                    <form onSubmit={submitForm} className={s.form}>
                        <section className={s.text_values_wrapper}>
                            <div className={s.text_values_item}>
                                {/*USER NAME */}
                                <label htmlFor="userName">User Name:</label>
                                <input type="text" id="userName" name="userName" value={newUser?.userName ? newUser.userName : ''}
                                    onChange={(e) => setTextProps('userName', e.target.value)}
                                    required />
                                {/*USER LOGIN */}
                                <label htmlFor="userLogin">User Login:</label>
                                <input type="text" id="userLogin" name="userLogin" value={newUser?.userLogin ? newUser.userLogin : ''}
                                    onChange={(e) => setTextProps('userLogin', e.target.value)}
                                    required />
                                {/*USER PASSWORD */}
                                <label htmlFor="password">Password:</label>
                                <input type="text" id="password" name="password" value={newUser?.password ? newUser.password : ''}
                                    onChange={(e) => setTextProps('password', e.target.value)}
                                    required />
                                <div className={s.generate_password_btn}><button type="button" onClick={performPasswordGeneration}>GENERATE</button></div>

                            </div>

                            <div className={s.text_values_item}>
                                {/*EMAIL */}
                                <label htmlFor="emailAddress">Email Address:</label>
                                <input type="text" id="emailAddress" name="emailAddress" value={newUser?.emailAddress ? newUser.emailAddress : ''}
                                    onChange={(e) => setTextProps('emailAddress', e.target.value)}
                                />
                                {/*PHONE */}
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" value={newUser?.phone ? newUser.phone : ''}
                                    onChange={(e) => setTextProps('phone', e.target.value)}
                                />
                                {/*LEVEL */}
                                <label htmlFor="userLevel">User Level:</label>
                                <input type="number" id="userLevel" name="userLevel" value={newUser?.userLevel ? newUser.userLevel : ''}
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
                                        groupList.map((group: Group) => (
                                            <div key={group.groupId} className={s.group_wrapper_item}>
                                                <label>{group.name}</label>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        newUser?.addToGroups?.some(
                                                            (userGroup: string) => userGroup === group.groupId
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
                                        rolesList.map((role: Role) => (
                                            <div key={role.roleId} className={s.group_wrapper_item}>
                                                <label>{role.roleName}</label>
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        newUser?.userRoleIds?.some(
                                                            (userRole: string) => userRole === role.roleId
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
                                <input type="checkbox" id="isActive" name="isActive" checked={newUser?.isActive}
                                    onChange={(e: any) => setTextProps('isActive', !newUser?.isActive)} />
                            </div>
                        </section>
                        <section className={s.form_btns_wrapper}>
                            <button>ADD</button>
                            <button onClick={() => props.toggleAddUserModal(false)}>CANCEL</button>
                        </section>

                    </form>
                </main>

            </div>
        </div> : null}
    </>)

}

export default AddUserModal;