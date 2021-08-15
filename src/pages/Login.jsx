import React, { Fragment, useState } from "react";
import { Typography, Input, Space, Button } from "antd";
import { FieldNumberOutlined, LoginOutlined } from "@ant-design/icons";

import AppService from "../services/AppService";

import logoApp from "../assets/logoImage.svg";

const { Title } = Typography;

const Login = () => {
  const [cedula, setCedula] = useState();

  const handleChange = (event) => {
    setCedula(event.target.value);
  };

  const verifyUserID = () => {
    AppService.verifyUserID(cedula);
  };

  return (
    <Fragment>
      <div className="LoginMainContainer">
        <img src={logoApp} className="loginImage" alt="" />
        <Title style={{ marginBottom: "0px" }}>Service Desk</Title>
        <Title level={4} style={{ marginTop: "0px" }}>
          Servicio de atención
        </Title>

        <Space direction="vertical">
          <Input
            type="number"
            placeholder="Número de cedula"
            prefix={<FieldNumberOutlined />}
            style={{ maxWidth: "300px" }}
            onChange={handleChange}
          />
          <Button
            type="primary"
            shape="round"
            icon={<LoginOutlined />}
            onClick={verifyUserID}
          >
            Iniciar sesión
          </Button>
        </Space>
      </div>
    </Fragment>
  );
};

export default Login;
