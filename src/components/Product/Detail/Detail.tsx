import { FC, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Button, Card, List, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import "./css/Detail.less";
import { reducersType } from "../../../redux/reducers";
import { ProductListData } from "../../../redux/reducers/product_reducer";
import { reqProdById } from "../../../api";
import { BASE_URL } from "../../../config";

const { Item } = List;

const mapStateToProps = (state: reducersType) => ({
  productList: state.productList,
  categoryList: state.categoryList,
});

const mapDispatchToProps = {};

type DetailProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

const Detail: FC<DetailProps> = (props: DetailProps) => {
  const [productData, setProductData] = useState<ProductListData>({});
  const [productName, setproductName] = useState("");
  const match = useMatch("/admin/prud_about/product/detail/:id");
  const navigate = useNavigate();

  const getProductById = async (id: string) => {
    let result: any = await reqProdById(id);
    const { status, data, msg } = result;
    if (status === 0) {
      setProductData(data);
    } else {
      message.error(msg);
    }
  };

  useEffect(() => {
    const { id }: any = match?.params;
    const reduxList = props.productList;
    if (reduxList.length) {
      let result = reduxList.find((item) => {
        return item._id === id;
      }) as ProductListData;
      if (result) {
        setProductData(result);
      }
    } else {
      getProductById(id);
    }
  }, []);

  useEffect(() => {
    const reduxCategoryList = props.categoryList;
    if (reduxCategoryList.length) {
      let result: any = reduxCategoryList.find((item: any) => {
        return item._id === productData.categoryId;
      });
      setproductName(result.name);
    }
  }, [productData]);

  return (
    <Card
      title={
        <div className="left-top">
          <Button
            type="link"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftOutlined style={{ fontSize: "20px" }}></ArrowLeftOutlined>
          </Button>
          <span>商品详情</span>
        </div>
      }
    >
      <List>
        <Item>
          <span className="prod">商品名称: </span>
          <span>{productData.name}</span>
        </Item>
        <Item>
          <span className="prod">商品描述: </span>
          <span>{productData.desc}</span>
        </Item>
        <Item>
          <span className="prod">商品价格: </span>
          <span>{productData.price}</span>
        </Item>
        <Item>
          <span className="prod">所属分类: </span>
          <span>{productName}</span>
        </Item>
        <Item>
          <span className="prod">商品图片: </span>
          {productData.imgs == null
            ? ""
            : (productData.imgs as []).map((item: unknown, index: number) => {
                return (
                  <img
                    key={index}
                    src={`${BASE_URL}/upload/${item}`}
                    alt="商品图片"
                  />
                );
              })}
        </Item>
        <Item>
          <span className="prod-detail">商品详情: </span>
          <span dangerouslySetInnerHTML={{ __html: productData.detail }}></span>
        </Item>
      </List>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
