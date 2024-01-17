import { useEffect, useState } from "react";
import { connectionsIcons } from "../../icons/icons";
import s from "./PushNotifications.module.scss"

function PushNotifications() {

    const[notificationsCount,setNotificationsCount] = useState<number>(0);

    async function getNotifications() {
        const cache = await caches.open('notifications');
        const keys = await cache.keys();

        const notifications = await Promise.all(keys.map(async (key) => {
            const response: any = await cache.match(key);
            const data: any = await response.json();
            return data;
        }));

        return notifications;
    }

    useEffect(() => {
        getNotifications().then((notifications : any) => {
            console.log('Cached notifications:', notifications);
            setNotificationsCount(notifications.length)
        });
    }, [])

    async function clearNotifications() {
        await caches.keys().then((cacheNames: any) => {
            return Promise.all(cacheNames.map((name: any) => { return caches.delete(name) }))
        })

        await getNotifications().then((notifications) => {
            console.log('Cached notifications:', notifications);
        });
    }

    return (<div className={s.wrapper}>
        <span className={s.icon}>{connectionsIcons.bell}</span>
        {notificationsCount > 0 ? <span className={s.badge}>{notificationsCount}</span> : null}
        
    </div>)
}

export default PushNotifications;