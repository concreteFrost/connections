import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";
import Flow from "../src/components/Flow.tsx";
import "./App.css";
import TopMenu from "./components/TopMenu/TopMenu";
import { useEffect } from "react";
import getToken from "./api/token/getToken";

function App() {

  useEffect(() => {
    getToken()
  }, [])

  return (
    <div className="App">
      <TopMenu></TopMenu>
      <LeftPanel></LeftPanel>
      <RightPanel></RightPanel>
      <Flow></Flow>
    </div>
  );
}

export default App;
