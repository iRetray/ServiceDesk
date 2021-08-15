import React, { Fragment } from "react";
import { Typography, Table, Button } from "antd";
import {
  PlusOutlined,
  UserAddOutlined,
  EyeInvisibleOutlined,
  FieldTimeOutlined,
  CheckOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

import logoApp from "../assets/logoImage.svg";

const { Title, Text } = Typography;

const Home = () => {
  const dataSource = [
    {
      key: "1",
      name: "Issue de plataforma",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis consequat imperdiet. Aenean sed mollis eros. Duis elementum ut ligula sed interdum. Quisque lacinia eget dolor sit amet scelerisque. Sed faucibus placerat lacus, et placerat nibh suscipit nec. Aenean sed nisi dictum nisl luctus suscipit iaculis at lacus. Aliquam rutrum tincidunt nibh, ac iaculis nulla molestie at. Phasellus pharetra, neque a vulputate maximus, massa nulla volutpat metus, vitae luctus eros turpis non ex. Morbi a fringilla tortor. Maecenas gravida vitae justo eu ornare. Sed tempus est nec lectus dapibus, at lobortis ligula placerat. Aliquam aliquet sem est. Pellentesque vel volutpat diam.",
      state: "PENDING",
    },
    {
      key: "2",
      name: "Issue de plataforma",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis consequat imperdiet. Aenean sed mollis eros. Duis elementum ut ligula sed interdum. Quisque lacinia eget dolor sit amet scelerisque. Sed faucibus placerat lacus, et placerat nibh suscipit nec. Aenean sed nisi dictum nisl luctus suscipit iaculis at lacus. Aliquam rutrum tincidunt nibh, ac iaculis nulla molestie at. Phasellus pharetra, neque a vulputate maximus, massa nulla volutpat metus, vitae luctus eros turpis non ex. Morbi a fringilla tortor. Maecenas gravida vitae justo eu ornare. Sed tempus est nec lectus dapibus, at lobortis ligula placerat. Aliquam aliquet sem est. Pellentesque vel volutpat diam.",
      state: "SOLVED",
    },
    {
      key: "3",
      name: "Issue de plataforma",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis consequat imperdiet. Aenean sed mollis eros. Duis elementum ut ligula sed interdum. Quisque lacinia eget dolor sit amet scelerisque. Sed faucibus placerat lacus, et placerat nibh suscipit nec. Aenean sed nisi dictum nisl luctus suscipit iaculis at lacus. Aliquam rutrum tincidunt nibh, ac iaculis nulla molestie at. Phasellus pharetra, neque a vulputate maximus, massa nulla volutpat metus, vitae luctus eros turpis non ex. Morbi a fringilla tortor. Maecenas gravida vitae justo eu ornare. Sed tempus est nec lectus dapibus, at lobortis ligula placerat. Aliquam aliquet sem est. Pellentesque vel volutpat diam.",
      state: "SCALED",
    },
    {
      key: "4",
      name: "Issue de plataforma",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque mattis consequat imperdiet. Aenean sed mollis eros. Duis elementum ut ligula sed interdum. Quisque lacinia eget dolor sit amet scelerisque. Sed faucibus placerat lacus, et placerat nibh suscipit nec. Aenean sed nisi dictum nisl luctus suscipit iaculis at lacus. Aliquam rutrum tincidunt nibh, ac iaculis nulla molestie at. Phasellus pharetra, neque a vulputate maximus, massa nulla volutpat metus, vitae luctus eros turpis non ex. Morbi a fringilla tortor. Maecenas gravida vitae justo eu ornare. Sed tempus est nec lectus dapibus, at lobortis ligula placerat. Aliquam aliquet sem est. Pellentesque vel volutpat diam.",
      state: "SCALED",
    },
  ];

  const columns = [
    {
      title: "Título del issue",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "20%",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: "50%",
    },
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      align: "center",
      width: "15%",
      render: (state) =>
        state === "PENDING" ? (
          <Button
            icon={<FieldTimeOutlined />}
            shape="round"
            style={{ color: "#874d00", backgroundColor: "#faad14" }}
          >
            Pendiente
          </Button>
        ) : state === "SOLVED" ? (
          <Button
            icon={<CheckOutlined />}
            shape="round"
            style={{ color: "#135200", backgroundColor: "#52c41a" }}
          >
            Solucionado
          </Button>
        ) : (
          <Button
            icon={<ArrowUpOutlined />}
            shape="round"
            style={{ color: "#003a8c", backgroundColor: "#1890ff" }}
          >
            Escalado
          </Button>
        ),
    },
    {
      title: "Acciones",
      dataIndex: "address",
      key: "address",
      align: "center",
      width: "15%",
      render: () => (
        <Button shape="round" icon={<EyeInvisibleOutlined />}>
          Ocultar
        </Button>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="HomeMainContainer">
        <div className="topContainer">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logoApp} alt="" className="logoSmall" />
            <div style={{ minWidth: "200px" }}>
              <Title level={2} style={{ margin: "0px" }}>
                Service Desk
              </Title>
              <Text>
                Plataforma para <strong>Call Centers</strong>
              </Text>
            </div>
          </div>
          <div>
            <Button shape="round" icon={<UserAddOutlined />} size="large">
              Añadir usuario
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              style={{ marginLeft: "10px" }}
            >
              Añadir issue
            </Button>
          </div>
        </div>

        <div className="tableContainer">
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
        <div style={{ height: "50px" }} />
      </div>
    </Fragment>
  );
};

export default Home;
