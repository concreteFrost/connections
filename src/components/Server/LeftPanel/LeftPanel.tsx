import { useState } from "react";
import { useNavigate } from "react-router";
import s from "./LeftPanel.module.scss";
import ServersItem from "./LeftPanelItems/ServersItem";
import FlowsItem from "./LeftPanelItems/FlowsItem";
import StatisticsItem from "./LeftPanelItems/StatisticsItem";
import SettingsItem from "./LeftPanelItems/SettingsItem";
import DraftFlowsItem from "./LeftPanelItems/DraftFlowsItem";
import SecurityItem from "./LeftPanelItems/SecurityItem";

interface ILeftPanel {
  servers: boolean;
  flows: boolean;
  drafts: boolean;
  statistics: boolean;
  settings: boolean;
  security: boolean;

}
function LeftPanel() {
  const [isSectionOpened, setIsSectionOpened] = useState<ILeftPanel>({
    servers: false,
    flows: false,
    drafts: false,
    statistics: false,
    settings: false,
    security: false
  });

  const navigate = useNavigate();

  const toggleSection = (section: any) => {

    setIsSectionOpened((prevState: any) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.sections_container}>
        <ServersItem className={s} isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></ServersItem>
        <FlowsItem className={s} isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></FlowsItem>
        <DraftFlowsItem className={s} isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></DraftFlowsItem>
        {/* <StatisticsItem className={s} isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></StatisticsItem>
        <SettingsItem className={s} isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></SettingsItem> */}
        <SecurityItem className={s} isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></SecurityItem>
      </div>
    </div>
  );
}

export default LeftPanel;
