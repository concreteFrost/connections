import s from "./AlertFormat.module.scss";
import useStore from "../../../../../../store/store";
import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { IAlertFormat } from "../../../../../../store/interfaces/IAlerts";
import moment from "moment";


function AlertFormat() {

    function updateAlertFormat(id: number, key: any, value: any) {
        const updatedAlertFormats = alertFormats.map((alertFormat: IAlertFormat) =>
            alertFormat.alertFormatId === id ? { ...alertFormat, [key]: value } : alertFormat
        );

        setAlertFormats(updatedAlertFormats);
    }
    const columns: any = useMemo(() => [{
        Header: "Name",
        accessor: "name",
        Cell: ({ row }: { row: { original: IAlertFormat } }) => (
            <input
                type="text"
                value={row.original.name}
                onChange={(e) => {
                    updateAlertFormat(row.original.alertFormatId, "name", e.target.value);
                }}
            />
        )
    },
    {
        Header: "Descritpion",
        accessor: "description",
        Cell: ({ row }: { row: { original: IAlertFormat } }) => (
            <textarea
                value={row.original.name}
                onChange={(e) => {
                    updateAlertFormat(row.original.alertFormatId, "description", e.target.value);
                }}
            />
        )
    },
    {
        Header: "Category",
        accessor: "category"
    },

    {
        Header: "User/Group",
        accessor: "userOrGroupId",
        Cell: ({ row }: { row: { original: IAlertFormat } }) => {
            const user = userList.find(user => user.userId === row.original.userOrGroupId);
            const group = groupList.find(group => group.groupId === row.original.userOrGroupId);

            if (user || group) {
                return (
                    <select
                        value={row.original.userOrGroupId}
                        onChange={(e) => {
                            updateAlertFormat(row.original.alertFormatId, "userOrGroupId", e.target.value);
                        }}
                    >
                        {userList.length > 0 &&
                            <optgroup label="Users">
                                {userList.map(user => (
                                    <option key={user.userId} value={user.userId}>{user.userName}</option>
                                ))}
                            </optgroup>
                        }
                        {groupList.length > 0 &&
                            <optgroup label="Groups">
                                {groupList.map(group => (
                                    <option key={group.groupId} value={group.groupId}>{group.name}</option>
                                ))}
                            </optgroup>
                        }
                    </select>
                );
            }
            
        }
    },
    {
        Header: "Created",
        accessor: "dateCreated",
        Cell: ({ value }: { value: string }) => moment(value).format('lll')
    },
    {
        Header: "Last Amended",
        accessor: "lastAmended",
        Cell: ({ value }: { value: string }) => moment(value).format('lll')
    },
    {
        Header: "Active",
        accessor: "isActive",
        Cell: ({ row }: { row: { original: IAlertFormat } }) => (
            <input
                type="checkbox"
                checked={row.original.isActive}
                onChange={(e) => {
                    updateAlertFormat(row.original.alertFormatId, "isActive", !row.original.isActive);
                }}
            />
        )

    }
    ], [])


    const [alertFormats, setAlertFormats] = useState<Array<IAlertFormat>>([]);
    const { getAlertFormats } = useStore((state) => state.alertSlice);
    const { getUserList, getGroupList, userList, groupList } = useStore((state) => state.securitySlice);
    const tableInstance = useTable({ columns: columns, data: alertFormats }, useSortBy, usePagination);

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state
    }: any = tableInstance;

    const { pageIndex } = state

    const fetchAlertFormats = async () => {
        try {
            const res: any = await getAlertFormats();
            setAlertFormats(res)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchUsersAndGroups() {
        try {
            await getUserList();
            await getGroupList();
        }
        catch (e) {
            console.log('error getting user/group list', e);
        }
    }

    async function fetchAllData(){
        try {
            await fetchAlertFormats();
            await fetchUsersAndGroups();
        } catch (error) {
            console.log('error getting user/group list', error);
        }
    }

    useEffect(() => {
       fetchAllData();
    }, [])

    return (<section className={s.wrapper}>
        <header><h3>Alert Format Control</h3></header>
        <div className={s.header_btn_wrapper}><button>ADD</button></div>
        <main>
            <div className={s.table_wrapper}>
                <table>
                    <thead>
                        {headerGroups.map((headerGroup: any) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>{
                                        column.render("Header")
                                    }</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row: any) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell: any) => {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className={s.table_footer_wrapper}>
                {canPreviousPage ? <button onClick={previousPage}>Previous</button> : null}
                {pageOptions.length > 1 ? <span>Page {pageIndex + 1} of {pageOptions.length}</span> : null}
                {canNextPage ? <button onClick={nextPage} >Next</button> : null}
            </div>
        </main>
    </section>)
}

export default AlertFormat;