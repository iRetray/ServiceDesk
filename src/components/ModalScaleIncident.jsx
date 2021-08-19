import React, { Fragment, useEffect, useState } from "react";
import { Button, Space, message, Modal, Select } from "antd";

import AppService from "../services/AppService";
import moment from "moment";

const { Option } = Select;

const ModalScaleIncident = ({
  isOpen,
  setIsOpen,
  incidents,
  incidentSelected,
  getIncidents,
  id,
  setIncidentSelected,
  customers,
}) => {
  const [customerSelected, setCustomerSelected] = useState(null);
  const [incidentsType, setIncidentsType] = useState(null);

  useEffect(() => {
    getTypeIncidents();
  }, []);

  const getTypeIncidents = () => {
    AppService.getIncidentsType().then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        delete response.networkCode;
        setIncidentsType(Object.values(response));
      }
    });
  };

  const scaleIncident = () => {
    const issueSelected = {
      ...incidents.find((incident) => incident.id === id),
      status: "SCALED",
      registerDate: moment().valueOf(),
      employeeId: customerSelected,
      incidentTypeId: incidentSelected,
    };
    AppService.saveNewIncident(issueSelected).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        message.success("Issue escalado correctamente");
        getIncidents();
        setIsOpen(false);
      }
    });
  };

  return (
    <Fragment>
      <Modal
        title="Escalar incidente"
        visible={isOpen}
        onOk={() => {
          scaleIncident();
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
        footer={null}
      >
        <Space>
          <span>Tipo de incidente:</span>
          <Select
            style={{ width: "200px" }}
            placeholder="Incidente"
            onChange={(newValue) => {
              setIncidentSelected(newValue);
            }}
            value={
              incidents?.find((incident) => incident.id === id)?.incidentTypeId
            }
            disabled
          >
            {incidentsType &&
              Array.isArray(incidentsType) &&
              incidentsType.map((incident, indexIteration) => (
                <Option key={indexIteration} value={incident.id}>
                  {incident.name}
                </Option>
              ))}
          </Select>
        </Space>
        <Space style={{ marginTop: "15px" }}>
          <span>Persona del incidente:</span>
          <Select
            style={{ width: "200px" }}
            placeholder="Incidente"
            onChange={(newValue) => {
              setCustomerSelected(newValue);
            }}
          >
            {customers &&
              Array.isArray(customers) &&
              customers.map((customer, indexIteration) => (
                <Option key={indexIteration} value={customer.id}>
                  {customer.name}
                </Option>
              ))}
          </Select>
        </Space>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            disabled={!customerSelected}
            onClick={scaleIncident}
          >
            Escalar al area técnica
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ModalScaleIncident;
