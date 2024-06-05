import  { useEffect } from "react";

const useCtrlMouseHold = (
  isCtrlPressed: boolean,
  setCtrlPressed: (isPressed: boolean) => void
) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Control" && !isCtrlPressed) {
        setCtrlPressed(true);
      }
    };

    const handleKeyUp = (event: any) => {
      if (event.key === "Control" && isCtrlPressed) {
        setCtrlPressed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isCtrlPressed, setCtrlPressed]); // Make sure to include isCtrlPressed as a dependency
};

export default useCtrlMouseHold;
