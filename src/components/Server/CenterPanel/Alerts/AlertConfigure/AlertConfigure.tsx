import s from "./AlertConfigure.module.scss";
import useStore from "../../../../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function AlertConfigure() {

  const navigate = useNavigate();
  const { getDirectives } = useStore((state) => state.alertSlice);

  async function fetchDirectives() {
    try {
      const x = await getDirectives();
      console.log(x)
    }
    catch (e) {
      console.log('error getting directives');
    }
  }

  useEffect(() => {
    fetchDirectives()
  }, [])
  return (<section className={s.wrapper}>
    <h3>Configure</h3>
    <header><button onClick={() => navigate('/dashboard/alerts')}>ALERTS</button></header>
    <main>
    </main>
  </section>)
}

export default AlertConfigure;