import { useMemo } from "react";
import s from "./LogTable.module.scss";
import useStore from "../../../../../../store/store";
import { useTable, useSortBy, usePagination } from "react-table";

function LogTable() {
  const { logList } = useStore((state) => state.serverSlice.logSearch);
  const columns: any = useMemo(() => [{
    Header: "TIMESTAMP",
    accessor: "timeStamp",
  },
  {
    Header: "LOG TYPE",
    accessor: "logType",
  },
  {
    Header: "PROCESS ID",
    accessor: "processId"
  },
  {
    Header: "FLOW ID",
    accessor: "flowId"
  },
  {
    Header: "BLOCK ID",
    accessor: "blockId"
  },
  {
    Header: "STATUS CODE",
    accessor: "statusCode"
  },
  {
    Header: "DURATION",
    accessor: "duration"
  },
  {
    Header: "KEY LIST",
    accessor: "keyList"
  },
  {
    Header: "ADDITIONAL TEXT",
    accessor: "additionalText"
  }
  ], [])

  const tableInstance = useTable({ columns: columns, data: logList }, useSortBy, usePagination);
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

  const { pageIndex} = state

  return (
    <div className={s.wrapper}>
      <div className={s.table_wrapper}>
        <table {...getTableProps()}>
          <thead >
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
        {pageOptions.length>1 ? <span>Page {pageIndex + 1} of {pageOptions.length}</span> : null }
        {canNextPage ? <button onClick={nextPage} >Next</button> : null}
      </div>
    </div>
  );
}

export default LogTable;
