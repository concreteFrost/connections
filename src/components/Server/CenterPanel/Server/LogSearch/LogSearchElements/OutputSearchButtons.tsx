import s from "./OutputSearchButtons.module.scss";

interface OutputSearchButtonsProps{
    submitQuery:()=>void;
}

function OutputSearchButtons(props:OutputSearchButtonsProps) {
    return (
        <section className={s.wrapper}>
            <div className={s.btns_wrapper}>
                <button>OUTPUT</button>
                <button onClick={props.submitQuery}>SEARCH</button>
            </div>
        </section>
    );
}

export default OutputSearchButtons;