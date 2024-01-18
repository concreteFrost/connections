import s from "./LogSearch.module.scss"
import DateRange from "./LogSearchElements/DateRange";
import FlowBlock from "./LogSearchElements/FlowBlock";
import Keys from "./LogSearchElements/Keys";
import OutputSearchButtons from "./LogSearchElements/OutputSearchButtons";
import TextSearch from "./LogSearchElements/TextSearch";
import LogTable from "./LogTable/LogTable";

function LogSearch(props: { setCurrentView: (view: string) => void }) {
    return (<div className={s.wrapper}>
        <div className={s.header}>
            <button onClick={() => props.setCurrentView('table')}>SERVER</button>
        </div>
        <div className={s.log_grid}>
            <DateRange></DateRange>
            <FlowBlock></FlowBlock>
            <TextSearch></TextSearch>
            <Keys></Keys>
        </div>
        <OutputSearchButtons></OutputSearchButtons>
        <LogTable></LogTable>
    </div>)
}

export default LogSearch;