import { Navigate } from 'react-router-dom';
import useAdminAuth from '../../hooks/useAdminAuth';

export default function PrivateAdmin({children }) {
   const isAdmin=useAdminAuth();

   return isAdmin ? children : <Navigate to="/admin" />;

}
