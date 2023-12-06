import s from "./Security.module.scss"
import useStore from "../../../../store/store";
import { useEffect } from "react";
import { IGroup } from "../../../../store/interfaces/ISecurity";
import UsersTable from "./UsersTable/UsersTable";

function Security() {

    const { groupList, getGroupList } = useStore((state) => state.securitySlice);

    async function fetchUsersAndGroups() {
        try {

            await getGroupList();
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
            <header>Users/Groups</header>
            <main>
                <UsersTable></UsersTable>
                {/* <section>
                    <h3>Groups</h3>
                    <ul>
                        {groupList.length > 0 ? groupList.map((group: IGroup) => <li key={group.groupId}>{group.name}</li>) : null}
                    </ul>
                </section> */}

            </main>
        </div>
    </div>)
}

export default Security;