import {FC} from "react";
import {Button, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {RuleObject} from "antd/lib/form";
import {connect} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import "./css/index.less";
import logo from "./imgs/logo.png";
import {reducersType} from "../../redux/reducers";
import {createSaveUserInfoAction} from "../../redux/actions_creators/login_action";
import {reqLogin} from "../../api";

const {Item} = Form;

const mapStateToProps = (state: reducersType) => ({
    isLogin: state.userInfo.isLogin
});
const mapDispatchToProps = {saveUserInfo: createSaveUserInfoAction};
type LoginProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const FormLogin: FC<LoginProps> = (props: LoginProps) => {
    const navigate = useNavigate();

    const onFinish = async (values: { username: string; password: string }) => {
        // console.log("向服务器发送登录请求");
        // console.log("Success:", values);

        let result: any = await reqLogin(values.username, values.password);
        const {status, data, msg} = result;
        if (status === 0) {
            // console.log(data);
            props.saveUserInfo(data);
            navigate("/admin", {replace: true});
        } else {
            message.warning(msg, 1);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        message.error("表单输入错误,请检查");
        // console.log("Failed:", errorInfo);
    };

    const pwdValidator = (
        rule: RuleObject,
        value: string
    ): Promise<void | any> | void => {
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
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="Form"
        >
            <Item
                label="用户名"
                name="username"
                rules={[
                    {required: true, message: "请输入你的用户名"},
                    {min: 4, message: "用户名必须大于等于4位"},
                    {max: 12, message: "用户名必须小于等于12位"},
                    {pattern: /^\w+$/, message: "用户名必须是字母、数字、下划线组成"},
                ]}
            >
                <Input prefix={<UserOutlined/>}/>
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
                rules={[{validator: pwdValidator}]}
            >
                <Input.Password prefix={<LockOutlined/>}/>
            </Item>

            <Item wrapperCol={{offset: 0, span: 24}}>
                <Button type="primary" htmlType="submit" className="Item_Login_Button">
                    Submit
                </Button>
            </Item>
        </Form>
    );
};

const Login: FC<LoginProps> = (props: LoginProps) => {
    // console.log(props);
    if (props.isLogin) {
        return <Navigate to={"/admin"}/>
    }
    return (
        <div className="login">
            <header>
                <img src={logo} alt=""/>
                <h1>商品管理系统</h1>
            </header>
            <section>
                <div className="wrapper">
                    <h1>用户登录</h1>
                    <FormLogin saveUserInfo={props.saveUserInfo} isLogin={props.isLogin}/>
                </div>
            </section>
        </div>
    );
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);
