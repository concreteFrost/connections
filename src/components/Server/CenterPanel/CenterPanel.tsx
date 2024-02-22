import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import s from "./CenterPanel.module.scss"
import Flow from './Flow/Flow';
import Security from './Security/Security';
import ProtectedRoute from '../../../utils/ProtectedRoute';
import Servers from './Server/Servers';
import Settings from './Settings/Settings';
import Alerts from './Alerts/Alerts';

function CenterPanel() {
    return (
        <div className={s.wrapper}>
            <Routes>
                <Route path='/servers' element={<ProtectedRoute><Servers></Servers></ProtectedRoute> }></Route>
                <Route path='/flows' element={<ProtectedRoute><Flow></Flow></ProtectedRoute> }></Route>
                <Route path='/security' element={<ProtectedRoute><Security></Security></ProtectedRoute>}></Route>
                <Route path='/settings' element={<ProtectedRoute><Settings></Settings></ProtectedRoute>}></Route>
                <Route path='/alerts/*' element={<ProtectedRoute><Alerts></Alerts></ProtectedRoute>}></Route>
            </Routes>
        </div>)
}

export default CenterPanel;