/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Modal, Space, Input, Button, message } from "antd";

import AppService from "../services/AppService";

const { TextArea } = Input;

const ModalEditIssue = ({
  isClient,
  isOpen,
  setIsOpen,
  issueToEdit,
  getIncidents,
}) => {
  const [preDiag, setPreDiag] = useState("");
  const [indagacion, setIndagacion] = useState();
  const [attentionIncident, setAttentionIncident] = useState("");

  useEffect(() => {
    setPreDiag(issueToEdit?.preDiagnosis);
    setIndagacion(issueToEdit?.inquiry);
  }, [isOpen]);

  const updateIssue = () => {
    AppService.saveNewIncident({
      ...issueToEdit,
      preDiagnosis: preDiag,
      inquiry: indagacion,
      attentionIncident,
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
        {isClient && (
          <Space style={{ marginTop: "15px" }}>
            <span>Atención al incidente:</span>
            <TextArea
              rows={2}
              style={{ width: "300px" }}
              placeholder="Comentario para la Atención al incidente"
              value={attentionIncident}
              onChange={(newValue) => {
                setAttentionIncident(newValue.target.value);
              }}
            />
          </Space>
        )}
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
