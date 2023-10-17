import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getFlowListApi } from "../../../api/flow";
import s from "./LeftPanel.module.scss";
import { connectionsIcons } from "../../../icons/icons";
import useStore from "../../../store/store";

interface ILeftPanel{
    servers: boolean;
    flows:boolean;
    statistics:boolean;
    settings:boolean;
}
function LeftPanel() {
  const [isSectionOpened, setIsSectionOpened] = useState<ILeftPanel>({
    servers: true,
    flows: true,
    statistics: true,
    settings: true,
  });
  const [flowList, setFlowList] = useState([]);
  const getCurrentFlow = useStore((state)=>state.getCurrentFlow);
  const getBlockStats = useStore((state)=>state.getBlockStatistics);


  useEffect(() => {
    getFlowListApi().then((res : any) => {
      setFlowList(res.data);
    });
  }, []);

  const navigate = useNavigate();

  const toggleSection = (section : any) => {
    setIsSectionOpened((prevState : any) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.sections_container}>
        <div className={s.section}>
          <div className={s.section_header}>
            <span className={s.header_icon}>
              {connectionsIcons.serverMenuIcons.server}
            </span>
            <h5 className={s.section_title}>SERVERS</h5>
            <span
              className={s.arrow_icon}
              onClick={() => toggleSection("servers")}
            >
              {isSectionOpened.servers
                ? connectionsIcons.arrowDown
                : connectionsIcons.arrowUp}
            </span>
          </div>
          {isSectionOpened.servers && (
            <ul>
              <li onClick={() => navigate("servers")}>localhost</li>
            </ul>
          )}
        </div>
        <div className={s.section}>
          <div className={s.section_header}>
            <span className={s.header_icon}>
              {connectionsIcons.serverMenuIcons.flows}
            </span>
            <h5 className={s.section_title}>FLOWS</h5>
            <span
              className={s.arrow_icon}
              onClick={() => toggleSection("flows")}>
              {isSectionOpened.flows
                ? connectionsIcons.arrowDown
                : connectionsIcons.arrowUp}
            </span>
          </div>
          {isSectionOpened.flows && (
            <ul>
              {flowList.length > 0
                ? flowList.map((flow : any) => (
                    <li key={flow.flowId} onClick={()=>{
                      getCurrentFlow(flow.flowId)
                      getBlockStats(flow.flowId)
                      navigate("flows")}}>{flow.name}</li>
                  ))
                : null}
            </ul>
          )}
        </div>
        <div className={s.section}>
          <div className={s.section_header}>
            <span className={s.header_icon}>
              {connectionsIcons.serverMenuIcons.stats}
            </span>
            <h5 className={s.section_title}>STATISTICS</h5>
            <span
              className={s.arrow_icon}
              onClick={() => toggleSection("statistics")}
            >
              {isSectionOpened.statistics
                ? connectionsIcons.arrowDown
                : connectionsIcons.arrowUp}
            </span>
          </div>
          {isSectionOpened.statistics && (
            <ul>
              <li onClick={() => navigate("/dashboard/statistics")}>test</li>
            </ul>
          )}
        </div>
        <div className={s.section}>
          <div className={s.section_header}>
            <span className={s.header_icon}>
              {connectionsIcons.serverMenuIcons.settings}
            </span>
            <h5 className={s.section_title}>SETTINGS</h5>
            <span
              className={s.arrow_icon}
              onClick={() => toggleSection("settings")}
            >
              {isSectionOpened.settings
                ? connectionsIcons.arrowDown
                : connectionsIcons.arrowUp}
            </span>
          </div>
          {isSectionOpened.settings && (
            <ul>
              <li onClick={() => navigate("/dashboard/settings")}>test</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
