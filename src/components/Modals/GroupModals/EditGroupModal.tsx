import s from "./EditGroupModal.module.scss";
import useStore from "store/store";
import { useEffect, useState } from "react";
import { Group, GroupWithUsers, User } from "store/interfaces/ISecurity";
import { addGroupMemberAPI, removeGroupMemberAPI } from "api/security";

interface EditGroupModalProps {
    isVisible: boolean,
    toggleAddGroupModal: (isVisible: boolean) => void;
    groupToEdit: GroupWithUsers | undefined;
}

function EditGroupModal(props: EditGroupModalProps) {

    const { userList, getGroupList, getUserList } = useStore((state) => state.securitySlice);
    const [availableMembers, setAvailableMembers] = useState<Array<User>>();
    const [currentMembers, setCurrentMembers] = useState<Array<User>>();

    async function removeFromGroup(user: User, groupId: string) {
        try {
            const res: any = await removeGroupMemberAPI(user.userId, groupId)

            if (res.data.success) {
                removeFromCurrentUsers(user.userId);
                addToAvailableUsers(user)
                await getGroupList()
                await getUserList()
            }
        }
        catch (e) {
            console.log('error removing member from group', e)
        }
    }

    async function addToGroup(user: User, groupId: string) {
        try {
            const res: any = await addGroupMemberAPI(user.userId, groupId)
            if (res.data.success) {
                removeFromAvailableUsers(user.userId);
                addToCurrentUsers(user);
                await getGroupList()
                await getUserList()
            }
        }
        catch (e) {
            console.log('error adding to group', e)
        }
    }

    function removeFromCurrentUsers(userId: string) {
        setCurrentMembers((prevCurrentMembers: any) => prevCurrentMembers.filter((user: User) => user.userId !== userId));
    }

    function addToCurrentUsers(newUser: User) {
        setCurrentMembers((previousUsers: any) => [...previousUsers, newUser])
    }

    function removeFromAvailableUsers(userId: string) {
        setAvailableMembers((prevCurrentMembers: any) => prevCurrentMembers.filter((user: User) => user.userId !== userId));
    }

    function addToAvailableUsers(newUser: User) {
        setAvailableMembers((previousUsers: any) => [...previousUsers, newUser])
    }

    const filteredList = (listToFilter: Array<User>, listToCheck: Array<User>) => {
        console.log('filtering')
        return listToFilter.filter((availableUser: User) =>
            !listToCheck?.some((currentUser: User) => currentUser.userId === availableUser.userId)
        );

    }

    function filterUsers() {
        setCurrentMembers(props.groupToEdit?.groupMembers)
        if (props.groupToEdit?.groupMembers)
            setAvailableMembers(filteredList(userList, props.groupToEdit?.groupMembers))
    }


    useEffect(() => {
        filterUsers()
    }, [props.isVisible])

    return (<>
        {props.isVisible ? <div className={s.container}>
            <div className={s.modal_window}>
                <header className={s.modal_header}>EDIT {props.groupToEdit?.name.toUpperCase()}</header>
                <main className={s.modal_body}>
                    <div className={s.form}>
                        <section className={s.lists_wrapper}>
                            <div className={s.checkboxes_item}>
                                <label htmlFor="currentMembers">Current Members:</label>
                                <ul>
                                    {currentMembers && currentMembers.length > 0 ?
                                        currentMembers.map((user: User) => <li key={user.userId}>
                                            <div className={s.list_item_wrapper}>
                                                <p>{user.userName}</p>
                                                <button className={s.delete_from_group_btn} onClick={() => {
                                                    if (props.groupToEdit)
                                                        removeFromGroup(user, props.groupToEdit?.groupId)
                                                }}>X</button>
                                            </div>
                                        </li>
                                        ) : null}
                                </ul>
                            </div>
                            <div className={s.checkboxes_item}>
                                <label htmlFor="availableMembers">Available Members:</label>
                                <ul>
                                    {availableMembers && availableMembers.length > 0 ?
                                        availableMembers.map((user: User) => <li key={user.userId}>
                                            <div className={s.list_item_wrapper}>
                                                <p>{user.userName}</p>
                                                <button className={s.add_to_group_btn} onClick={() => {
                                                    if (props.groupToEdit)
                                                        addToGroup(user, props.groupToEdit?.groupId)
                                                }}>ADD</button>
                                            </div>
                                        </li>
                                        ) : null}
                                </ul>
                            </div>
                        </section>

                        <section className={s.form_btns_wrapper}>
                            <button onClick={() => props.toggleAddGroupModal(false)}>OK</button>
                        </section>

                    </div>
                </main>

            </div>
        </div> : null}
    </>)

}

export default EditGroupModal;