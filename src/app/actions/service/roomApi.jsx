import { DOMAIN, TOKEN_CYBERSOFT } from "@/app/setting/setting";
import axios from "axios";

export const token = {
    headers: {
      'TokenCybersoft': TOKEN_CYBERSOFT,

    }
}
export const getAllApiRoomAction = async () => {
    const res = await axios.get(`${DOMAIN}/api/phong-thue`,token)
    const data = await res.data.content
    return data

};

export const getRoomByIDAction = async (id) => {
    const res = await axios.get(`${DOMAIN}/api/phong-thue/${id}`,token)
    const data = await res.data.content
    return data
}
export const getApiRoomByIdLocationAction = async(idLocation) => {
    const res = await axios.get(`${DOMAIN}/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${idLocation}`,token)
    const data = await res.data.content
    return data
}

