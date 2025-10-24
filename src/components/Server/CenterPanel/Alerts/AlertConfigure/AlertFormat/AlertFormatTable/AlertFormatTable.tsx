import { useEffect, useState } from "react";
import s from "./AlertFormatTable.module.scss";
import useStore from "store/store";
import moment from "moment";
import { AlertFormat } from "shared/interfaces/IAlerts";
import { Group, User } from "shared/interfaces/ISecurity";
import {
  getAlertFormatsApi,
  removeAlertFormatApi,
  updateAlertFormatApi,
} from "api/ehd";

interface AlertFormatTableProps {
  alertFormats: AlertFormat[];
  setAlertFormats: (alertFormats: AlertFormat[]) => void;
  groupList: Array<Group>;
  userList: Array<User>;
}

const PAGE_SIZE = 5;

function AlertFormatTable(props: AlertFormatTableProps) {
  // const { getAlertFormats, updateAlertFormat, deleteAlertFormat } = useStore((state) => state.alertSlice);
  const {
    toggleMessageModal,
    toggleConfirmationModal,
    setConfirmationModalActions,
  } = useStore((state) => state.modalWindowsSlice);
  const [displayedAlertFormats, setDisplayedAlertFormats] = useState<
    Array<AlertFormat>
  >([]);

  const [currentAlertIndex, setCurrentAlertIndex] = useState<Number>(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const updateAlertFormatData = (id: number, key: string, value: any) => {
    const updatedAlertFormats = props.alertFormats.map(
      (alertFormat: AlertFormat) =>
        alertFormat.alertFormatId === id
          ? { ...alertFormat, [key]: value }
          : alertFormat
    );

    props.setAlertFormats(updatedAlertFormats);
  };

  useEffect(() => {
    if (props.alertFormats) {
      const totalPagesCount = Math.ceil(props.alertFormats.length / PAGE_SIZE);
      setTotalPages(totalPagesCount);
    }
  }, [props.alertFormats]);

  useEffect(() => {
    if (props.alertFormats) {
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = Math.min(
        startIndex + PAGE_SIZE,
        props.alertFormats.length
      );
      setDisplayedAlertFormats(props.alertFormats.slice(startIndex, endIndex));
    }
  }, [props.alertFormats, currentPage]);

  function checkCurrentAlertsIndex(index: Number) {
    setCurrentAlertIndex(index);
  }

  async function handleAlertFormatUpdate(alertFormat: AlertFormat) {
    try {
      const res: any = await updateAlertFormatApi(alertFormat);

      toggleMessageModal(res.data.success ? "success!!!" : res.data.message);

      if (res.data.success) {
        const alertFormatsData: any = await getAlertFormatsApi();
        props.setAlertFormats(alertFormatsData.data);
      }
    } catch (error) {
      console.log("error updating alert format", error);
    }
  }

  async function handleAlertFormatDelete(alertFormatId: number) {
    try {
      const res: any = await removeAlertFormatApi(alertFormatId);

      toggleMessageModal(res.data.success ? "success!!!" : res.data.message);

      if (res.data.success) {
        const filteredAlerts = props.alertFormats.filter(
          (alert: AlertFormat) => alert.alertFormatId !== alertFormatId
        );
        props.setAlertFormats(filteredAlerts);
      }
    } catch (error) {
      console.log("error deleting alert", error);
    }
  }

  return (
    <section className={s.wrapper}>
      <main>
        <div className={s.table_wrapper}>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>Name</th>
                <th colSpan={2}>Description</th>
                <th colSpan={1}>Category</th>
                <th colSpan={2}>User/Group</th>
                <th colSpan={2}>Created/Modified</th>
                <th colSpan={1}>Active</th>
                <th colSpan={1}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedAlertFormats.map((alertFormat: AlertFormat) => (
                <tr
                  key={alertFormat.alertFormatId}
                  onClick={() =>
                    checkCurrentAlertsIndex(alertFormat.alertFormatId)
                  }
                >
                  <td colSpan={2}>
                    <input
                      type="text"
                      value={alertFormat.name}
                      onChange={(e) =>
                        updateAlertFormatData(
                          alertFormat.alertFormatId,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td colSpan={2}>
                    <div className={s.textarea_wrapper}>
                      <textarea
                        value={alertFormat.description}
                        onChange={(e) =>
                          updateAlertFormatData(
                            alertFormat.alertFormatId,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </td>
                  <td colSpan={1}>
                    {alertFormat.category === 0 ? "Default" : "User"}
                  </td>
                  <td colSpan={2}>
                    <select
                      value={alertFormat.userOrGroupId}
                      onChange={(e) =>
                        updateAlertFormatData(
                          alertFormat.alertFormatId,
                          "userOrGroupId",
                          e.target.value
                        )
                      }
                    >
                      <optgroup label="Users">
                        {props.userList.map((user) => (
                          <option key={user.userId} value={user.userId}>
                            {user.userName}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Groups">
                        {props.groupList.map((group) => (
                          <option key={group.groupId} value={group.groupId}>
                            {group.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </td>
                  <td colSpan={2} className={s.timestamps}>
                    <p>
                      Created: {moment(alertFormat.dateCreated).format("lll")}
                    </p>
                    <p>
                      Last Amended:{" "}
                      {moment(alertFormat.lastAmended).format("lll")}{" "}
                    </p>
                  </td>
                  <td colSpan={1} className={s.checkbox_wrapper}>
                    <input
                      type="checkbox"
                      checked={alertFormat.isActive}
                      onChange={(e) =>
                        updateAlertFormatData(
                          alertFormat.alertFormatId,
                          "isActive",
                          !alertFormat.isActive
                        )
                      }
                    />
                  </td>
                  <td colSpan={1}>
                    <div className={s.action_btns_wrapper}>
                      {currentAlertIndex === alertFormat.alertFormatId ? (
                        <button
                          className={s.save_btn}
                          onClick={() => handleAlertFormatUpdate(alertFormat)}
                        >
                          Save
                        </button>
                      ) : null}
                      <button
                        className={s.delete_btn}
                        onClick={() => {
                          setConfirmationModalActions(() =>
                            handleAlertFormatDelete(alertFormat.alertFormatId)
                          );
                          toggleConfirmationModal(
                            true,
                            `Would you like to delete ${alertFormat.name}?`
                          );
                        }}
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={s.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
              checkCurrentAlertsIndex(-1); // hides save button when changing the page
            }}
          >
            Previous
          </button>
          <span>
            {currentPage}/{totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(currentPage + 1);
              checkCurrentAlertsIndex(-1); // hides save button when changing the page
            }}
          >
            Next
          </button>
        </div>
      </main>
    </section>
  );
}

export default AlertFormatTable;
