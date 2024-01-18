import s from "./OutputSearchButtons.module.scss";

function OutputSearchButtons() {
    return (
        <section className={s.wrapper}>
            <div className={s.btns_wrapper}>
                <button>OUTPUT</button>
                <button>SEARCH</button>
            </div>
        </section>
    );
}

export default OutputSearchButtons;