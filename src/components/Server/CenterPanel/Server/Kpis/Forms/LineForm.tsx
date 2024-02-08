import s from "./ChartForms.module.scss"

function LineForm(){
    return(<form className={s.line_form}>
        <label >some input</label>
        <input type="text" name="" id="" />
        <label >some input</label>
        <input type="text" name="" id="" />
        <label >some input</label>
        <input type="text" name="" id="" />
        <button type="submit">submit</button>
    </form>)
}

export default LineForm;