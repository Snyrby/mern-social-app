import { useDispatch } from "react-redux";
import axios from "axios";
import url from "./url";
import { setLogin } from "../state";

const IsLoggedIn = async () => {
  const { data } = await axios.get(`${url}/api/v1/users/showMe`, {withCredentials: true});
  return data;
};

export default IsLoggedIn;
