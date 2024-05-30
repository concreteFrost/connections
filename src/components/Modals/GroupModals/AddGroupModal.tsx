import s from "./AddGroupModal.module.scss";
import useStore from "../../../store/store";
import { useEffect, useState } from "react";
import { Group, User } from "../../../store/interfaces/ISecurity";

interface EditUserModalProps {
    isVisible: boolean,
    toggleAddGroupModal: (isVisible: boolean) => void;
}

const initialGroup: Group = {
    groupId: '',
    name: 'New Group',
    description: '',
    active: false,
    owner: '',
    dateCreated: new Date().toString(),
    lastAmended: new Date().toString(),
}

function AddGroupModal(props: EditUserModalProps) {

    const { userList, createGroup, getGroupList } = useStore((state) => state.securitySlice);

    const { toggleMessageModal} = useStore((state) => state.modalWindowsSlice);
    const [newGroup, setNewGroup] = useState<Group>(initialGroup);

    function setGroupProps(propName: keyof Group, value: any) {
        setNewGroup(
            {
                ...newGroup,
                [propName]: value
            });
    }

    async function submitForm(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res: any = await createGroup(newGroup);
            await console.log(res)
            if (res.data.success) {
                await getGroupList()
                await props.toggleAddGroupModal(false)
            }
            else {
                toggleMessageModal(res.data.message);
                // setModalMessage(res.data.message)
            }


        }
        catch (e) {
            console.log('error creating group', e)
        }
    }

    return (<>
        {props.isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}>ADD GROUP</header>
                <main className={s.modal_body}>
                    <form onSubmit={submitForm} className={s.form}>
                        <section className={s.text_values_wrapper}>
                            <div className={s.text_values_item}>
                                {/*GROUP NAME */}
                                <label htmlFor="name">Group Name:</label>
                                <input type="text" id="name" name="name"
                                    value={newGroup.name}
                                    onChange={(e: any) => setGroupProps('name', e.target.value)}
                                    required />
                                {/*GROUP DESCRIPTION */}
                                <label htmlFor="description">Description:</label>
                                <textarea name="description" value={newGroup.description}
                                    onChange={(e: any) => setGroupProps('description', e.target.value)}
                                ></textarea>
                            </div>
                        </section>

                        <section className={s.dropdown_wrapper}>
                            <div className={s.dropdown_item}>
                                {/*OWNER */}
                                <label htmlFor="owner">Owner:</label>
                                <select name="owner" value={newGroup.owner} onChange={(e: any) => setGroupProps('owner', e.target.value)}>
                                    <option value={'null'}>---Select---</option>
                                    {userList.length > 0 ? userList.map((user: User) =>
                                        <option key={user.userId} value={user.userId}>{user.userName}</option>
                                    ) : null}
                                </select>
                            </div>
                        </section>

                        <section className={s.checkboxes_wrapper}>
                            <div className={s.checkboxes_item}>
                                {/*IS ACTIVE */}
                                <label htmlFor="isActive">Is Active:</label>
                                <input type="checkbox" id="isActive" name="isActive" />
                            </div>
                        </section>
                        <section className={s.form_btns_wrapper}>
                            <button>ADD</button>
                            <button onClick={() => props.toggleAddGroupModal(false)}>CANCEL</button>
                        </section>

                    </form>
                </main>

            </div>
        </div> : null}
    </>)

}

export default AddGroupModal;