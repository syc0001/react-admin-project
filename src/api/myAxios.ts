import { message } from "antd";
import axios from "axios";
import NProgress from "nprogress";
import qs from "qs";
import "nprogress/nprogress.css";

const instance = axios.create({
  timeout: 4000,
});

//请求拦截器
instance.interceptors.request.use((config) => {
  // console.log(config);
  const { method, data } = config;
  // console.log(method, data);
  if (method?.toLowerCase() === "post") {
    if (data instanceof Object) {
      config.data = qs.stringify(data);
      // console.log(config.data);
    }
  }
  return config;
});
//响应拦截器
instance.interceptors.response.use(
  (config) => {
    NProgress.done();
    return config.data;
  },
  (error) => {
    NProgress.done();
    message.error(error.message);
    return new Promise((resolve, reject) => {});
  }
);

export default instance;
