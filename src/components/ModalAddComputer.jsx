import React, { Fragment, useEffect, useState } from "react";
import { Space, Input, Button, Modal, Select, notification } from "antd";
import { SettingOutlined, DesktopOutlined } from "@ant-design/icons";

import AppService from "../services/AppService";

const { Option } = Select;

const ModalAddComputer = ({ isOpen, setIsOpen }) => {
  const [listUsers, setListUsers] = useState(null);
  const [computerData, setComputerData] = useState({
    id: "",
    motherBoard: "",
    ramCapacity: "",
    storage: "",
    processor: "",
    operatingSystem: "",
    status: "ACTIVE",
    customerId: "",
  });

  useEffect(() => {
    AppService.getAllCustomers().then((response) => {
      const isSuccess = response && response.networkCode === 200;
      delete response.networkCode;
      if (isSuccess) {
        setListUsers(Object.values(response));
      }
    });
  }, []);

  const saveComputer = () => {
    AppService.saveComputerToPerson(computerData).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        const { firstSurname, secondSurname } = listUsers.find(
          (user) => user.id === computerData.customerId
        );
        notification.success({
          description: (
            <span>
              Se ha asignado correctamente el Equipo a{" "}
              <strong>{`${firstSurname} ${secondSurname}`}</strong>
            </span>
          ),
          placement: "bottomRight",
        });
        setIsOpen(false);
      } else {
        notification.error({
          description: "Ha ocurrido un error al asignar el equipo",
          placement: "bottomRight",
        });
      }
    });
  };

  return (
    <Fragment>
      <Modal
        style={{ maxWidth: "350px" }}
        title="Asignar equipo"
        visible={isOpen}
        footer={null}
        onCancel={() => {
          setIsOpen(false);
        }}
      >
        <Space direction="vertical" style={{ width: "300px" }}>
          <Input
            prefix={<SettingOutlined />}
            placeholder="Motherboard"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setComputerData({
                ...computerData,
                motherBoard: event.target.value,
              });
            }}
          />

          <Input
            prefix={<SettingOutlined />}
            placeholder="Capacidad de RAM"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setComputerData({
                ...computerData,
                ramCapacity: event.target.value,
              });
            }}
          />

          <Input
            prefix={<SettingOutlined />}
            placeholder="Almacenamiento"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setComputerData({
                ...computerData,
                storage: event.target.value,
              });
            }}
          />

          <Input
            prefix={<SettingOutlined />}
            placeholder="Procesador"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setComputerData({
                ...computerData,
                processor: event.target.value,
              });
            }}
          />

          <Input
            prefix={<SettingOutlined />}
            placeholder="Sistema Operativo"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setComputerData({
                ...computerData,
                operatingSystem: event.target.value,
              });
            }}
          />

          <span>Persona dueña del equipo</span>
          <Select
            style={{ width: "300px" }}
            placeholder="Dueño"
            onChange={(newValue) => {
              setComputerData({
                ...computerData,
                customerId: newValue,
              });
            }}
          >
            {listUsers &&
              Array.isArray(listUsers) &&
              listUsers.map((user) => (
                <Option key={user.id} value={user.id}>
                  {`${user.name} ${user.secondSurname}`}
                </Option>
              ))}
          </Select>

          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Button
              type="primary"
              shape="round"
              icon={<DesktopOutlined />}
              disabled={
                computerData.motherBoard.length === 0 ||
                computerData.ramCapacity.length === 0 ||
                computerData.storage.length === 0 ||
                computerData.processor.length === 0 ||
                computerData.operatingSystem.length === 0 ||
                computerData.customerId.length === 0
              }
              onClick={saveComputer}
            >
              Asignar equipo a usuario
            </Button>
          </div>
        </Space>
      </Modal>
    </Fragment>
  );
};

export default ModalAddComputer;
