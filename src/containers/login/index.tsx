import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { RuleObject } from "antd/lib/form";
import { connect } from "react-redux";
import "./css/index.less";
import logo from "./imgs/logo.png";
import { reducersType } from "../../redux/reducers";
import {
  createDemo1Action,
  createDemo2Action,
} from "../../redux/actions_creators/test_action";
const { Item } = Form;

interface LoginProps {
  test: reducersType["test"];
  demo1: typeof createDemo1Action;
  demo2: typeof createDemo2Action;
}

const FormLogin: React.FC<LoginProps> = (props: LoginProps) => {
  const onFinish = (values: any) => {
    // alert("表单提交了");
    console.log("向服务器发送登录请求");
    console.log("Success:", values);
    props.demo2("0719");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const pwdValidator = (
    rule: RuleObject,
    value: string
  ): Promise<void | any> | void => {
    // console.log("pwd", rule);
    // console.log("pwdva", value);
    if (!value) {
      return Promise.reject("密码必须输入");
    } else if (value.length > 12) {
      return Promise.reject("密码必须小于等于12位");
    } else if (value.length < 4) {
      return Promise.reject("密码必须大于等于4位");
    } else if (!/^\w+$/.test(value)) {
      return Promise.reject("密码必须是字母、数字、下划线组成");
    }
    return Promise.resolve();
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="Form"
    >
      <Item
        label="用户名"
        name="username"
        rules={[
          { required: true, message: "请输入你的用户名" },
          { min: 4, message: "用户名必须大于等于4位" },
          { max: 12, message: "用户名必须小于等于12位" },
          { pattern: /^\w+$/, message: "用户名必须是字母、数字、下划线组成" },
        ]}
      >
        <Input prefix={<UserOutlined />} />
      </Item>
      <Item
        label="密码"
        name="password"
        // rules={[
        //   { required: true, message: "密码必须输入" },
        //   { min: 4, message: "密码必须大于等于4位" },
        //   { max: 12, message: "密码必须小于等于12位" },
        //   { pattern: /^\w+$/, message: "密码必须是字母、数字、下划线组成" },
        // ]}
        rules={[{ validator: pwdValidator }]}
      >
        <Input.Password prefix={<LockOutlined />} />
      </Item>

      <Item wrapperCol={{ offset: 0, span: 24 }}>
        <Button type="primary" htmlType="submit" className="Item_Login_Button">
          Submit
        </Button>
      </Item>
    </Form>
  );
};

function Login(props: LoginProps) {
  // console.log(typeof props.test);
  return (
    <div className="login">
      <header>
        <img src={logo} alt="" />
        <h1>商品管理系统{(props as any).test}</h1>
      </header>
      <section>
        <div className="wrapper">
          <h1>用户登录</h1>
          <FormLogin
            test={props.test}
            demo1={props.demo1}
            demo2={props.demo2}
          />
        </div>
      </section>
    </div>
  );
}

export default connect(
  (state: reducersType) => ({
    test: state.test,
  }),
  {
    demo1: createDemo1Action,
    demo2: createDemo2Action,
  }
)(Login);
