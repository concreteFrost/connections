import { useState } from "react";
import { useNavigate } from "react-router";
import s from "./LeftPanel.module.scss";
import ServersItem from "./LeftPanelItems/ServersItem";
import FlowsItem from "./LeftPanelItems/FlowsItem";
import StatisticsItem from "./LeftPanelItems/StatisticsItem";
import SettingsItem from "./LeftPanelItems/SettingsItem";

interface ILeftPanel {
  servers: boolean;
  flows: boolean;
  statistics: boolean;
  settings: boolean;
}
function LeftPanel() {
  const [isSectionOpened, setIsSectionOpened] = useState<ILeftPanel>({
    servers: true,
    flows: true,
    statistics: false,
    settings: false,
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
        <StatisticsItem className={s} isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></StatisticsItem>
        <SettingsItem className={s} isSectionOpened={isSectionOpened} toggleSection={toggleSection} navigate={navigate}></SettingsItem>
      </div>
    </div>
  );
}

export default LeftPanel;
