import s from "./ModalWindow.module.scss";
import useStore from "../../store/store";
import { flow } from "../../testFlow/testFlow2";

interface ModalProps {
    isModalVisible: boolean;
    flow: any
}

function SetFlowVersionModal(props: ModalProps) {
    const setFlowVersion = useStore((state) => state.setFlowVersion);

    return (<div className={s.container}>
        <div className={s.modal_window}>
            <header className={s.modal_header}>FLOW VERSION</header>
            <main className={s.modal_body}>
                <input type="text" value={props.flow.flowVersion} placeholder="eq. 1.0.0.1" onChange={(e) => setFlowVersion(e.target.value)} />
            </main>
            <footer className={s.modal_footer}>
                <div className={s.buttons_wrapper}>
                    <button>SUBMIT</button>
                    <button>CANCEL</button>
                </div>
            </footer>
        </div>

    </div>)

}

export default SetFlowVersionModal;