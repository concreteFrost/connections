import { startServerAPI, stopServerAPI, killServerAPI } from "api/server";

export function startServer(getServerData: () => void) {
  startServerAPI()
    .then((res) => {
      getServerData();
      console.log("start server success", res);
    })
    .catch((e) => {
      console.log("start server error", e);
    });
}

export function stopServer(getServerData: () => void) {
  stopServerAPI()
    .then((res) => {
      getServerData();
      console.log("stop server success", res);
    })
    .catch((e) => {
      console.log("stop server error", e);
    });
}

export function killServer(getServerData: () => void) {
  killServerAPI()
    .then((res) => {
      getServerData();
      console.log("kill server success", res);
    })
    .catch((e) => {
      console.log("kill server error", e);
    });
}
