import { DOMAIN, USER_LOGIN } from "@/app/setting/setting";
import axios from "axios";
import { token } from "./roomApi";

export const getUserIdFromCookie = () => {
    if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem(USER_LOGIN);
        if (storedUser) {
            const user = JSON.parse(storedUser);
            return user.id;
        }
    }
    return null;
};
export const getProfileAction = async () => {
    const userId = getUserIdFromCookie();
    console.log('UserID :', userId);

    const res = await axios.get(`${DOMAIN}/api/users/43592`, token);
    return await res.data.content;
}
