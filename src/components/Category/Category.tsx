import { FC, useEffect, useState, useRef } from "react";
import { Button, Card, message, Modal, Table, Form, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { reqAddCategory, reqCategoryList, reqUpdateCategory } from "../../api";
import { PAGE_SIZE } from "../../config";
import { RuleObject } from "antd/lib/form";
import { reducersType } from "../../redux/reducers";
import { createSaveCategoryListAction } from "../../redux/actions_creators/category_action";

const { Item } = Form;

const mapStateToProps = (state: reducersType) => ({});

const mapDispatchToProps = { saveCategory: createSaveCategoryListAction };

type CategoryProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

let initialTitle = "";
const Category: FC<CategoryProps> = (props: CategoryProps) => {
  const [categoryList, setCategoryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operType, setOperType] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [modalCurrentValue, setModalCurrentValue] = useState("");
  const form = Form.useForm()[0];
  const formRef: any = useRef();
  const columns: any = [
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "操作",
      key: "operator",
      render: (operatorData: any) => {
        return (
          <Button
            type="link"
            onClick={() => {
              initialTitle = operatorData.name;
              console.log(initialTitle);
              // form.resetFields(initialTitle);
              // if (formRef.current != undefined) {
              //   formRef.current.resetFields();
              // }
              showModal("update", operatorData);
            }}
          >
            修改分类
          </Button>
        );
      },
      width: "25%",
      align: "center",
    },
  ];

  const getCategoryList = async () => {
    let result: any = await reqCategoryList();
    setLoading(false);
    const { status, data, msg } = result;
    if (status === 0) {
      setCategoryList(data);
      props.saveCategory(data);
    } else {
      message.error(msg, 1);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  //Component Callback
  const toAdd = async (values: string) => {
    let result: any = await reqAddCategory(values);
    const { status, data, msg } = result;
    if (status === 0) {
      message.success("新增商品分类成功", 1);
      let newData = [data, ...categoryList] as any;
      setCategoryList(newData);
      form.resetFields();
      setIsModalOpen(false);
    } else if (status === 1) {
      message.error(msg, 1);
    }
  };

  const toUpdate = async (categoryObj: any) => {
    let result: any = await reqUpdateCategory(categoryObj);
    const { status, msg } = result;
    if (status === 0) {
      message.success("更新分类名称成功", 1);
      getCategoryList();
      form.resetFields();
      setIsModalOpen(false);
    } else if (status === 1) {
      message.error(msg, 1);
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((value) => {
        if (operType === "add") {
          console.log("add");
          toAdd(value.categoryName);
        } else if (operType === "update") {
          console.log("update");
          const categoryId = modalCurrentValue;
          const categoryName = value.categoryName;
          const categoryObj = { categoryId, categoryName };
          toUpdate(categoryObj);
        }
      })
      .catch((err) => {
        message.warning("表单输入有误,请检查", 1);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const showModal = (operator: string, data: any = null) => {
    setOperType(operator);
    if (data !== null) {
      setModalCurrentValue(data._id);
    }
    setIsModalOpen(true);
  };

  const inputValidator = (
    rule: RuleObject,
    value: string
  ): Promise<void | any> | void => {
    value = value.replaceAll(" ", "");
    if (!value) {
      return Promise.reject("请输入商品分类名称");
    }
    return Promise.resolve();
  };

  return (
    <>
      <Card
        extra={
          <Button
            type="primary"
            onClick={() => {
              showModal("add");
            }}
          >
            <PlusCircleOutlined></PlusCircleOutlined>添加
          </Button>
        }
        style={{ width: "100%" }}
      >
        <Table
          dataSource={categoryList}
          columns={columns}
          bordered
          rowKey={"_id"}
          pagination={{ pageSize: PAGE_SIZE, showQuickJumper: true }}
          loading={isLoading}
        />
      </Card>
      <Modal
        title={operType === "add" ? "新增商品" : "修改商品"}
        open={isModalOpen}
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          ref={formRef}
          initialValues={{ remember: false }}
          form={form}
        >
          <Item
            name="categoryName"
            initialValue={initialTitle}
            rules={[{ validator: inputValidator }]}
          >
            <Input placeholder="请输入商品分类名称" />
          </Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
