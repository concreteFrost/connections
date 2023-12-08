import { clearUserData } from "../../store/actions/storageActions";
import { useNavigate } from "react-router-dom"
import { connectionsIcons } from "../../icons/icons";
import { useState, useRef, useEffect } from "react";
import s from "./Profile.module.scss";
import { getMeAPI } from "../../api/security";
import { IUser } from "../../store/interfaces/ISecurity";


function Profile() {
    const navigate = useNavigate();

    const [isProfileModalVisible, setProfileModalVisible] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const [currentUser, setCurrentUser] = useState<IUser>();

    async function getMe() {
        try {
            const res: any = await getMeAPI();
            console.log(res)
            setCurrentUser(res.data.userRecord);
        }
        catch (e) {
            console.log('error getting me', e)
        }
    }

    function handleOutsideClick(e: MouseEvent) {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            toggleProfileModalVisibility(false)
        }
    }

    function toggleProfileModalVisibility(isVisible: boolean) {
        setProfileModalVisible(isVisible)
    }

    function logout() {
        clearUserData();
        navigate('/login')
    }

    useEffect(() => {
        if (isProfileModalVisible) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isProfileModalVisible]);

    return (<div className={s.wrapper}>
        <span onClick={() => {
            getMe();
            toggleProfileModalVisibility(!isProfileModalVisible)
        }}>{connectionsIcons.profile}</span>

        {isProfileModalVisible ? <div className={s.profile_wrapper} ref={modalRef}>
            {/*ACCOUNT INFO */}
            <section className={s.account_info_wrapper}>
                <header>Account Info</header>
                <main>
                    <div className={s.account_info_item}>
                        <label htmlFor="userName">Name:</label>
                        <p>{currentUser?.userName}</p>
                    </div>
                    <div className={s.account_info_item}>
                        <label htmlFor="userLogin">Login:</label>
                        <p>{currentUser?.userLogin}</p>
                    </div>
                    <button>RESET PASSWORD</button>
                </main>
            </section>
            {/*LOGOUT WRAPPER */}
            <section className={s.btn_wrapper}>
                <button onClick={logout}>Logout</button>
                <button className={s.close_btn} onClick={() => { toggleProfileModalVisibility(false) }}>CLOSE</button>
            </section>
        </div> : null
        }


    </div>)
}

export default Profile;