import { publicAxios } from "../api/config";
import { ApiKey } from "../api/endpoint";

export const loginReq = async (credentials) => {
  try {
    const res = await publicAxios.post(`${ApiKey.Login}`, credentials);
    console.log("Login response:", res.data);
    const msg = res.data?.message || "Login successful";
    const _data = res.data;
   
    return { error: false, data: _data, message: msg, errorMsg: "" };
  } catch (err) {
    let error;
    if (err.response) error = err.response.data.message || "Login failed please enter valid credentials";
    else if (err.request) error = "Request error";
    else error = "Something went wrong please try again later";

    throw { error: true, data: "", message: "", errorMsg: error };
  }
};