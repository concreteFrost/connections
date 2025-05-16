import s from "./Keys.module.scss";

function Keys() {
    return (
        <section className={s.wrapper}>
            <header>Keys</header>
            <div className={s.input_wrapper}>
            <input type="text" name="" id="" placeholder="Unique Process ID" />
            </div>
           
            <div className={s.dropdown_wrapper}>
                <div className={s.dropdown_options}>
                <option value="def">Data Keys</option>
                <option value="def">Data Keys</option>
                <option value="def">Data Keys</option>
                </div>
            </div>
        </section>
    );
}

export default Keys;