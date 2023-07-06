import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";
import Flow from "./components/Flow";
import "./App.css";
import TopMenu from "./components/TopMenu/TopMenu";
import { useEffect } from "react";
import getToken from "./api/token/getToken";
import { getBlocks } from "./api/data";
import useStore from "./store/store";
import { Tooltip } from "react-tooltip";

function App() {

  const baseUrl = useStore((store) => store.baseUrl)
  const getNodesList = useStore((store) => store.getNodesList);
  const tooltipText = useStore((store) => store.tooltip.text);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getToken(baseUrl);
        await getBlocks(baseUrl).then((data: any) => getNodesList(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <TopMenu></TopMenu>
      <LeftPanel></LeftPanel>
      <RightPanel></RightPanel>
      <Flow></Flow>
      <Tooltip anchorSelect=".nodelist-body-elemet" place="right" style={{ zIndex: 1000 }}  >
        {tooltipText}
      </Tooltip>
    </div>
  );
}

export default App;
