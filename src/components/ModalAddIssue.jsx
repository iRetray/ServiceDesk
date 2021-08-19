/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Space, Input, Button, Modal, message, Select } from "antd";
import { BugOutlined } from "@ant-design/icons";
import moment from "moment";

import AppService from "../services/AppService";

const { TextArea } = Input;
const { Option } = Select;

const ModalAddIssue = ({
  employeeId,
  isOpen,
  setIsOpen,
  userData,
  getIncidents,
  customers,
  getCustomers,
}) => {
  const [issueData, setIssueData] = useState({
    id: "",
    registerDate: "",
    description: "",
    status: "PENDING",
    incidentTypeId: "",
    employeeId: "",
    customerId: "",
  });

  const [incidentsType, setIncidentsType] = useState(null);

  useEffect(() => {
    setIssueData({
      ...issueData,
      registerDate: moment().valueOf(),
      employeeId: employeeId,
    });
    getIncidentsType();
    getCustomers();
  }, [employeeId]);

  const getIncidentsType = () => {
    AppService.getIncidentsType().then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        delete response.networkCode;
        setIncidentsType(Object.values(response));
      }
    });
  };

  const addNewIssue = () => {
    AppService.saveNewIncident(issueData).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        setIsOpen(false);
        message.success("Issue creado correctamente");
        getIncidents(userData);
      }
    });
  };

  return (
    <Fragment>
      <Modal
        style={{ maxWidth: "350px" }}
        title="Añadir nuevo issue"
        visible={isOpen}
        footer={null}
        onCancel={() => {
          setIsOpen(false);
        }}
      >
        <Space direction="vertical">
          <TextArea
            placeholder="Descripción del problema"
            style={{ width: "300px" }}
            onChange={(event) => {
              setIssueData({ ...issueData, description: event.target.value });
            }}
          />
          <Space>
            <span>Tipo de incidente:</span>
            <Select
              style={{ width: "150px" }}
              placeholder="Incidente"
              onChange={(newValue) => {
                setIssueData({
                  ...issueData,
                  incidentTypeId: newValue,
                });
              }}
            >
              {incidentsType &&
                Array.isArray(incidentsType) &&
                incidentsType.map((incident) => (
                  <Option key={incident.id} value={incident.name}>
                    {incident.name}
                  </Option>
                ))}
            </Select>
          </Space>
          <Space>
            <span>Persona del incidente:</span>
            <Select
              style={{ width: "150px" }}
              placeholder="Incidente"
              onChange={(newValue) => {
                setIssueData({
                  ...issueData,
                  customerId: newValue,
                });
              }}
            >
              {customers &&
                Array.isArray(customers) &&
                customers.map((customer) => (
                  <Option key={customer.id} value={customer.id}>
                    {customer.name}
                  </Option>
                ))}
            </Select>
          </Space>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Button
              type="primary"
              shape="round"
              icon={<BugOutlined />}
              disabled={
                issueData.description.length === 0 ||
                issueData.incidentTypeId.length === 0 ||
                issueData.customerId.length === 0
              }
              onClick={addNewIssue}
            >
              Crear issue
            </Button>
          </div>
        </Space>
      </Modal>
    </Fragment>
  );
};

export default ModalAddIssue;
