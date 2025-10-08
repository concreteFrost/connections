import { RFState } from "store/types/rfState";
import s from "./ModalWindow.module.scss";
import useStore from "store/store";
import { useEffect, useState } from "react";
import { MappingList } from "store/interfaces/IVisualMapping";
import { getMappingStructureList, loadMapStructure } from "api/mapping";
import moment from "moment";

export default function MapListModal() {
  const { isMapListModalVisible, toggleModal, loadMappingStructure } = useStore(
    (state: RFState) => state.visualMappingSlice
  );
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

  useEffect(() => {
    if (isMapListModalVisible) {
      fetchMaps();
    }
  }, []);

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
                    </tr>
                  </thead>
                  <tbody>
                    {mappingList.map((map: MappingList) => (
                      <tr
                        key={map.reference}
                        onClick={() => handleLoadMapStructure(map.reference)}
                      >
                        <td>{map.name}</td>
                        <td>{moment(map.created).format("lll")}</td>
                        <td>{moment(map.lastAccessed).format("lll")}</td>
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
                <button onClick={() => toggleModal(false)}>Close</button>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
