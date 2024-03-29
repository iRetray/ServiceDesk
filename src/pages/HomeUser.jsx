/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  Table,
  Button,
  Badge,
  Avatar,
  Space,
  Popover,
  message,
} from "antd";
import {
  UserOutlined,
  FieldTimeOutlined,
  CheckOutlined,
  ArrowUpOutlined,
  SettingTwoTone,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";

import ModalAddNewUser from "../components/ModalAddNewUser";
import ModalScaleIncident from "../components/ModalScaleIncident";
import ModalEditIssue from "../components/ModalEditIssue";

import AppService from "../services/AppService";

import moment from "moment";
import ModalResolve from "../components/ModalResolve";
moment.updateLocale("es", {
  months:
    "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
      "_"
    ),
  monthsShort:
    "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split("_"),
  weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
  weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
});
moment.locale("es");

const { Title, Text } = Typography;

const HomeUser = ({ history }) => {
  const [userData, setUserData] = useState(null);
  const [pendings, setPendings] = useState(null);
  const [incidents, setIncidents] = useState(null);
  const [isOpenModalUser, setIsOpenModalUser] = useState(false);

  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [issueToEdit, setIssueToEdit] = useState(null);

  const [customers, setCustomers] = useState(null);
  const [id, setId] = useState(null);

  const [incidentSelected, setIncidentSelected] = useState(null);

  const [isOpenModalEscale, setIsOpenModalEscale] = useState(false);

  const [isOpenModalResolved, setIsOpenModalResolved] = useState(false);
  const [idResolve, setIdResolve] = useState("");

  useEffect(() => {
    doInitialValidation();
  }, [history]);

  const doInitialValidation = () => {
    const thereIsUser = history.location?.state?.user;
    if (!thereIsUser) {
      history.push({
        pathname: "/",
      });
    } else {
      setUserData(thereIsUser);
      getIncidents(thereIsUser);
      getPendingsNumber(thereIsUser);
    }
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

  const getPendingsNumber = (currentUser) => {
    AppService.getNumberOfPendings(currentUser.id, "ACTIVE").then(
      (response) => {
        const isSuccess = response && response.networkCode === 200;
        if (isSuccess) {
          setPendings(response.incidentsNumber);
        }
      }
    );
  };

  const markAsResolved = (issueID, attentionIncident) => {
    const issueSelected = {
      ...incidents.find((incident) => incident.id === issueID),
      status: "DISABLED",
      registerDate: "",
      attentionIncident: attentionIncident,
    };
    AppService.saveNewIncident(issueSelected).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        message.success("Issue desactivado correctamente");
        getIncidents(userData);
      }
    });
  };

  const updateEmployees = (newRol) => {
    AppService.getEmployeesByRol(newRol).then((response) => {
      const isSuccess = response && response.networkCode === 200;
      if (isSuccess) {
        delete response.networkCode;
        setCustomers(Object.values(response));
      }
    });
  };

  const columns = [
    {
      title: "Dueño del issue",
      dataIndex: "customerName",
      key: "customerName",
      align: "center",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Comentario",
      dataIndex: "comment",
      key: "comment",
      align: "center",
    },
    {
      title: "Indagación",
      dataIndex: "inquiry",
      key: "inquiry",
      align: "center",
    },
    {
      title: "Prediagnóstico",
      dataIndex: "preDiagnosis",
      key: "preDiagnosis",
      align: "center",
    },
    {
      title: "Atención al incidente",
      dataIndex: "attentionIncident",
      key: "attentionIncident",
      align: "center",
    },
    {
      title: "Fecha de creación",
      dataIndex: "registerDate",
      key: "registerDate",
      align: "center",
      render: (registerDate) => (
        <span>
          <span>{moment(registerDate).format("MMMM DD YYYY")}</span>
          <br />
          <span>{moment(registerDate).format("h:mm a")}</span>
        </span>
      ),
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      align: "center",
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
      render: (id) => {
        const currentIncident = incidents.find(
          (incident) => incident.id === id
        );
        if (
          currentIncident.status === "SCALED" ||
          currentIncident.status === "ACTIVE"
        ) {
          return (
            <Button
              icon={<ArrowUpOutlined />}
              shape="round"
              style={{ color: "#003a8c", backgroundColor: "#1890ff" }}
              disabled={currentIncident.levelScaled >= 2}
              onClick={() => {
                setId(id);
                AppService.getEmployeesByRol(
                  currentIncident.incidentTypeId
                ).then((response) => {
                  const isSuccess = response && response.networkCode === 200;
                  if (isSuccess) {
                    delete response.networkCode;
                    setCustomers(Object.values(response));
                  }
                });
                setIncidentSelected(currentIncident.incidentTypeId);

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
                setIdResolve(id);
                setIsOpenModalResolved(true);
              }}
            >
              Marcar como resuelto
            </Button>
          );
        }
      },
    },
    {
      title: "Editar",
      align: "center",
      dataIndex: "id",
      render: (id, object) => {
        return (
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setIssueToEdit(object);
              setIsOpenModalEdit(true);
            }}
          />
        );
      },
    },
  ];

  return (
    <Fragment>
      <div className="HomeMainContainer">
        <div className="topContainer">
          <div style={{ display: "flex", alignItems: "center" }}>
            <SettingTwoTone
              style={{ fontSize: "50px", marginRight: "10px", margin: "10px" }}
            />
            <div style={{ minWidth: "200px" }}>
              <Title level={2} style={{ marginBottom: "-10px" }}>
                Service Desk
              </Title>
              <Text>
                Plataforma para <strong>Técnicos</strong>
              </Text>
            </div>
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
                    marginRight: "10px",
                  }}
                >
                  <Title level={5} style={{ marginBottom: "-15px" }}>
                    {`${userData?.name} ${userData?.firstSurname} ${userData?.secondSurname}`}
                  </Title>
                  <span>{userData?.rolId}</span>
                </Space>

                <Badge count={pendings}>
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
      <ModalScaleIncident
        isClient={true}
        isOpen={isOpenModalEscale}
        setIsOpen={setIsOpenModalEscale}
        incidents={incidents}
        incidentSelected={incidentSelected}
        getIncidents={() => getIncidents(userData)}
        id={id}
        setIncidentSelected={setIncidentSelected}
        customers={customers}
        enableSelector={true}
        updateEmployees={updateEmployees}
      />
      <ModalEditIssue
        isClient={true}
        isOpen={isOpenModalEdit}
        setIsOpen={setIsOpenModalEdit}
        issueToEdit={issueToEdit}
        getIncidents={() => getIncidents(userData)}
      />
      <ModalResolve
        isOpen={isOpenModalResolved}
        setIsOpen={setIsOpenModalResolved}
        id={idResolve}
        markAsResolved={markAsResolved}
      />
    </Fragment>
  );
};

export default HomeUser;
