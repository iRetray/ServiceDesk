/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  Table,
  Button,
  Space,
  Popover,
  Badge,
  Avatar,
  message,
  Modal,
  Select,
} from "antd";
import {
  PlusOutlined,
  UserAddOutlined,
  FieldTimeOutlined,
  CheckOutlined,
  ArrowUpOutlined,
  PhoneTwoTone,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import ModalAddNewUser from "../components/ModalAddNewUser";
import ModalAddIssue from "../components/ModalAddIssue";

import AppService from "../services/AppService";
import moment from "moment";

const { Title, Text } = Typography;
const { Option } = Select;

const HomeAdmin = ({ history }) => {
  const [userData, setUserData] = useState(null);
  const [incidents, setIncidents] = useState(null);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);
  const [isOpenModalIssue, setIsOpenModalIssue] = useState(false);
  const [isOpenModalEscale, setIsOpenModalEscale] = useState(false);

  const [customers, setCustomers] = useState(null);
  const [id, setId] = useState(null);
  const [customerSelected, setCustomerSelected] = useState(null);
  const [incidentsType, setIncidentsType] = useState(null);

  const [incidentSelected, setIncidentSelected] = useState(null);

  useEffect(() => {
    doInitialValidation();
  }, [history]);

  useEffect(() => {
    getPeopleByRol();
  }, [incidentSelected]);

  const getPeopleByRol = () => {
    AppService.getEmployeesByRol(incidentSelected).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        delete response.networkCode;
        setCustomers(Object.values(response));
      }
    });
  };

  const doInitialValidation = () => {
    const thereIsUser = history.location?.state?.user;
    if (!thereIsUser) {
      history.push({
        pathname: "/",
      });
    } else {
      setUserData(thereIsUser);
      getIncidents(thereIsUser);
      getCustomers();
      getTypeIncidents();
    }
  };

  const getTypeIncidents = () => {
    AppService.getIncidentsType().then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        delete response.networkCode;
        setIncidentsType(Object.values(response));
      }
    });
  };

  const getIncidents = (currentUser) => {
    AppService.getListOfIncidents(currentUser.id).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        delete response.networkCode;
        setIncidents(Object.values(response));
      }
    });
  };

  const getCustomers = () => {
    AppService.getAllCustomers().then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        delete response.networkCode;
        setCustomers(Object.values(response));
      }
    });
  };

  const markAsResolved = (issueID) => {
    const issueSelected = {
      ...incidents.find((incident) => incident.id === issueID),
      status: "DISABLED",
      registerDate: "",
    };
    AppService.saveNewIncident(issueSelected).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        message.success("Issue desactivado correctamente");
        getIncidents(userData);
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
        getIncidents(userData);
        setIsOpenModalEscale(false);
      }
    });
  };

  const columns = [
    {
      title: "Persona asignada",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
      width: "20%",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: "50%",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "15%",
      render: (state) =>
        state === "PENDING" ? (
          <Button
            icon={<FieldTimeOutlined />}
            shape="round"
            style={{ color: "#874d00", backgroundColor: "#faad14" }}
          >
            Pendiente
          </Button>
        ) : state === "SOLVED" ? (
          <Button
            icon={<CheckOutlined />}
            shape="round"
            style={{ color: "#135200", backgroundColor: "#52c41a" }}
          >
            Solucionado
          </Button>
        ) : state === "DISABLED" ? (
          <Button
            icon={<ArrowUpOutlined />}
            shape="round"
            type="dashed"
            disabled={true}
          >
            Issue Desactivado
          </Button>
        ) : (
          <Button
            icon={<ArrowUpOutlined />}
            shape="round"
            style={{ color: "#003a8c", backgroundColor: "#1890ff" }}
          >
            Escalado
          </Button>
        ),
    },
    {
      title: "Escalar",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "15%",
      render: (id) => {
        const currentIncident = incidents.find(
          (incident) => incident.id === id
        );
        if (currentIncident.status === "PENDING") {
          return (
            <Button
              icon={<ArrowUpOutlined />}
              shape="round"
              style={{ color: "#003a8c", backgroundColor: "#1890ff" }}
              onClick={() => {
                setId(id);
                const currentNameIncident = incidentsType.find(
                  (oneIncident) =>
                    oneIncident.id === currentIncident.incidentTypeId
                );
                AppService.getEmployeesByRol(currentNameIncident.name).then(
                  (response) => {
                    const isSuccess = response && response.networkCode === 200;
                    if (isSuccess) {
                      delete response.networkCode;
                      setCustomers(Object.values(response));
                    }
                  }
                );
                setIsOpenModalEscale(true);
              }}
            >
              Escalar al area tecnica
            </Button>
          );
        }
      },
    },
    {
      title: "Acciones",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "15%",
      render: (id) => {
        if (
          incidents.find((incident) => incident.id === id).status === "DISABLED"
        ) {
          return (
            <Button
              icon={<ArrowUpOutlined />}
              shape="round"
              type="dashed"
              disabled={true}
            >
              Issue Desactivado
            </Button>
          );
        } else {
          return (
            <Button
              shape="round"
              icon={<CheckOutlined />}
              style={{ color: "#135200", backgroundColor: "#52c41a" }}
              onClick={() => {
                markAsResolved(id);
              }}
            >
              Marcar como resuelto
            </Button>
          );
        }
      },
    },
  ];

  return (
    <Fragment>
      <div className="HomeMainContainer">
        <div className="topContainer">
          <div style={{ display: "flex", alignItems: "center" }}>
            <PhoneTwoTone
              style={{ fontSize: "50px", marginRight: "10px", margin: "10px" }}
            />
            <div style={{ minWidth: "200px" }}>
              <Title level={2} style={{ marginBottom: "-10px" }}>
                Service Desk
              </Title>
              <Text>
                Plataforma para <strong>Call Centers</strong>
              </Text>
            </div>
          </div>

          <div>
            <Button
              shape="round"
              icon={<UserAddOutlined />}
              onClick={() => {
                setIsOpenModalUser(true);
              }}
            >
              Añadir usuario
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setIsOpenModalIssue(true);
              }}
            >
              Añadir issue
            </Button>
          </div>

          <div>
            <Popover
              content={
                <Button
                  type="primary"
                  danger
                  icon={<LogoutOutlined />}
                  onClick={() => {
                    history.push({
                      pathname: "/",
                      state: null,
                    });
                  }}
                >
                  Cerrar sesión
                </Button>
              }
              placement="left"
              trigger="click"
            >
              <Space
                style={{
                  padding: "12px 15px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                <Space
                  direction="vertical"
                  style={{
                    gap: "0px",
                    marginRight: "10px",
                  }}
                >
                  <Title level={5} style={{ marginBottom: "-10px" }}>
                    {`${userData?.name} ${userData?.firstSurname} ${userData?.secondSurname}`}
                  </Title>
                  <span>{userData?.rolId}</span>
                </Space>

                <Badge
                  dot
                  style={{
                    backgroundColor: "#52c41a",
                    width: "12px",
                    height: "12px",
                  }}
                >
                  <Avatar icon={<UserOutlined />} shape="circle" size="large" />
                </Badge>
              </Space>
            </Popover>
          </div>
        </div>

        <div className="tableContainer">
          <Table dataSource={incidents} columns={columns} pagination={false} />
        </div>
        <div style={{ height: "50px" }} />
      </div>
      <ModalAddNewUser
        isOpen={isOpenModalUser}
        setIsOpen={setIsOpenModalUser}
      />
      <ModalAddIssue
        employeeId={userData?.id}
        isOpen={isOpenModalIssue}
        setIsOpen={setIsOpenModalIssue}
        userData={userData}
        getIncidents={getIncidents}
      />
      <Modal
        title="Escalar incidente"
        visible={isOpenModalEscale}
        onOk={() => {
          scaleIncident();
        }}
        onCancel={() => {
          setIsOpenModalEscale(false);
        }}
        footer={null}
      >
        <Space>
          <span>Tipo de incidente:</span>
          <Select
            style={{ width: "200px" }}
            placeholder="Incidente"
            onChange={(newValue) => {
              console.log("cambio el select");
              setIncidentSelected(newValue);
            }}
            value={
              incidents?.find((incident) => incident.id === id)?.incidentTypeId
            }
            disabled
          >
            {incidentsType &&
              Array.isArray(incidentsType) &&
              incidentsType.map((incident) => (
                <Option key={incident.id} value={incident.id}>
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
              customers.map((customer) => (
                <Option key={customer.id} value={customer.id}>
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

export default HomeAdmin;
