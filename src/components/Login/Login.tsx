import s from "./Login.module.scss"
import getToken from "../../api/token/getToken";
import useStore from "../../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Login(props: any) {

    const baseUrl = useStore((state) => state.baseUrl);
    const [defNameVal, setDefNameVal] = useState('iliaM')
    const [defPassVal, setDefPassVal] = useState('cre4min9Tuff')

    const navigate = useNavigate();

    function submit(e: any) {
        e.preventDefault();

        getToken(baseUrl, e.target[0].value, e.target[1].value).then((res) => {
            props.setIsLoggedIn(res)
            navigate('/dashboard')
        })

    }

    return (<div className={s.wrapper}>
        <header><h1>CONNECTIONS</h1></header>

        <form onSubmit={submit}>

            <div>
                <label htmlFor="">username</label>
                <input type="text" value={defNameVal} onChange={(e: any) => setDefNameVal(e.target.value)} />
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