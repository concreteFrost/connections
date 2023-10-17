import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Servers from './Servers/Servers';
import s from "./CenterPanel.module.scss"
import Flow from './Flow/Flow';

function CenterPanel() {
    return (
        <div className={s.wrapper}>
            <Routes>
                <Route path='servers' element={<Servers></Servers>}></Route>
                <Route path='flows' element={<Flow></Flow>}></Route>
            </Routes>
        </div>)
}

export default CenterPanel;