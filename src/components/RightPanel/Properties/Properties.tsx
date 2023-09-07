import s from "./Properties.module.scss";
import Base from "./Base/Base";
import Block from "./Block/Block";
import FlowProperties from "./FlowProperties/FlowProperties";
import useStore from "../../../store/store";

function Properties() {
  const selectedNode = useStore((state) => state.selectedNode);
  return (
    <section className={s.section_container}>
      <div className={s.section_header}>PROPERTIES</div>
      {selectedNode === "-1" || !selectedNode? (
        <FlowProperties></FlowProperties>
      ) : (
        <div>
          <Base></Base>
          <Block></Block>
        </div>
      )}
    </section>
  );
}

export default Properties;
