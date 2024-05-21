import useStore from "../../../../../../../store/store";
import { useState, useEffect } from "react";
import s from "./DirectivesTable.module.scss";
import {
  IDirective,
  IDirectiveConfig,
} from "../../../../../../../store/interfaces/IAlerts";
import { IFlowConfig } from "../../../../../../../store/interfaces/Iflow";
import { connectionsIcons } from "../../../../../../../assets/icons/icons";
import DirectiveConfigItem from "../AddDirectiveForm/DirectiveConfigItem/DirectiveConfigItem";

const PAGE_SIZE = 6;

const initialDirectiveConfig: IDirectiveConfig = {
  directiveOrder: 1,
  ehControlId: 0,
  ehDirectiveId: 0,
  optionId: 1,
  inputValue: 0,
  alertFormatId: 1,
  preventProcessing: false,
  stopFlow: 0,
  startFlow: "",
  runScript: "",
  addToCounter: false,
  clearCounter: false,
};

interface DirectivesTableProps {
  setDirectives: (directives: Array<IDirective>) => void;
  fetchDirectives: () => void;
  directives: Array<IDirective>;
  flowList: Array<IFlowConfig>;
}

function DirectivesTable(props: DirectivesTableProps) {
  const {
    toggleMessageModal,
    setConfirmationModalActions,
    toggleConfirmationModal,
  } = useStore((state) => state.modalWindowsSlice);
  const { updateDirective, deleteDirective } = useStore(
    (state) => state.alertSlice
  );
  const [currentDirectiveIndex, setCurrentDirectiveIndex] =
    useState<Number>(-1);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayedDirectives, setDisplayedDirectives] = useState<
    Array<IDirective>
  >([]);

  useEffect(() => {
    if (props.directives) {
      const totalPagesCount = Math.ceil(props.directives.length / PAGE_SIZE);
      setTotalPages(totalPagesCount);
    }
  }, [props.directives]);

  useEffect(() => {
    if (props.directives) {
      const startIndex = (currentPage - 1) * PAGE_SIZE;
      const endIndex = Math.min(
        startIndex + PAGE_SIZE,
        props.directives.length
      );
      setDisplayedDirectives(props.directives.slice(startIndex, endIndex));
    }
  }, [props.directives, currentPage]);

  async function handleDirectiveUpdate(directive: IDirective) {
    try {
      const res: any = await updateDirective(directive);
      toggleMessageModal(res.data.success ? "sucess!!!" : res.data.message);

      if (!res.data.success) {
        await props.fetchDirectives();
      }
    } catch (e) {
      toggleMessageModal("Internal Server Error");
    }
  }

  async function handleDirectiveDelete(ehControlId: number) {
    try {
      const res: any = await deleteDirective(ehControlId);
      toggleMessageModal(res.data.success ? "sucess!!!" : res.data.message);

      if (res.data.success) {
        const filteredDirectives = props.directives.filter(
          (dir: IDirective) => dir.ehControlId != ehControlId
        );
        props.setDirectives(filteredDirectives);
      }
    } catch (error) {
      console.log("error deleting directive", error);
    }
  }

  function editDirective(id: number, key: keyof IDirective, value: any) {
    if (!props.directives) return;

    const updatedDirectives = props.directives.map(
      (directive: IDirective, index: number) =>
        index === id ? { ...directive, [key]: value } : directive
    );
    props.setDirectives(updatedDirectives);
  }

  function editDirectiveConfig(
    directive: IDirective,
    configIndex: number,
    key: keyof IDirectiveConfig,
    value: any
  ) {
    if (!props.directives) return;

    const directiveToUpdate: IDirective = props.directives.find(
      (dir: IDirective) => dir.ehControlId === directive.ehControlId
    )!;

    const updatedConfig = {
      ...directiveToUpdate.directives[configIndex],
      [key]: value,
    };
    directiveToUpdate.directives[configIndex] = updatedConfig;

    const updatedDirectives = props.directives.map((dir: IDirective) => {
      if (dir.ehControlId === directiveToUpdate.ehControlId) {
        return directiveToUpdate;
      }
      return dir;
    });

    if (key === "optionId") {
      if (value == 3) {
        directiveToUpdate.directives[configIndex].stopFlow =
          initialDirectiveConfig.stopFlow;
        directiveToUpdate.directives[configIndex].addToCounter =
          initialDirectiveConfig.addToCounter;
        directiveToUpdate.directives[configIndex].clearCounter =
          initialDirectiveConfig.clearCounter;
      }
      if (value == 1) {
        directiveToUpdate.directives[configIndex].inputValue =
          initialDirectiveConfig.inputValue;
        directiveToUpdate.directives[configIndex].preventProcessing =
          initialDirectiveConfig.preventProcessing;
      }
    }

    props.setDirectives(updatedDirectives);
  }

  function deleteDirectiveConfig(directive: IDirective, configIndex: number) {
    if (!props.directives) return;

    const directiveToUpdate = props.directives.find(
      (dir: IDirective) => dir.ehControlId === directive.ehControlId
    )!;

    if (directiveToUpdate.directives.length <= 1) {
      toggleMessageModal("Directive needs to have at least 1 configuration");

      return;
    }

    directiveToUpdate.directives.splice(configIndex, 1);

    // Пересчитываем directiveOrder для оставшихся конфигураций
    for (let i = configIndex; i < directiveToUpdate.directives.length; i++) {
      directiveToUpdate.directives[i].directiveOrder = i + 1;
    }

    const updatedDirectives = props.directives.map((dir: IDirective) => {
      if (dir.ehControlId === directiveToUpdate.ehControlId) {
        return directiveToUpdate;
      }
      return dir;
    });

    props.setDirectives(updatedDirectives);
  }

  function addDirectiveConfig(directiveIndex: number) {
    if (!props.directives) return;
    const updatedDirectives = [...props.directives];
    updatedDirectives[directiveIndex].directives.push({
      ...initialDirectiveConfig,
      ehControlId: updatedDirectives[directiveIndex].ehControlId,
      directiveOrder: updatedDirectives[directiveIndex].directives.length + 1,
    });
    props.setDirectives(updatedDirectives);
  }

  //resets unsaved changes in edited directive
  function checkCurrentDirectives(index: Number) {
    setCurrentDirectiveIndex(index);
  }

  function showConfirmationOnDelete(
    ehControlId: number,
    directiveName: string
  ) {
    setConfirmationModalActions(() => handleDirectiveDelete(ehControlId));
    toggleConfirmationModal(true, `Would you like to delete ${directiveName}?`);
  }

  return (
    <section className={s.wrapper}>
      <main>
        <div className={s.table_wrapper}>
          <table className={s.table}>
            <thead>
              <tr>
                <th colSpan={3}>Directive</th>
                <th colSpan={3}>Directives</th>
                <th colSpan={1}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedDirectives &&
                displayedDirectives.map((directive: IDirective, index: any) => (
                  <tr
                    key={index}
                    onClick={() => {
                      checkCurrentDirectives(index);
                    }}
                  >
                    <td colSpan={3} className={s.directive}>
                      <div className={s.directive_item}>
                        <label>name:</label>
                        <input
                          type="text"
                          value={directive.name}
                          onChange={(e: any) =>
                            editDirective(
                              props.directives.indexOf(directive),
                              "name",
                              e.target.value
                            )
                          }
                        />
                        <span>{connectionsIcons.pen}</span>
                      </div>
                      <div className={s.directive_item}>
                        <label>description:</label>
                        <textarea
                          value={directive.description}
                          onChange={(e: any) =>
                            editDirective(
                              props.directives.indexOf(directive),
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className={s.directive_item}>
                        <label>category:</label>
                        <input
                          type="number"
                          value={directive.category}
                          readOnly
                        />
                      </div>
                      <div className={s.directive_item}>
                        <label>date created:</label>
                        <input
                          type="datetime-local"
                          value={directive.dateCreated}
                          readOnly
                        />
                      </div>
                      <div className={s.directive_item}>
                        <label>last amended:</label>
                        <input
                          type="datetime-local"
                          value={directive.lastAmended}
                          readOnly
                        />
                      </div>
                    </td>
                    <td colSpan={3}>
                      <ul>
                        {directive.directives.length > 0 ? (
                          directive.directives.map(
                            (
                              config: IDirectiveConfig,
                              config_index: number
                            ) => (
                              <DirectiveConfigItem
                                key={config_index}
                                directive={directive}
                                config={config}
                                config_index={config_index}
                                editDirectiveConfig={editDirectiveConfig}
                                deleteDirectiveConfig={deleteDirectiveConfig}
                                flowList={props.flowList}
                                s={s}
                              />
                            )
                          )
                        ) : (
                          <div className={s.empty_directives}>
                            No directives available
                          </div>
                        )}

                        <span className={s.add_directive_btn}>
                          <button
                            onClick={() =>
                              addDirectiveConfig(
                                props.directives.indexOf(directive)
                              )
                            }
                          >
                            ADD
                          </button>
                        </span>
                      </ul>
                    </td>
                    <td colSpan={1}>
                      <div className={s.action_btns_wrapper}>
                        {/*Save button is only visible on the component that is currently editing */}
                        {currentDirectiveIndex === index ? (
                          <button
                            className={s.save_btn}
                            onClick={() => handleDirectiveUpdate(directive)}
                          >
                            Save
                          </button>
                        ) : null}
                        <button
                          className={s.delete_btn}
                          onClick={() =>
                            showConfirmationOnDelete(
                              directive.ehControlId,
                              directive.name
                            )
                          }
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
              checkCurrentDirectives(-1); // hides save button when changing the page
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
              checkCurrentDirectives(-1); // hides save button when changing the page
            }}
          >
            Next
          </button>
        </div>
      </main>
    </section>
  );
}

export default DirectivesTable;
