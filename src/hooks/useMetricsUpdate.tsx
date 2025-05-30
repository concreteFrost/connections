import moment from "moment";
import { useEffect, useState } from "react";
import { IMetrics } from "store/interfaces/IStatistics";
import useStore from "store/store";

export default function useMetricsUpdate() {
  const { updateChartData } = useStore((state) => state.statisticsSlice);
  useEffect(() => {
    // Функция-обработчик сообщений
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "metrics") {
        const metrics: IMetrics = event.data.metrics[0];

        updateChartData({ metrics: metrics, time: moment().format("LTS") });
      }
    };

    // Подписка на сообщения
    navigator.serviceWorker.addEventListener("message", handleMessage);

    // Очистка при размонтировании
    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
  }, []);
}

//  const handleMessage = (event: MessageEvent) => {
//       if (event.data?.type === "metrics") {
//         const metrics: IMetrics = event.data.metrics[0];
//         allMetrics.push(metrics);

//         if (allMetrics.length > maxMetrics) {
//           allMetrics.splice(0, allMetrics.length - maxMetrics);
//         }
//         // console.log(allMetrics);
//       }
//     };
