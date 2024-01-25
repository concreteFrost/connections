import React, { useEffect, useState } from "react";
import s from "./LogTable.module.scss";
import useStore from "../../../../../../store/store";
import { ILogObject } from "../../../../../../store/interfaces/IServer";



function LogTable() {
  const { logList } = useStore((state) => state.serverSlice.logSearch);

  // Step 1: Define state variables for pagination
  const itemsPerPage = 15; // You can adjust the number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of logs to display on the current page
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = logList.slice(indexOfFirstLog, indexOfLastLog);
  const lastPageIndex = Math.ceil(logList.length / itemsPerPage);
  
  // Step 2: Add controls for moving between pages
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={s.wrapper}>
      <div className={s.table_wrapper}>
      <table>
        <thead>
          <tr>
            <th colSpan={2}>Timestamp</th>
            <th colSpan={2}>Log Type</th>
            <th colSpan={1}>Proc..</th>
            <th colSpan={2}>Flow</th>
            <th colSpan={2}>Block</th>
            <th colSpan={2}>Status</th>
            <th colSpan={2}>Duration</th>
            <th colSpan={1}>Key List</th>
            <th colSpan={2}>Details</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.length > 0 ? (
            currentLogs.map((log: ILogObject) => (
              <tr key={logList.indexOf(log)}>
                <td colSpan={2}>{log.timeStamp}</td>
                <td colSpan={2}>{log.logType}</td>
                <td colSpan={1}>{log.processId}</td>
                <td colSpan={2}>{log.flowId}</td>
                <td colSpan={2}>{log.blockId}</td>
                <td colSpan={2}>{log.statusCode}</td>
                <td colSpan={2}>{log.duration}</td>
                <td colSpan={1}>{log.keyList}</td>
                <td colSpan={2}>{log.additionalText}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={16}>No logs found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
   

      {currentLogs.length > 0 ? <div className={s.pagination}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage} of {lastPageIndex}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastLog >= logList.length}
        >
          Next
        </button>
      </div>:null}
    </div>
  );
}

export default LogTable;
