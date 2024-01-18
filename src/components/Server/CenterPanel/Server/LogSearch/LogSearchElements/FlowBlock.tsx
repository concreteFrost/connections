import s from "./FlowBlock.module.scss"

function FlowBlock() {
    return (
        <section className={s.wrapper}>
            <header>Flow/Block</header>
            <select name="" id="">
            <option value="all flows">All Flows</option>
            </select>
            <select name="" id="">
            <option value="all blocks">All Blocks</option>
            </select>
            <select name="" id="">
            <option value="all types">All Types</option>
            </select>
        </section>
    );
}

export default FlowBlock;
