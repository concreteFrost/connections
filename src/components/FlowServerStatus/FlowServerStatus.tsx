import { useEffect } from "react";
import useStore from "store/store";
import { NewStatisticMessage } from "store/interfaces/IStatistics";
import { handleHandShake } from "utils/handleHandshake";
import { getFlowListStatusAPI } from "api/data";

function FlowServerStatus() {
  // const { getFlowListStatus } = useStore((state) => state.flowSlice);
  const {setIsLoading} = useStore((state)=>state.loaderSlice);
  const {
    setStatistics,
    setFlowStatus,
    updateFlowBlocksRecord,
    getNewFlowRecord,
  } = useStore((state) => state.statisticsSlice);

  const refreshInterval = 2000;

  async function getFlowStatusFromCache() {
    const cache = await caches.open("status");
    const keys = await cache.keys();

    const statusCacheData: NewStatisticMessage[] = await Promise.all(
      keys.map(async (key) => {
        const response: any = await cache.match(key);
        const data = await response.json();
        if (data.hasOwnProperty("FlowId")) {
          return data;
        }
      })
    );

    if (statusCacheData.length > 0) {
      handleHandShake();
      defineMessageCategory(statusCacheData[0]);
    }
    // Clear the cache after retrieving the data

    await Promise.all(keys.map((key) => cache.delete(key)));

    // Filter out undefined values (in case any cache entries did not have "FlowId")
    // const validCacheData = cacheData.filter((data) => data !== undefined);
  }

  function defineMessageCategory(cacheData: NewStatisticMessage) {
    switch (cacheData.MessageCategory) {
      case 0:
        {
          setFlowStatus(cacheData.FlowId, cacheData.NewStatus);
          setIsLoading(false)
          console.log("flow running status changed");
        }
        break;
      case 1:
        {
          updateFlowBlocksRecord(cacheData.FlowId, cacheData.NewRecord);
          console.log("flow props changed");
        }
        break;
      case 2:
        console.log("block status changed");
        break;
      case 3:
        {
          getNewFlowRecord(cacheData.NewRecord);
          console.log("new flow detected");
        }
        break;
      case 4:
        console.log("flow deleted");
        break;
    }
  }

  const fetchFlowListStatus = async () => {
    try {
      const res: any = await getFlowListStatusAPI();
      setStatistics(res.data);
    } catch (error) {
      console.log("error getting flow list status");
    }
  };

  useEffect(() => {
    fetchFlowListStatus();
  }, []);

  useEffect(() => {
    const refreshTimer = setInterval(() => {
      getFlowStatusFromCache();
    }, refreshInterval);
    return () => {
      clearInterval(refreshTimer);
    };
  }, [refreshInterval]);

  return null;
}

export default FlowServerStatus;
