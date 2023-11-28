import s from "./CurrentAlerts.module.scss"

function CurrentAlerts(){
    return(<div className={s.wrapper}>
        <header>Current Alerts</header>
        <ul>
            <li>Alert 1</li>
            <li>Alert 1</li>
            <li>Alert 1</li>    
        </ul>
    </div>)
}

export default CurrentAlerts;