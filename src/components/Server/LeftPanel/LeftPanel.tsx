import { useState } from "react";
import { useNavigate } from "react-router";
import s from "./LeftPanel.module.scss";
import ServersItem from "./LeftPanelItems/ServersItem";
import FlowsItem from "./LeftPanelItems/FlowsItem";
import StatisticsItem from "./LeftPanelItems/StatisticsItem";
import SettingsItem from "./LeftPanelItems/SettingsItem";
import DraftFlowsItem from "./LeftPanelItems/DraftFlowsItem";
import SecurityItem from "./LeftPanelItems/SecurityItem";

export interface ILeftPanelSections {
  servers: boolean;
  flows: boolean;
  drafts: boolean;
  statistics: boolean;
  settings: boolean;
  security: boolean;

}
function LeftPanel() {
  const [sectionToOpen, setSectionToOpen] = useState<ILeftPanelSections>({
    servers: false,
    flows: false,
    drafts: false,
    statistics: false,
    settings: false,
    security: false
  });

  const navigate = useNavigate();

  const toggleSection = (section: any) => {

    setSectionToOpen((prevState: any) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className={s.wrapper}>
      <div className={s.sections_container}>
        <ServersItem className={s} currentSection={sectionToOpen} toggleSection={toggleSection} navigate={navigate}></ServersItem>
        <FlowsItem className={s} currentSection={sectionToOpen} toggleSection={toggleSection} navigate={navigate}></FlowsItem>
        <DraftFlowsItem className={s} currentSection={sectionToOpen} toggleSection={toggleSection} navigate={navigate}></DraftFlowsItem>
        {/* <StatisticsItem className={s} isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></StatisticsItem>*/}
        <SecurityItem className={s} currentSection={sectionToOpen} toggleSection={toggleSection} navigate={navigate}></SecurityItem>
        <SettingsItem className={s} currentSection={sectionToOpen}  toggleSection={toggleSection} navigate={navigate}></SettingsItem>
      </div>
    </div>
  );
}

export default LeftPanel;
