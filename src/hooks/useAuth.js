import { useSelector } from "react-redux";

export default function useAuth() {
    const auth = useSelector((state) => state.auth);

    if (auth?.accessToken && auth?.user && auth?.user?.role!=='admin') {
        return true;
    } else {
        return false;
    }
}
