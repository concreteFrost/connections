import { clearUserData } from "../../store/actions/storageActions";
import { useNavigate } from "react-router-dom"
import { connectionsIcons } from "../../icons/icons";
import { useState, useRef, useEffect } from "react";
import s from "./Profile.module.scss";
import { getMeAPI } from "../../api/security";
import { IUser } from "../../store/interfaces/ISecurity";
import EditUserModal from "../Modals/UserModals/EditUserModal/EditUserModal";
import useStore from "../../store/store";
import { ProfileIconVariants } from "../../store/enums/profile";

interface ProfileProps{
    themeColor: ProfileIconVariants
}

function Profile(props:ProfileProps) {
    const navigate = useNavigate();

    const [isProfileModalVisible, setProfileModalVisible] = useState<boolean>(false);
    const [isEditUserVisible, setEditUserVisible] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const { userToEdit, getUser } = useStore((state) => state.securitySlice);

    async function getMe() {
        try {
            const res: any = await getMeAPI();
            await getUser(res.data.userRecord);
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

    function toggleEditUserModal(isVisible: boolean) {
        setEditUserVisible(isVisible)
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
        <span className={`${s.icon}  ${props.themeColor === ProfileIconVariants.Dark ? s['dark'] : s['light']}` } onClick={() => {
            getMe();
            toggleProfileModalVisibility(!isProfileModalVisible)
        }}>{connectionsIcons.profile}</span>

        {isProfileModalVisible ? <div className={s.profile_wrapper} ref={modalRef}>
            {/*ACCOUNT INFO */}
            <section className={s.account_info_wrapper}>
                <header>Account Info</header>
                <p className={s.edit_btn} onClick={() => toggleEditUserModal(true)}>edit</p>
                <main>
                    <div className={s.account_info_item}>
                        <label htmlFor="userName">Name:</label>
                        <p>{userToEdit?.userName}</p>
                    </div>
                    <div className={s.account_info_item}>
                        <label htmlFor="userLogin">Login:</label>
                        <p>{userToEdit?.userLogin}</p>
                    </div>
                </main>
            </section>
            {/*LOGOUT WRAPPER */}
            <section className={s.btn_wrapper}>
                <button onClick={logout}>Logout</button>
                <button className={s.close_btn} onClick={() => { toggleProfileModalVisibility(false) }}>CLOSE</button>
            </section>
        </div> : null
        }
        <EditUserModal isVisible={isEditUserVisible} toggleEditUser={toggleEditUserModal} ></EditUserModal>

    </div>)
}

export default Profile;