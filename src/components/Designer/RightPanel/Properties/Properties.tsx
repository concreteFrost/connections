import s from "./Properties.module.scss";
import Base from "./Base/Base";
import Block from "./Block/Block";
import FlowProperties from "./FlowProperties/FlowProperties";
import useStore from "../../../../store/store";
import CustomProperties from "./CustomProperties/CustomProperties";


function Properties() {
  const selectedBlockID = useStore((state) => state.selectedBlockID);

  return (
    <section className={s.section_container}>
      <div className={s.section_header}>PROPERTIES</div>
      {selectedBlockID.length===0 ? (
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
