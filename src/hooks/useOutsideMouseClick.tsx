import { useEffect } from "react";

const useOutsideMouseClick = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback]);
};

export default useOutsideMouseClick;
