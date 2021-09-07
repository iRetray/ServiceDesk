import React, { Fragment, useState } from "react";
import { Input, Button, Modal } from "antd";

const { TextArea } = Input;

const ModalResolve = ({ isOpen, setIsOpen, id, markAsResolved }) => {
  const [atencion, setAtencion] = useState("");

  return (
    <Fragment>
      <Modal
        title="Marcar como finalizado"
        visible={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        footer={null}
        width={350}
      >
        <TextArea
          placeholder="Atención al incidente"
          style={{ width: "300px" }}
          onChange={(event) => {
            setAtencion(event.target.value);
          }}
        />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            type="primary"
            onClick={() => {
              markAsResolved(id, atencion);
              setIsOpen(false);
            }}
          >
            Guardar
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ModalResolve;
