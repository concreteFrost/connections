import { Registration } from "../shared/interfaces/IServer";
import { keepAliveAPI } from "../api/server";

export async function handleHandShake() {
  const cache = await caches.open("registration");
  const keys = await cache.keys();

  const registrationCacheData: any = await Promise.all(
    keys.map(async (key) => {
      const response: any = await cache.match(key);
      const data = await response.json();
      if (data.hasOwnProperty("RegistrationId")) {
        return data;
      }
    })
  );

  if (registrationCacheData.length > 0) {
    const test: Registration = {
      registrationId: registrationCacheData[0].RegistrationId,
      registration: registrationCacheData[0].Registration,
    };

    await handleKeepAlive(test);
    await Promise.all(keys.map((key) => cache.delete(key)));
  }
}

const handleKeepAlive = async (registration: Registration) => {
  try {
    const res: any = await keepAliveAPI(registration);
    console.log(res);
  } catch (e) {
    console.log("error in keep alive sending", e);
  }
};
