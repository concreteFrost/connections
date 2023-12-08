import { clearUserData } from "../../store/actions/storageActions";
import { useNavigate } from "react-router-dom"
import { connectionsIcons } from "../../icons/icons";
import { useState, useRef, useEffect } from "react";
import s from "./Profile.module.scss";

interface ICurrentUser {
    name: {
        value: string,
        isEditable: boolean
    },
    login: {
        value: string,
        isEditable: boolean
    }
}

function Profile() {
    const navigate = useNavigate();

    const [isProfileModalVisible, setProfileModalVisible] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const [user, setUser] = useState<ICurrentUser>({
        name: {
            value: 'ilia',
            isEditable: false,
        },
        login: {
            value: 'ilia22',
            isEditable: false,
        }
    })

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

    function toggleEditableValue(propName: keyof ICurrentUser, isEditable: boolean) {
        // Create a copy of the user state
        const updatedUser = { ...user };

        // Reset isEditable for all fields
        Object.keys(updatedUser).forEach((key) => {
            updatedUser[key as keyof ICurrentUser].isEditable = false;
        });

        // Set the desired field to isEditable
        updatedUser[propName].isEditable = isEditable;

        // Update the state
        setUser(updatedUser);
    }

    function setUserValue(propName: keyof ICurrentUser, value: any) {
        setUser({
            ...user,
            [propName]: {
                ...user[propName],
                value: value
            },

        })
    }


    useEffect(() => {
        if (isProfileModalVisible) {
            document.addEventListener("mousedown", handleOutsideClick);
            console.log('aaded')
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
            console.log('removed')
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isProfileModalVisible]);

    return (<div className={s.wrapper}>
        <span onClick={() => toggleProfileModalVisibility(!isProfileModalVisible)}>{connectionsIcons.profile}</span>

        {isProfileModalVisible ? <div className={s.profile_wrapper} ref={modalRef}>
            {/*ACCOUNT INFO */}
            <section className={s.account_info_wrapper}>
                <header>Account Info</header>
                <main>
                    <div className={s.account_info_item}>
                        <label htmlFor="userName">Name:</label>
                        <input type="text" value={user.name.value} readOnly={!user.name.isEditable}
                            onChange={(e: any) => setUserValue('name', e.target.value)}
                        />
                        <span onClick={() => toggleEditableValue('name', !user.name.isEditable)}>
                            {user.name.isEditable ? connectionsIcons.editOff : connectionsIcons.editOn}</span>
                    </div>

                    <div className={s.account_info_item}>
                        <label htmlFor="userLogin">Login:</label>
                        <input type="text" value={user.login.value} readOnly={!user.login.isEditable}
                            onChange={(e: any) => setUserValue('login', e.target.value)} />
                        <span onClick={() => toggleEditableValue('login', !user.login.isEditable)}>
                            {user.login.isEditable ? connectionsIcons.editOff : connectionsIcons.editOn}</span>
                    </div>
                    <button>RESET PASSWORD</button>
                </main>
            </section>
            {/*LOGOUT WRAPPER */}
            <section className={s.btn_wrapper}>
                <button onClick={logout}>Logout</button>
            </section>
        </div> : null
        }


    </div>)
}

export default Profile;