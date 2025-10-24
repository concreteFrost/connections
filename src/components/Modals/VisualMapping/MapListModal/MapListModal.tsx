import { RFState } from "shared/types/rfState";
import s from "../VisualMappingModal.module.scss";
import useStore from "store/store";
import { useEffect, useState } from "react";
import { MappingList } from "shared/interfaces/IVisualMapping";
import {
  deleteMapStructure,
  getMappingStructureList,
  loadMapStructure,
} from "api/mapping";
import moment from "moment";

export default function MapListModal() {
  const { isMapListModalVisible, toggleMapListModal, loadMappingStructure } =
    useStore((state: RFState) => state.visualMappingSlice);

  const {
    toggleMessageModal,
    toggleConfirmationModal,
    setConfirmationModalActions,
  } = useStore((state: RFState) => state.modalWindowsSlice);
  const [mappingList, setMappingList] = useState<MappingList[]>([]);

  async function fetchMaps() {
    try {
      const res = await getMappingStructureList();

      setMappingList(res.data.files);
    } catch (error) {
      console.log("error retrieving mapping list");
    }
  }

  async function handleLoadMapStructure(mappingReference: string) {
    try {
      const res = await loadMapStructure(mappingReference);

      console.log(res);
      loadMappingStructure(res.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function handleDeleteMapStructure(mappingReference: string) {
    try {
      const res = await deleteMapStructure(mappingReference);

      if (res.data.success) {
        const filtered = mappingList.filter(
          (map) => map.reference !== mappingReference
        );
        setMappingList(filtered);
      }
    } catch (error) {
      toggleMessageModal("something went wrong");
    }
  }

  function showConfirmModal(map: MappingList) {
    setConfirmationModalActions(() => handleDeleteMapStructure(map.reference));
    toggleConfirmationModal(
      true,
      `You are about to delete ${map.name}. Are you sure?`
    );
  }

  useEffect(() => {
    if (isMapListModalVisible) {
      fetchMaps();
    }
  }, [isMapListModalVisible]);

  return (
    <>
      {isMapListModalVisible ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <header className={s.modal_header}>LOAD</header>
            <main className={s.modal_body}>
              {mappingList.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>CREATED</th>
                      <th>LAST ACCESSED</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappingList.map((map: MappingList) => (
                      <tr key={map.reference}>
                        <td>{map.name}</td>
                        <td>{moment(map.created).format("lll")}</td>
                        <td>{moment(map.lastAccessed).format("lll")}</td>
                        <td className={s.actions_btn_wrapper}>
                          <button
                            className={s.load_btn}
                            onClick={() =>
                              handleLoadMapStructure(map.reference)
                            }
                          >
                            LOAD
                          </button>
                          <button
                            className={s.delete_btn}
                            onClick={() => showConfirmModal(map)}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className={s.empty_table_message}>nothing to show</div>
              )}
            </main>
            <footer className={s.modal_footer}>
              <div className={s.buttons_wrapper}>
                <button onClick={() => toggleMapListModal(false)}>Close</button>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
