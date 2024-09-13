
import useStore from "store/store";;

function Load() {
  const modalSlice = useStore((state) => state.modalWindowsSlice);

  return (
    <li
      onClick={() => {
        modalSlice.toggleLoadFlowModal(true);
      }}
    >
      Load
    </li>
  );
}

export default Load;
