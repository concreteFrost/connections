import s from "./LeftPanel.module.scss"
import useStore from "../../store/store";
import { nodeType } from "../../store/nodeTypes"
import { FaMousePointer } from 'react-icons/fa';
import { RiMailSendFill } from 'react-icons/ri'
import { BsFillDatabaseFill, BsFiletypeSql, BsArchiveFill } from 'react-icons/bs'

function LeftPanel() {

    const addNode = useStore(state => state.addNode);

    return (<div className={s.wrapper}>
        <div className={s.add_node_container}>
            <div className={s.header}>CREATE BLOCKS</div>
            <div className={s.node_list}>

                {/* <h3>COLOR</h3>
                    <ul>
                        <li><button onClick={() => { addNode(nodeType.colorSetter) }}>COLOR INPUT</button></li>
                        <li><button onClick={() => { addNode(nodeType.colorGetter) }}>COLOR OUTPUT</button></li>
                    </ul>
                </section>
                <section>
                    <h3>TEXT</h3>
                    <ul>
                        <li><button onClick={() => { addNode(nodeType.textSetterUC) }}>TEXT INPUT (UC)</button></li>
                        <li><button onClick={() => { addNode(nodeType.textSetterLC) }}>TEXT INPUT (LC)</button></li>
                        <li><button onClick={() => { addNode(nodeType.textGetter) }}>TEXT OUTPUT </button></li>
                    </ul>
                </section>
                <section>
                    <h3>OPERATIONS</h3>
                    <ul>
                        <li><button onClick={() => { addNode(nodeType.numberSetter) }}>NUMBER INPUT</button></li>
                        <li><button onClick={() => { addNode(nodeType.mathOperation) }}>MATH OPERATION</button></li>
                    </ul> */}
                <section>
                    <h5>DATA STORE</h5>
                    <ul>
                        <li className={s.list_item} ><button onClick={() => { addNode(nodeType.pointer) }} ><span className={s.node_icon}><FaMousePointer></FaMousePointer></span>Pointer</button></li>
                        <li className={s.list_item} ><button ><span className={s.node_icon}><RiMailSendFill></RiMailSendFill></span>Send</button></li>
                    </ul>
                </section>
                <section>
                    <h5>EXTERNAL</h5>
                    <ul>
                        <li className={s.list_item} ><button ><span className={s.node_icon}><FaMousePointer></FaMousePointer></span>Pointer</button></li>
                        <li className={s.list_item} ><button ><span className={s.node_icon}><BsFillDatabaseFill></BsFillDatabaseFill></span>DB2</button></li>
                        <li className={s.list_item} ><button ><span className={s.node_icon}><BsFiletypeSql></BsFiletypeSql></span>SQL</button></li>
                    </ul>
                </section>
                <section>
                    <h5>FUNCTION</h5>
                    <ul>
                        <li className={s.list_item} ><button ><span className={s.node_icon}><FaMousePointer></FaMousePointer></span>Pointer</button></li>
                        <li><button><span className={s.node_icon}><BsArchiveFill></BsArchiveFill></span> Archive</button></li>
                    </ul>
                </section>
            </div>

        </div>

    </div >)
}

export default LeftPanel;