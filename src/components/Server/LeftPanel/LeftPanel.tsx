import { useState } from "react";
import { useNavigate } from "react-router";
import s from "./LeftPanel.module.scss";
import ServersItem from "./LeftPanelItems/ServersItem";
import FlowsItem from "./LeftPanelItems/FlowsItem";
import StatisticsItem from "./LeftPanelItems/StatisticsItem";
import SettingsItem from "./LeftPanelItems/SettingsItem";
import DraftFlowsItem from "./LeftPanelItems/DraftFlowsItem";
import SecurityItem from "./LeftPanelItems/SecurityItem";
import AlertsItem from "./LeftPanelItems/AlertsItem";

export interface ILeftPanelSections {
  servers: boolean;
  flows: boolean;
  drafts: boolean;
  statistics: boolean;
  settings: boolean;
  security: boolean;
  alerts:boolean;

}
function LeftPanel() {
  const [sectionToOpen, setSectionToOpen] = useState<ILeftPanelSections>({
    servers: false,
    flows: false,
    drafts: false,
    statistics: false,
    settings: false,
    security: false,
    alerts:false
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
 
        <ServersItem currentSection={sectionToOpen} toggleSection={toggleSection} navigate={navigate}></ServersItem>
        <FlowsItem currentSection={sectionToOpen} toggleSection={toggleSection} navigate={navigate}></FlowsItem>
        <DraftFlowsItem currentSection={sectionToOpen} toggleSection={toggleSection} navigate={navigate}></DraftFlowsItem>
        {/* <StatisticsItem isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></StatisticsItem>*/}
        <AlertsItem currentSection={sectionToOpen}  toggleSection={toggleSection} navigate={navigate}></AlertsItem>
        <SecurityItem currentSection={sectionToOpen} toggleSection={toggleSection} navigate={navigate}></SecurityItem>
        <SettingsItem currentSection={sectionToOpen}  toggleSection={toggleSection} navigate={navigate}></SettingsItem>
    
    </div>
  );
}

export default LeftPanel;
