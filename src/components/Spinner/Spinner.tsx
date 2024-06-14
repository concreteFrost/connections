import { useState, useEffect } from "react";
import { Puff } from "react-loader-spinner";
import s from "./Spinner.module.scss";
import useStore from "store/store";

function Spinner() {
  const { isLoading, setIsLoading } = useStore((state) => state.loaderSlice);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    let timerId: any;

    if (isLoading) {
      // Установить таймер на 10 секунд (10000 мс)
      timerId = setTimeout(() => {
        setIsLoading(false);
        setErrorMessage('Something went wrong');
       
      }, 15000);
    }
    
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    let errorTimerId: any;

    if (errorMessage.length>0) {
      errorTimerId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    return () => {
      if (errorTimerId) {
        clearTimeout(errorTimerId);
      }
    };
  }, [errorMessage]);

  return (
    <>
      {isLoading ? (
        <div className={s.tail_spin_container}>
          <div className={s.tail_spin}>
            <Puff width={300} height={300} color={"#03e3fc"}></Puff>
          </div>
        </div>
      ) : null}

{errorMessage.length>0 ? <div className={s.error_message_container}><div className={s.error_message}>{errorMessage}</div></div> : null }
    </>
  );
}

export default Spinner;
