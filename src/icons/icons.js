import {
  BsFillDatabaseFill,
  BsCursorFill,
  BsEnvelopeFill,
  BsFiletypeSql,
  BsArchiveFill,
  BsCaretLeft,
  BsCaretRight,
  BsThreeDots,
  BsList,
  BsSliders

} from "react-icons/bs";

export const connectionsIcons = {
  pointer: <BsCursorFill></BsCursorFill>,
  database: <BsFillDatabaseFill></BsFillDatabaseFill>,
  mailbox: <BsEnvelopeFill></BsEnvelopeFill>,
  sql: <BsFiletypeSql></BsFiletypeSql>,
  archive: <BsArchiveFill></BsArchiveFill>,
  leftArrow: <BsCaretLeft></BsCaretLeft>,
  rightArrow: <BsCaretRight></BsCaretRight>,
  dotsView:<BsThreeDots></BsThreeDots>,
  lineView:<BsList></BsList>,
  settings:<BsSliders></BsSliders>
}