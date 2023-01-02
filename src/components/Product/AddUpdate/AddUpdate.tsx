import { FC } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { EnterOutlined } from "@ant-design/icons";

const AddUpdate: FC<any> = () => {
  const match = useMatch("/admin/prud_about/product/addupdate/:id");
  console.log("addupdate ", match);
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        <EnterOutlined></EnterOutlined> 返回
      </Button>
      <h1>AddUpdate</h1>
    </div>
  );
};

export default AddUpdate;
