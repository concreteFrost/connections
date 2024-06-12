import s from "./Properties.module.scss";
import Base from "./Base/Base";
import Block from "./Block/Block";
import FlowProperties from "./FlowProperties/FlowProperties";
import useStore from "store/store";
import CustomProperties from "./CustomProperties/CustomProperties";


function Properties() {
  const selectedBlockID = useStore((state) => state.flowSlice.flow.visual.blocks.find((b)=>b.selected)?.id);

  return (
    <section className={s.section_container}>
      <div className={s.section_header}>PROPERTIES</div>
      {!selectedBlockID ? (
        <FlowProperties></FlowProperties>
      ) : (
        <div>
          <Base></Base>
          <Block></Block>
          <CustomProperties></CustomProperties>
        </div>
      )}
    </section>
  );
}

export default Properties;
