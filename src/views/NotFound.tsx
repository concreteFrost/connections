
import { Navigate } from 'react-router-dom';

function NotFound() {
    console.log('route not found')
    return <Navigate to="/dashboard/server"></Navigate>
}

export default NotFound;