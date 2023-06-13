import s from "./TopMenu.module.scss"
import { FaStop, FaPlay, FaPause } from "react-icons/fa";
import * as htmlToImage from "html-to-image";

function TopMenu() {

    function PrintFlow(){
        window.print();
    }
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.nav_list}>
                    <ul >
                        <li>New</li>
                        <li>Open</li>
                        <li>Save</li>
                        <li>Export Flow</li>
                        <li><button onClick={PrintFlow}>Print</button> </li>
                    </ul>
                </div>
                <div className={s.operations_btn_list}>
                    <ul>
                        <li><button><FaPlay color="green"></FaPlay></button></li>
                        <li><button><FaStop color="red"></FaStop></button></li>
                        <li><button><FaPause color="black"></FaPause></button></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default TopMenu;