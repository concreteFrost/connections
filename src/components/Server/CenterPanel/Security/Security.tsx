import s from "./Security.module.scss"
import useStore from "../../../../store/store";
import { useEffect } from "react";
import UsersTable from "./UsersTable/UsersTable";
import GroupsTable from "./GroupsTable/GroupsTable";
import { IGroup } from "../../../../store/interfaces/ISecurity";

function Security() {

    const { getUserList, getGroupList, getRolesList } = useStore((state) => state.securitySlice);

    async function fetchUsersAndGroups() {
        try {
            await getUserList();
            await getGroupList();
            await getRolesList();

        }
        catch (e) {
            console.log('error getting user/group list', e);
        }
    }

    useEffect(() => {
        fetchUsersAndGroups();
    }, [])

    return (<div className={s.wrapper}>
        <div>
            <main>
                <UsersTable></UsersTable>
                <GroupsTable></GroupsTable>
            </main>
        </div>
    </div>)
}

export default Security;