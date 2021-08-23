import React, { Fragment, useEffect, useState } from "react";
import { Space, Input, Button, Modal } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ModalComment = ({ issueID, isOpen, closeModal, type, finalFunction }) => {
  const [isForResolve, setIsForResolve] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (type !== "") {
      setIsForResolve(type === "RESOLVED");
    }
  }, [type]);

  return (
    <Fragment>
      <Modal
        style={{ maxWidth: "280px" }}
        title="Añadir comentario"
        visible={isOpen}
        footer={null}
        onCancel={() => {
          closeModal();
        }}
      >
        <Space direction="vertical">
          <TextArea
            rows={4}
            maxLength={250}
            placeholder="Comentario para el issue"
            style={{ maxWidth: "300px" }}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Button
              type="primary"
              shape="round"
              icon={<UserAddOutlined />}
              disabled={comment.length === 0}
              onClick={() => {
                finalFunction(issueID, comment);
                closeModal();
              }}
            >
              {isForResolve ? "Marcar issue como resuelto" : "Escalar issue"}
            </Button>
          </div>
        </Space>
      </Modal>
    </Fragment>
  );
};

export default ModalComment;
