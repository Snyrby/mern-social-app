import { url } from "../../utils";
import axios from "axios";

export const userLogoutApi = async () => {
    try {
        const { data } = await axios.delete(`${url}/api/v1/auth/logout`);
    } catch (error) {
        console.log(error);
    }
}