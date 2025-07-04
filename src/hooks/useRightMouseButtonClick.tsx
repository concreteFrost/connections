import { useEffect, useState } from "react";

type Pos = { x: number; y: number };

const useRightMouseButtonClick = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });

  useEffect(() => {
    const showMenu = (e: MouseEvent) => {
      e.preventDefault();
      setVisible((prev) => (prev === true ? false : true));

      setPos({ x: e.pageX, y: e.pageY });
    };

    const hideMenu = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };

    const hideMenuOnMouseClick = (e: MouseEvent) => {
      setVisible(false);
    };

    window.addEventListener("contextmenu", showMenu);
    window.addEventListener("keydown", hideMenu);
    window.addEventListener("click", hideMenuOnMouseClick);

    return () => {
      window.removeEventListener("contextmenu", showMenu);
      window.removeEventListener("keydown", hideMenu);
      window.removeEventListener("click", hideMenuOnMouseClick);
    };
  }, []);

  return { isVisible, pos };
};

export default useRightMouseButtonClick;
