import s from "./TopMenu.module.scss"
import { FaStop, FaPlay, FaPause } from "react-icons/fa";


function TopMenu() {

    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.nav_list}>
                    <ul >
                        <li>New</li>
                        <li>Open</li>
                        <li>Save</li>
                        <li>Export Flow</li>
                        <li>Print</li>
                    </ul>
                </div>
                <div className={s.operations_btn_list}>
                    <ul className={s.top_btn_list}>
                        <li className={s.top_list_item}><FaPlay color="white"></FaPlay></li>
                        <li className={s.top_list_item}><FaStop color="white"></FaStop></li>
                        <li className={s.top_list_item}><FaPause color="white"></FaPause></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default TopMenu;