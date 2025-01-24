import { useState } from "react";
import { useNavigate } from "react-router";
import s from "./LeftPanel.module.scss";
import ServersItem from "./LeftPanelItems/ServersItem";
import FlowsItem from "./LeftPanelItems/FlowsItem";
import SettingsItem from "./LeftPanelItems/SettingsItem";
import DraftFlowsItem from "./LeftPanelItems/DraftFlowsItem";
import SecurityItem from "./LeftPanelItems/SecurityItem";
import AlertsItem from "./LeftPanelItems/AlertsItem";
import MetricsItem from "./LeftPanelItems/MetricsItem";
import LogSearchItem from "./LeftPanelItems/LogSearchItem";

export interface ILeftPanelSections {
  servers: boolean;
  metrics: boolean;
  flows: boolean;
  drafts: boolean;
  statistics: boolean;
  settings: boolean;
  security: boolean;
  alerts: boolean;
}
function LeftPanel() {
  const [sectionToOpen, setSectionToOpen] = useState<ILeftPanelSections>({
    servers: false,
    metrics: false,
    flows: false,
    drafts: false,
    statistics: false,
    settings: false,
    security: false,
    alerts: false,
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
      <ServersItem
        currentSection={sectionToOpen}
        toggleSection={toggleSection}
        navigate={navigate}
      ></ServersItem>
      <MetricsItem
        currentSection={sectionToOpen}
        toggleSection={toggleSection}
        navigate={navigate}
      ></MetricsItem>
      <LogSearchItem
        currentSection={sectionToOpen}
        toggleSection={toggleSection}
        navigate={navigate}
      ></LogSearchItem>
      <FlowsItem
        currentSection={sectionToOpen}
        toggleSection={toggleSection}
        navigate={navigate}
      ></FlowsItem>
      <DraftFlowsItem
        currentSection={sectionToOpen}
        toggleSection={toggleSection}
        navigate={navigate}
      ></DraftFlowsItem>
      <AlertsItem
        currentSection={sectionToOpen}
        toggleSection={toggleSection}
        navigate={navigate}
      ></AlertsItem>
      <SecurityItem
        currentSection={sectionToOpen}
        toggleSection={toggleSection}
        navigate={navigate}
      ></SecurityItem>
      <SettingsItem
        currentSection={sectionToOpen}
        toggleSection={toggleSection}
        navigate={navigate}
      ></SettingsItem>
    </div>
  );
}

export default LeftPanel;
