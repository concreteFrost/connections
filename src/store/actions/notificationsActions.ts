import { enableClientNotificationsAPI, getNotificationTypesAPI, getNotificationsAPI, newNotificationAPI, registerClientNotificationAPI, removeNotificationAPI, testClientCallbackAPI, updateNotificationAPI } from "../../api/notification";
import { INotification, INotificationType, ISubscription } from "../interfaces/INotification";
import { RFState } from "../types/rfState";

const getNotificationList = (get: () => RFState, set: any) => async (userId?: string, userGroup?: string) => {
    try {
        const res: any = await getNotificationsAPI(userId, userGroup);
        const data: Array<INotification> = res.data.notifications.map((notification: INotification) => { return { ...notification, isSelected: false } });
        set((state: RFState) => ({
            notificationSlice: {
                ...state.notificationSlice,
                notificationsList: data
            }
        }))
    } catch (e) {
        console.log('error loading notifications', e);

    }
}

const toggleHaveCheckedNotifications=(get:()=>RFState,set:any) =>(haveCheckedNotifications:boolean)=>{
    set((state:RFState)=>({
        notificationSlice: {
            ...state.notificationSlice,
            haveCheckedNotifications: haveCheckedNotifications
        }  
    }))
}

const getNotificationTypes = (get: () => RFState, set: any) => async () => {
    try {
        const res: any = await getNotificationTypesAPI();
        const data: Array<INotificationType> = res.data;
        set((state: RFState) => ({
            notificationSlice: {
                ...state.notificationSlice,
                notificationsTypes: data
            }
        }))

    } catch (e) {
        console.log('error loading notifications', e);

    }
}

const setCurrentNotification = (get: () => RFState, set: any) => (notification: INotification | null) => {
    set((state: RFState) => ({
        notificationSlice: {
            ...state.notificationSlice,
            currentNotification: notification
        }
    }))
}

const setCurrentNotificationProps = (get: () => RFState, set: any) => (propToChange: any, value: any) => {
    set((state: RFState) => ({
        notificationSlice: {
            ...state.notificationSlice,
            currentNotification: {
                ...state.notificationSlice.currentNotification,
                [propToChange]: value
            }
        }
    }))
}

const deleteNotification = (get: () => RFState, set: any) => async (notificationId: number) => {
    try {
        const res = await removeNotificationAPI(notificationId);
        return res;

    }
    catch (e) {
        console.log('error on deleting notification', e)
    }
}

const addNewNotifications =  (get: () => RFState, set: any) => async (notificationRecord: INotification)=>{
    try{
        const res : any = await newNotificationAPI(notificationRecord);
        return res;
    }
    catch(e){

    }
}

const updateNotification = (get: () => RFState, set: any) => async (notification: INotification) => {
    try {
        const res: any = await updateNotificationAPI(notification);
        return res;
    }
    catch (e) {
        console.log('error on updating notification', e)
    }
}

const toggleSelectNotification = (get: () => RFState, set: any) => async (notificationId: number) => {
    const updatedNotifications = get().notificationSlice.notificationsList.map((notification: any) => {
        if (notificationId === notification.notificationId) {
            return {
                ...notification,
                isSelected: !notification.isSelected
            }
        }
        else return notification
    })

    set((state: RFState) => ({
        notificationSlice: {
            ...state.notificationSlice,
            notificationsList: updatedNotifications
        }
    }))
}

const enableClientNotifications = (get: () => RFState, set: any) => async (subscription:ISubscription) => {
    try{
        const res : any = await enableClientNotificationsAPI(subscription);
        console.log(res)
    }
    catch(e){
        console.log('error enabling client notifications',e)
    }
}

const testClientCallback = (get: () => RFState, set: any) => async (yourCallbackUrl: string, user: string, pass: string, anyText: string) => {
    try {
        const res: any = await testClientCallbackAPI(yourCallbackUrl, user, pass, anyText);
        return res;
    }
    catch (e) {
        console.log('error testing callback', e)
    }
}

const registerClientNotification = (get: () => RFState, set: any) => async (notificationId:number,callbackURI:string, userName:string,password:string) => {
    try {
        const res: any = await registerClientNotificationAPI(notificationId,callbackURI,userName,password)
        return res;
    }
    catch (e) {
        console.log('error registering notification', e)
    }
}

const notificationsActions = {
    getNotificationList: getNotificationList,
    getNotificationTypes: getNotificationTypes,
    setCurrentNotification: setCurrentNotification,
    deleteNotification: deleteNotification,
    addNewNotifications:addNewNotifications,
    setCurrentNotificationProps: setCurrentNotificationProps,
    updateNotification: updateNotification,
    toggleSelectNotification: toggleSelectNotification,
    toggleHaveCheckedNotifications:toggleHaveCheckedNotifications,
    testClientCallback: testClientCallback,
    registerClientNotification:registerClientNotification,
    enableClientNotifications:enableClientNotifications,
}

export default notificationsActions