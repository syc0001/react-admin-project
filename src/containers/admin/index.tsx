import {connect} from "react-redux";
import {reducersType} from "../../redux/reducers";
import {Navigate} from "react-router-dom";
import {FC} from "react";
import {createDeleteUserInfoAction} from "../../redux/actions_creators/login_action";

const mapStateToProps = (state: reducersType) => ({
    userInfo: state.userInfo
});
const mapDispatchToProps = {deleteUserInfo:createDeleteUserInfoAction};
type LoginProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const Admin: FC<LoginProps> = (props: LoginProps) => {
    const {user, isLogin} = props.userInfo;

    if (!isLogin) {
        return <Navigate to={"/"}/>;
    } else {
        return (
            <div>
                我是Addmin组件,登录了,名字是
                {user.username}
                <button onClick={props.deleteUserInfo}>退出登录</button>
            </div>
        );
    }
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(Admin);
