import { useEffect } from "react";

function CachedNotifications() {

    async function getNotifications() {
        const cache = await caches.open('notifications');
        const keys = await cache.keys();
        console.log(keys,'keys')

        const notifications = await Promise.all(keys.map(async (key) => {
            const response: any = await cache.match(key);
            const data: any = await response.json();
            return data;
        }));

        return notifications;
    }

    useEffect(() => {
        getNotifications().then((notifications) => {
            console.log('Cached notifications:', notifications);
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


    return (<div onClick={clearNotifications}>Clear Cache</div>)
}

export default CachedNotifications;