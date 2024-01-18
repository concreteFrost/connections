import s from "./DateRange.module.scss"

function DateRange() {
    return (
        <section className={s.wrapper}>
            <header>Date Range</header>
            <div className={s.radio_btns}>
                <div>
                    <label htmlFor="all">ALL</label>
                    <input type="radio" name="all" id="all" />
                </div>
                <div>
                    <label htmlFor="selection">SELECTION</label>
                    <input type="radio" name="selection" id="selection" />
                </div>
            </div>
            <div className={s.input_wrapper}>
                <input type="date" />
                <input type="date" />
            </div>
        </section>
    );
}

export default DateRange;