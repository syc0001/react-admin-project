import { FC, useEffect, useState } from "react";
import "./css/Header.less";
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import screenFull from "screenfull";
import { Modal } from "antd";
import { connect } from "react-redux";
import { reducersType } from "../../../redux/reducers";
import { createDeleteUserInfoAction } from "../../../redux/actions_creators/login_action";
const { confirm } = Modal;

const mapStateToProps = (state: reducersType) => ({ userInfo: state.userInfo });

const mapDispatchToProps = { deleteUser: createDeleteUserInfoAction };

type HeaderProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const [date, setDate] = useState(new Date());
  const [isFull, setFull] = useState(false);

  const setFullChange = () => {
    setFull(!isFull);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    screenFull.on("change", setFullChange);
    return () => {
      clearInterval(timer);
      screenFull.off("change", setFullChange);
    };
  }, [isFull]);

  const fullScreen = () => {
    screenFull.toggle();
  };

  const logOut = () => {
    confirm({
      icon: <QuestionCircleOutlined />,
      content: "确定退出?若退出需要重新登陆",
      cancelText: "取消",
      okText: "确认",
      onOk: () => {
        props.deleteUser();
      },
    });
  };

  return (
    <header className="header">
      <div className="header-top">
        <Button size={"small"} onClick={fullScreen}>
          {isFull ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </Button>
        <span className="username">欢迎,{props.userInfo.user.username}</span>
        <Button type="link" size="small" onClick={logOut}>
          退出登录
        </Button>
      </div>
      <div className="header-bottom">
        <div className="header-bottom-left">柱状图</div>
        <div className="header-bottom-right">
          {date.toTimeString().substring(0, 8)}
          <img
            src="http://api.map.baidu.com/images/weather/day/qing.png"
            alt="天气信息"
          />
          晴&nbsp;温度 2 ~ -5
        </div>
      </div>
    </header>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
