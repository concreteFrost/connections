import s from "./style/Login.module.scss"
import getToken from "../api/token";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { setAccessToken } from "../store/actions/storageActions";
import ConnectionsLogo from "../assets/connections_logo";
import CocoonLogo from "../assets/cocoon_logo";
import useStore from "../store/store";

interface LoginInterface{
    setIsLoggedIn:(isLoggedIn:boolean)=> void;
}

function Login(props:LoginInterface) {

    const [userName, setUserName] = useState<string>(localStorage.getItem('iCon_username') ?? '');
    const { setAppUserPassword, appUserPassword } = useStore((state) => state.securitySlice);
    
    const navigate = useNavigate();

    async function checkSubscription() {
        try {
            if ("serviceWorker" in navigator) {
                await navigator.serviceWorker.register("/sw.js")
                // console.log('Service worker registered', sw)
                const registration = await navigator.serviceWorker.ready;
                // Check for existing subscription
                const existingSubscription = await registration.pushManager.getSubscription();

                if (existingSubscription) {
                    console.log('subscription found')
                    existingSubscription.unsubscribe()
                }
            }
        } catch (error) {
            console.error("Error registering service worker:", error);
        }
    }

    useEffect(() => {
        checkSubscription();
    }, [])

    function submit(e: any) {
        e.preventDefault();
        if (appUserPassword && userName)
            getToken(userName, appUserPassword).then((res: any) => {
                setAccessToken(res.data, userName);
                props.setIsLoggedIn(true);
                navigate('/dashboard')
            }).catch(e => console.log(e))
    }

    return (<div className={s.wrapper}>
        <div className={s.logo_wrapper}>
            <ConnectionsLogo></ConnectionsLogo>
        </div>

        <div className={s.form_wrapper}>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="">username</label>
                    <input type="text" value={userName} onChange={(e: any) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">password</label>
                    <input type="password" value={appUserPassword} onChange={(e: any) => setAppUserPassword(e.target.value)} />
                </div>
                <div className={s.btn_wrapper}>
                    <button>LOGIN</button>
                </div>
            </form>
        </div>

        <div className={s.cocoon_logo_wrapper}>
            <CocoonLogo></CocoonLogo>
        </div>

    </div>)
}

export default Login;