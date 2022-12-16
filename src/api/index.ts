import myAxios from "./myAxios";
import { BASE_URL } from "../config";

export const reqLogin = (username: string, password: string) => {
  //   console.log(username, password);
  return myAxios.post(`${BASE_URL}/login`, { username, password });
};

export const reqCategoryList = () => {
  return myAxios.get(`${BASE_URL}/manage/category/list`);
};
