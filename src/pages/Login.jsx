import React, { Fragment, useState, useEffect } from "react";
import { Typography, Input, Space, Button, message } from "antd";
import { FieldNumberOutlined, LoginOutlined } from "@ant-design/icons";

import AppService from "../services/AppService";

import logoApp from "../assets/logoImage.svg";

const { Title } = Typography;

const Login = ({ history }) => {
  const [cedula, setCedula] = useState();

  useEffect(() => {
    history.push({
      state: null,
    });
  }, [history]);

  const handleChange = (event) => {
    setCedula(event.target.value);
  };

  const verifyUserID = () => {
    AppService.verifyUserID(cedula).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        history.push({
          pathname:
            response.rolId === "CALL_CENTER" ? "/homeAdmin" : "homeUser",
          state: {
            user: response,
          },
        });
      } else {
        message.error("No se ha encontrado un usuario con la cédula indicada");
      }
    });
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
            size="large"
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
