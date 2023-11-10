import s from "./Login.module.scss"
import getToken from "../../api/token/getToken";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { setAccessToken } from "../../store/actions/storageActions";

function Login() {

    const [defPassVal, setDefPassVal] = useState('cre4min9Tuff')
    const [userName, setUserName] = useState<string>(localStorage.getItem('iCon_username') ?? '');

    const navigate = useNavigate();

    function submit(e: any) {
        e.preventDefault();
        getToken(e.target[0].value, e.target[1].value).then((res: any) => {
            setAccessToken(res.data, userName)
            navigate('/dashboard')
        }).catch(e => console.log(e))
    }

    return (<div className={s.wrapper}>
        <header><h1>CONNECTIONS</h1></header>

        <form onSubmit={submit}>
            <div>
                <label htmlFor="">username</label>
                <input type="text" value={userName} onChange={(e: any) => setUserName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">password</label>
                <input type="password" value={defPassVal} onChange={(e: any) => setDefPassVal(e.target.value)} />
            </div>
            <div className={s.btn_wrapper}>
                <button>LOGIN</button>
            </div>

        </form>
    </div>)
}

export default Login;