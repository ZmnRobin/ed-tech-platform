import { useSelector } from 'react-redux';

export default function useAdminAuth() {
    const auth = useSelector((state) => state.auth);
    if (auth?.accessToken && auth?.user?.role==='admin') {
        return true;
    } else {
        return false;
    }
}
