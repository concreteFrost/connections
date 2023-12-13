import s from "./EditGroupModal.module.scss";
import useStore from "../../../store/store";
import { useEffect, useState } from "react";
import { IGroup, IGroupWithUsers, IUser } from "../../../store/interfaces/ISecurity";

interface EditGroupModalProps {
    isVisible: boolean,
    toggleAddGroupModal: (isVisible: boolean) => void;
    groupToEdit: IGroupWithUsers | undefined;
}

function EditGroupModal(props: EditGroupModalProps) {

    const { userList, addGroupMember, removeGroupMember, getGroupList, getUserList } = useStore((state) => state.securitySlice);
    const [availableMembers, setAvailableMembers] = useState<Array<IUser>>();
    const [currentMembers, setCurrentMembers] = useState<Array<IUser>>();

    async function removeFromGroup(user: IUser, groupId: string) {
        try {
            const res: any = await removeGroupMember(user.userId, groupId)

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

    async function addToGroup(user: IUser, groupId: string) {
        try {
            const res: any = await addGroupMember(user.userId, groupId)
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
        setCurrentMembers((prevCurrentMembers: any) => prevCurrentMembers.filter((user: IUser) => user.userId !== userId));
    }

    function addToCurrentUsers(newUser: IUser) {
        setCurrentMembers((previousUsers: any) => [...previousUsers, newUser])
    }

    function removeFromAvailableUsers(userId: string) {
        setAvailableMembers((prevCurrentMembers: any) => prevCurrentMembers.filter((user: IUser) => user.userId !== userId));
    }

    function addToAvailableUsers(newUser: IUser) {
        setAvailableMembers((previousUsers: any) => [...previousUsers, newUser])
    }

    const filteredList = (listToFilter: Array<IUser>, listToCheck: Array<IUser>) => {
        console.log('filtering')
        return listToFilter.filter((availableUser: IUser) =>
            !listToCheck?.some((currentUser: IUser) => currentUser.userId === availableUser.userId)
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
                                        currentMembers.map((user: IUser) => <li key={user.userId}><p>{user.userName}</p> <button className={s.remove_member} onClick={() => {
                                            if (props.groupToEdit)
                                                removeFromGroup(user, props.groupToEdit?.groupId)
                                        }}>X</button></li>
                                        ) : null}
                                </ul>
                            </div>
                            <div className={s.checkboxes_item}>
                                <label htmlFor="availableMembers">Available Members:</label>
                                <ul>
                                    {availableMembers && availableMembers.length > 0 ?
                                        availableMembers.map((user: IUser) => <li key={user.userId}><p>{user.userName}</p> <button className={s.remove_member} onClick={() => {
                                            if (props.groupToEdit)
                                                addToGroup(user, props.groupToEdit?.groupId)
                                        }}>ADD</button></li>
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