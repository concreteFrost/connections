
import { Navigate } from 'react-router-dom';

function NotFound() {
    return <Navigate to="/dashboard"></Navigate>
}

export default NotFound;