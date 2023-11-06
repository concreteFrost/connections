import { clearUserData } from "../../store/actions/storageActions";
import { useNavigate } from "react-router-dom"

function Logout() {
    const navigate = useNavigate();

    function logout() {
        clearUserData();
        navigate('/login')
    }

    return (<div>
        <button onClick={logout}>Logout</button>
    </div>)
}

export default Logout;