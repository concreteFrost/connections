import LogSearch from "./LogSearch/LogSearch";
import ServerTable from "./ServerTable/ServerTable"
import { useState } from "react";

function Servers() {

    const [currentView, setCurrentView] = useState<string>('table');
    return (<>
        {currentView === 'table' ? <ServerTable setCurrentView={setCurrentView}/> : <LogSearch setCurrentView={setCurrentView}></LogSearch>}
        </>
    )
}

export default Servers;