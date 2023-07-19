import {
  BsMailbox,
  BsFileBinary,
  BsFiles,
  BsFiletypeSql,
  BsArchive,
  BsCaretLeft,
  BsCaretRight,
  BsThreeDots,
  BsList,
  BsSliders,
  BsPaletteFill,
  BsFileFontFill,
  BsXCircleFill,
  BsDatabase,
  BsHddFill,
  BsGlobe,
  BsClock,
  BsFileCode,
  BsFileEarmarkArrowUp,
  BsInfoCircle,
  BsDiagram2,
  BsSliders2,
  BsCardChecklist,
  BsFiletypeXml,
  BsBoxes,
  BsListCheck,
  BsFiletypeCsv,
  BsApp,
  BsFilePlus,
  BsEnvelopeAt,
} from "react-icons/bs";


import { FaGlobe, FaFileExport, FaCodeBranch, FaChevronDown, FaChevronUp } from "react-icons/fa";

export const connectionsIcons = {
  nodeIcons: {
    //data store
    send: <BsMailbox />,
    //external
    db2: <BsHddFill></BsHddFill>,
    fileservice: <BsFileBinary></BsFileBinary>,
    file_system: <BsFiles></BsFiles>,
    ftp: 'ftp',
    odbc: <BsDatabase></BsDatabase>,
    restservice: 'R',
    sql: <BsFiletypeSql />,
    ssc_webservice: <BsGlobe></BsGlobe>,
    webservice: <FaGlobe></FaGlobe>,
    //function
    archive: <BsArchive></BsArchive>,
    delay: <BsClock></BsClock>,
    file_operation: <BsFileCode></BsFileCode>,
    filetrigger: <FaFileExport></FaFileExport>,
    loadfragment: <BsFileEarmarkArrowUp></BsFileEarmarkArrowUp>,
    log: <BsInfoCircle></BsInfoCircle>,
    logicops: <BsDiagram2></BsDiagram2>,
    parametizer: <BsSliders2></BsSliders2>,
    scheduletrigger: <BsCardChecklist></BsCardChecklist>,
    script: <FaCodeBranch ></FaCodeBranch>,
    xmlsplitter: <BsFiletypeXml></BsFiletypeXml>,
    transformer: <BsBoxes></BsBoxes>,
    validator: <BsListCheck></BsListCheck>,
    //input
    input_csv: <BsFiletypeCsv></BsFiletypeCsv>,
    empty: <BsApp></BsApp>,
    input_flatfile: <BsFilePlus>,</BsFilePlus>,
    input_xml: <BsFiletypeXml></BsFiletypeXml>,
    //output
    email: <BsEnvelopeAt></BsEnvelopeAt>,
    output_flatfile: <FaFileExport></FaFileExport>,
    output_xml: <BsFiletypeXml></BsFiletypeXml>
  },
  leftArrow: <BsCaretLeft></BsCaretLeft>,
  rightArrow: <BsCaretRight></BsCaretRight>,
  arrowDown: <FaChevronDown></FaChevronDown>,
  arrowUp: <FaChevronUp></FaChevronUp>,
  dotsView: <BsThreeDots></BsThreeDots>,
  lineView: <BsList></BsList>,
  settings: <BsSliders></BsSliders>,
  pallete: <BsPaletteFill></BsPaletteFill>,
  text: <BsFileFontFill></BsFileFontFill>,
  delete: <BsXCircleFill></BsXCircleFill>,


}