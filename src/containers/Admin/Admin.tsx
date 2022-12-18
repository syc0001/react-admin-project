import { connect } from "react-redux";
import { reducersType } from "../../redux/reducers";
import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";
import { createDeleteUserInfoAction } from "../../redux/actions_creators/login_action";
import { reqCategoryList } from "../../api";
import { Layout } from "antd";
import "./css/Admin.less";
import Header from "./Header/Header";
import LeftNav from "./LeftNav/LeftNav";

const { Footer, Sider, Content } = Layout;

const mapStateToProps = (state: reducersType) => ({
  userInfo: state.userInfo,
});
const mapDispatchToProps = { deleteUserInfo: createDeleteUserInfoAction };
type AdminProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Admin: FC<AdminProps> = (props: AdminProps) => {
  const { isLogin } = props.userInfo;

  const loginOut = () => {
    props.deleteUserInfo();
  };

  const test = async () => {
    let result = await reqCategoryList();
    console.log(result);
  };

  if (!isLogin) {
    return <Navigate to={"/"} />;
  }
  return (
    <Layout className="admin-container">
      <Sider className="sider">
        <LeftNav />
      </Sider>
      <Layout>
        <Header />
        <Content className="content">
          <button onClick={test}>click me</button>
          Content,这是路由
          <Outlet />
        </Content>
        <Footer className="footer">
          推荐使用Chrome浏览器,获得最佳用户体验
        </Footer>
      </Layout>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
