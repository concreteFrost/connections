import View from "./View/View";
import s from "./LeftList.module.scss";
import { useNavigate } from "react-router";


interface LeftListProps {
  setFunctionsToPass: (functions: any) => void;
  setIsSelectFlowsVisible: (isVisible: boolean) => void;
  toggleDropdown: (view: string) => void;
  tryToSaveFlow:()=>void;
  toggleUpdateFlowModal:(isVisble:boolean)=>void;
  toggleMessageModal:()=>void;
  createFlow:()=>void;
  dropdowns: any;
}

function LeftList(props: LeftListProps) {

  const navigate = useNavigate();
  async function saveAndLeave() {
    try {
      await props.tryToSaveFlow();
      await props.toggleUpdateFlowModal(false);
      await props.toggleMessageModal();
      await navigate("/dashboard/servers");
    } catch (e) {
      console.log(e);
    }
  }

  function leaveWithoutSaving() {
    props.toggleUpdateFlowModal(false);
    navigate("/dashboard/servers");
  }

  function cancelSaving() {
    props.toggleUpdateFlowModal(false);
  }

  async function createAndSave() {
    try {
      await props.tryToSaveFlow();
      await props.createFlow();
      await props.toggleUpdateFlowModal(false);
    } catch (e) {
      console.log("error");
    }
  }

  function createWithoutSaving() {
    props.createFlow();
    props.toggleUpdateFlowModal(false);
  }

  return (
    <div className={s.wrapper}>
      <ul className={s.nav_list}>
        <li>
        <div className={s.server_button}>
          <button onClick={() => {
            props.toggleUpdateFlowModal(true)
            props.setFunctionsToPass({confirm:saveAndLeave,decline:leaveWithoutSaving})
           }}>SERVER</button>
        </div>
        </li>
        <li
          className={s.nav_list_item}
          onClick={() => {
            props.toggleUpdateFlowModal(true);
            props.setFunctionsToPass({
              confirm: createAndSave,
              decline: createWithoutSaving,
            });
          }}
        >
          New
        </li>
        <li
          className={s.nav_list_item}
          onClick={() => {
            props.setIsSelectFlowsVisible(true);
          }}
        >
          Load
        </li>
        <li
          className={s.nav_list_item}
          onClick={() => {
            props.toggleUpdateFlowModal(true);
            props.setFunctionsToPass({
              confirm: props.tryToSaveFlow,
              decline: cancelSaving,
            });
          }}
        >
          Save
        </li>
        <li className={s.nav_list_item}>
          <div onClick={() => props.toggleDropdown("view")}>View</div>
          <div
            className={
              props.dropdowns.view.isVisible ? null : s.view_section_hidden
            }
          >
            <View />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default LeftList;
