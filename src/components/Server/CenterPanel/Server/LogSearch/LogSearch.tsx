import React, { useState } from "react";
import s from "./LogSearch.module.scss";
import DateRange from "./LogSearchElements/DateRange";
import FlowBlock from "./LogSearchElements/FlowBlock";
import Keys from "./LogSearchElements/Keys";
import OutputSearchButtons from "./LogSearchElements/OutputSearchButtons";
import TextSearch from "./LogSearchElements/TextSearch";
import LogTable from "./LogTable/LogTable";

interface ILogSearchQuery {
    type: number | undefined;
    status: number | undefined;
    flowId: string | undefined;
    blockId: string | undefined;
    timeFrom: string | number | readonly string[] | undefined;
    timeTo: string | number | readonly string[] | undefined;
    searchText: string | undefined;
}

const initialLogSearchQuery: ILogSearchQuery = {
    type: undefined,
    status: undefined,
    flowId: undefined,
    blockId: undefined,
    timeFrom: undefined,
    timeTo: undefined,
    searchText: undefined,
};

function LogSearch(props: { setCurrentView: (view: string) => void }) {
    const [logSearchQuery, setLogSearchQuery] = useState<ILogSearchQuery>(initialLogSearchQuery);

    const updateLogSearchQuery = (key: string, value: any) => {
        if (key in initialLogSearchQuery) {
            // Only update if the key exists in the initialLogSearchQuery
            setLogSearchQuery((prevQuery) => ({
                ...prevQuery,
                [key]: value,
            }));
        } else {
            console.error(`Invalid key: ${key}`);
        }
    };

    function submitQuery(){
        const queryToSubmit : any = {};

        for (const key in logSearchQuery) {
            if (logSearchQuery[key as keyof ILogSearchQuery] !== undefined) {
                queryToSubmit[key] = logSearchQuery[key as keyof ILogSearchQuery];
            }
        }

        console.log(queryToSubmit);
    }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <button onClick={() => props.setCurrentView("table")}>SERVER</button>
            </div>
            <div className={s.log_grid}>
                <DateRange
                    setTimeFrom={(value:string | number | readonly string[] | undefined) => updateLogSearchQuery("timeFrom", value)}
                    setTimeTo={(value: string | number | readonly string[] | undefined) => updateLogSearchQuery("timeTo", value)}
                    timeFrom={logSearchQuery.timeFrom}
                    timeTo={logSearchQuery.timeTo}
                />
                <FlowBlock
                    setFlowId={(value: string) => updateLogSearchQuery("flowId", value)}
                    setBlockId={(value: string) => updateLogSearchQuery("blockId", value)}
                    setStatus={(value: number) => updateLogSearchQuery("status", value)}
                    setType={(value: number) => updateLogSearchQuery("type", value)}
                    flowId={logSearchQuery.flowId}
                    blockId={logSearchQuery.blockId}
                    type={logSearchQuery.type}
                    status={logSearchQuery.status}
                />
                <TextSearch 
                setSearchText={(value: string) => updateLogSearchQuery("searchText", value)}
                searchText={logSearchQuery.searchText} />
                {/* <Keys onUpdate={(value) => updateLogSearchQuery("key", value)} /> */}
            </div>
            <OutputSearchButtons submitQuery={submitQuery}></OutputSearchButtons>
            <LogTable></LogTable>
        </div>
    );
}

export default LogSearch;
