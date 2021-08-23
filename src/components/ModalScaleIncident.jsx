import React, { Fragment, useEffect, useState } from "react";
import { Button, Space, message, Modal, Select, Input } from "antd";

import AppService from "../services/AppService";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const ModalScaleIncident = ({
  isOpen,
  setIsOpen,
  incidents,
  incidentSelected,
  getIncidents,
  id,
  setIncidentSelected,
  customers,
  enableSelector,
  updateEmployees,
}) => {
  const [customerSelected, setCustomerSelected] = useState(null);
  const [incidentsType, setIncidentsType] = useState(null);
  const [comment, setComment] = useState("");

  const [selectedType, setSelectedType] = useState("");

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
    const currentIncident = incidents.find((incident) => incident.id === id);
    console.log(currentIncident);
    const issueSelected = {
      ...currentIncident,
      status: "SCALED",
      registerDate: moment().valueOf(),
      employeeId: customerSelected,
      incidentTypeId: enableSelector
        ? incidentsType?.find((incident) => incident.id === selectedType).name
        : incidentSelected,
      comment: comment,
      levelScaled: currentIncident.levelScaled + 1,
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
              setSelectedType(newValue);
              updateEmployees(
                incidentsType?.find((incident) => incident.id === newValue).name
              );
            }}
            value={
              enableSelector
                ? selectedType !== ""
                  ? selectedType
                  : incidents?.find((incident) => incident.id === id)
                      ?.incidentTypeId
                : null
            }
            disabled={!enableSelector}
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
        <center>
          <TextArea
            rows={4}
            maxLength={250}
            placeholder="Comentario para el issue"
            style={{ maxWidth: "300px", marginTop: "10px" }}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
        </center>
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
