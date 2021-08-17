/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Typography, Table, Button, Badge, Avatar, Space, Popover } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  FieldTimeOutlined,
  CheckOutlined,
  ArrowUpOutlined,
  SettingTwoTone,
  LogoutOutlined,
} from "@ant-design/icons";

import ModalAddNewUser from "../components/ModalAddNewUser";
import AppService from "../services/AppService";

const { Title, Text } = Typography;

const HomeUser = ({ history }) => {
  const [userData, setUserData] = useState(null);
  const [incidents, setIncidents] = useState(null);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);

  useEffect(() => {
    doInitialValidation();
  }, [history]);

  const doInitialValidation = () => {
    const thereIsUser = history.location?.state?.user;
    if (!thereIsUser) {
      history.push({
        pathname: "/",
      });
    } else {
      setUserData(thereIsUser);
      getIncidents(thereIsUser);
    }
  };

  const getIncidents = (currentUser) => {
    AppService.getListOfIncidents(currentUser.id).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        delete response.networkCode;
        setIncidents(response);
      }
    });
  };

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
            <SettingTwoTone
              style={{ fontSize: "50px", marginRight: "10px", margin: "10px" }}
            />
            <div style={{ minWidth: "200px" }}>
              <Title level={2} style={{ marginBottom: "-10px" }}>
                Service Desk
              </Title>
              <Text>
                Plataforma para <strong>Técnicos</strong>
              </Text>
            </div>
          </div>
          <div>
            <Popover
              content={
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={() => {
                    history.push({
                      pathname: "/",
                      state: null,
                    });
                  }}
                >
                  Cerrar sesión
                </Button>
              }
              placement="left"
              trigger="click"
            >
              <Space
                style={{
                  padding: "12px 15px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <Space
                  direction="vertical"
                  style={{
                    marginRight: "10px",
                  }}
                >
                  <Title level={5} style={{ marginBottom: "-5px" }}>
                    {`${userData?.name} ${userData?.firstSurname} ${userData?.secondSurname}`}
                  </Title>
                  <span>{userData?.rolId}</span>
                </Space>

                <Badge count={1}>
                  <Avatar icon={<UserOutlined />} shape="circle" size="large" />
                </Badge>
              </Space>
            </Popover>
          </div>
        </div>

        <div className="tableContainer">
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
        <div style={{ height: "50px" }} />
      </div>

      <ModalAddNewUser
        isOpen={isOpenModalUser}
        setIsOpen={setIsOpenModalUser}
      />
    </Fragment>
  );
};

export default HomeUser;
