import { url } from "../../utils";
import axios from "axios";

export const userLogoutApi = async () => {
  try {
    const { data } = await axios.delete(`${url}/api/v1/auth/logout`);
  } catch (error) {
    console.log(error);
  }
};

export const registerUserApi = async (formData) => {
  const { data } = await axios.post(`${url}/api/v1/auth/register`, formData);
  return data.msg;
};

export const loginUserApi = async (loginUser) => {
  const { data } = await axios.post(`${url}/api/v1/auth/login`, loginUser);
  return data.user;
};

export const verifyEmailApi = async (email, verificationToken) => {
  const { data } = await axios.post(`${url}/api/v1/auth/verify-email`, {
    verificationToken,
    email,
  });
  return data.msg;
};

export const forgotPasswordApi = async (email) => {
  const { data } = await axios.post(`${url}/api/v1/auth/forgot-password`, {
    email,
  });
  return data.msg;
};

export const userImageUploadApi = async (formData) => {
  const { data } = await axios.post(`${url}/api/v1/auth/image-upload`, formData);
  return data.image;
};
