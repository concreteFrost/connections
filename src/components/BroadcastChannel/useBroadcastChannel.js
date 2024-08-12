import { useEffect } from "react";

const useBroadcastChannel = (channelName) => {
  useEffect(() => {
    const channel = new BroadcastChannel(channelName);

    // Отправляем сообщение при загрузке страницы
    channel.postMessage("check_status");

    // Обрабатываем входящие сообщения
    const handleMessage = (event) => {
      if (event.data === "check_status") {
        // Если получаем сообщение "check_status", значит, другой таб хочет проверить статус
        channel.postMessage("app_opened");
      } else if (event.data === "app_opened") {
        alert("App is already opened in another tab. This tab will now be closed.");
        window.location.href = 'about:blank';
      }
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      // Убираем обработчик при размонтировании компонента
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, [channelName]);

  return null;
};

export default useBroadcastChannel;
