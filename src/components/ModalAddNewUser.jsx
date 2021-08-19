import React, { Fragment, useState } from "react";
import { Space, Input, Button, Modal, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import AppService from "../services/AppService";

const ModalAddNewUser = ({ isOpen, setIsOpen, getCustomers }) => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    firstSurname: "",
    secondSurname: "",
    documentNumber: "",
    status: "ACTIVE",
    rolId: "",
  });

  const addNewUser = () => {
    AppService.addNewUser(userData).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        setIsOpen(false);
        getCustomers();
        message.success("Usuario creado correctamente");
      }
    });
  };

  return (
    <Fragment>
      <Modal
        style={{ maxWidth: "250px" }}
        title="Añadir nuevo usuario"
        visible={isOpen}
        footer={null}
        onCancel={() => {
          setIsOpen(false);
        }}
      >
        <Space direction="vertical">
          <Input
            placeholder="Nombre"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setUserData({ ...userData, name: event.target.value });
            }}
          />
          <Input
            placeholder="Primer apellido"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setUserData({ ...userData, firstSurname: event.target.value });
            }}
          />
          <Input
            placeholder="Segundo apellido"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setUserData({ ...userData, secondSurname: event.target.value });
            }}
          />
          <Input
            placeholder="Número de cédula"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setUserData({ ...userData, documentNumber: event.target.value });
            }}
          />
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Button
              type="primary"
              shape="round"
              icon={<UserAddOutlined />}
              disabled={
                userData.name.length === 0 ||
                userData.firstSurname.length === 0 ||
                userData.secondSurname.length === 0 ||
                userData.documentNumber.length === 0
              }
              onClick={addNewUser}
            >
              Crear usuario
            </Button>
          </div>
        </Space>
      </Modal>
    </Fragment>
  );
};

export default ModalAddNewUser;
