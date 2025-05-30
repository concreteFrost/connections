import { connectionsIcons } from "assets/icons/icons";
import s from "../ServerDashboard.module.scss";
import {
  killServer,
  startServer,
  stopServer,
} from "utils/server/serverOperations";
import useStore from "store/store";
import GaugeWrapper from "../Gauges/GaugeWrapper";

type Props = {
  getServerData: () => void;
  serverStatus: string;
};

export default function ServerControlPanel({
  getServerData,
  serverStatus,
}: Props) {
  const { setTooltipText } = useStore(
    (store) => store.designerVisualElementsSlice
  );
  return (
    <div className={s.header}>
      <GaugeWrapper></GaugeWrapper>

      <div className={s.header_buttons}>
        <button
          className={`${s.play} tooltip-item`}
          onClick={() => startServer(getServerData)}
          onMouseEnter={() => setTooltipText("Start Connections Server")}
        >
          {connectionsIcons.serverButtonsIcons.play}
        </button>
        <button
          className={`${s.stop} tooltip-item`}
          onClick={() => stopServer(getServerData)}
          onMouseEnter={() =>
            setTooltipText(
              "Perform a graceful shutdown of the Connections Server"
            )
          }
        >
          {connectionsIcons.serverButtonsIcons.stop}
        </button>
        <button
          className={`${s.kill} tooltip-item`}
          onClick={() => killServer(getServerData)}
          onMouseEnter={() =>
            setTooltipText(
              "Hard shutdown of the Connections Server (all current workflows will be terminated)"
            )
          }
        >
          {connectionsIcons.serverButtonsIcons.kill}
        </button>
      </div>
      {/* <div className={s.server_status}>server status : {serverStatus}</div> */}
    </div>
  );
}
