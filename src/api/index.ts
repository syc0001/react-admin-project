import myAxios from "./myAxios";
import qs from "qs";
import { BASE_URL } from "../config";
export const reqLogin = (username: string, password: string) => {
  //   console.log(username, password);
  return myAxios.post(`${BASE_URL}/login`, { username, password });
};
