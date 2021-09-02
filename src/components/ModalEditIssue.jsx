import React, { Fragment, useEffect, useState } from "react";
import { Modal, Space, Input, Button, message } from "antd";

import AppService from "../services/AppService";

const { TextArea } = Input;

const ModalEditIssue = ({ isOpen, setIsOpen, issueToEdit, getIncidents }) => {
  const [preDiag, setPreDiag] = useState("");
  const [indagacion, setIndagacion] = useState();

  useEffect(() => {
    console.log("here");
    setPreDiag(issueToEdit?.preDiagnosis);
    setIndagacion(issueToEdit?.inquiry);
  }, [isOpen]);

  const updateIssue = () => {
    AppService.saveNewIncident({
      ...issueToEdit,
      preDiagnosis: preDiag,
      inquiry: indagacion,
    }).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        setIsOpen(false);
        message.success("Issue editado correctamente");
        getIncidents();
      }
    });
  };

  return (
    <Fragment>
      <Modal
        title="Editar issue"
        visible={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        footer={null}
      >
        <Space>
          <span>Persona asignada:</span>
          <Input
            style={{ width: "200px" }}
            value={issueToEdit?.customerName}
            disabled={true}
          />
        </Space>
        <Space style={{ marginTop: "15px" }}>
          <span>Descripción:</span>
          <Input
            style={{ width: "200px" }}
            value={issueToEdit?.description}
            disabled={true}
          />
        </Space>
        <Space style={{ marginTop: "15px" }}>
          <span>Prediagnóstico:</span>
          <TextArea
            rows={2}
            style={{ width: "300px" }}
            placeholder="Comentario para el prediagnóstico"
            value={preDiag}
            onChange={(newValue) => {
              setPreDiag(newValue.target.value);
            }}
          />
        </Space>
        <Space style={{ marginTop: "15px" }}>
          <span>Indagación:</span>
          <TextArea
            rows={2}
            style={{ width: "300px" }}
            placeholder="Comentario para la indagación"
            value={indagacion}
            onChange={(newValue) => {
              setIndagacion(newValue.target.value);
            }}
          />
        </Space>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" onClick={updateIssue}>
            Guardar
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ModalEditIssue;
