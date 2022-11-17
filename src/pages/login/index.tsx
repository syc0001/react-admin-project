import React from "react";
import "./css/index.less";
import logo from "./imgs/logo.png";

export default function Login() {
  return (
    <div className="login">
      <header>
        <img src={logo} alt="" />
        <h1>商品管理系统</h1>
      </header>
      <section>
        <h1>用户登录</h1>
        <h2>加 antd</h2>
      </section>
    </div>
  );
}
