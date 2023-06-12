import s from "./ValueEditor.module.scss"

function ValueEditor() {
    return (
        <section className={s.section_container}>
            <div className={s.section_header}>
                VALUE EDITOR
            </div>
            <div className={s.text_area_container}>
                <textarea></textarea>
            </div>
        </section>
    )
}

export default ValueEditor;