import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Servers from './Servers/Servers';
import s from "./CenterPanel.module.scss"
import Flow from './Flow/Flow';
import Security from './Security/Security';

function CenterPanel() {
    return (
        <div className={s.wrapper}>
            <Routes>
                <Route path='servers' element={<Servers></Servers>}></Route>
                <Route path='flows' element={<Flow></Flow>}></Route>
                <Route path='security' element={<Security></Security>}></Route>
            </Routes>
        </div>)
}

export default CenterPanel;