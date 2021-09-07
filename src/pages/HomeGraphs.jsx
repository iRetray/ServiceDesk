/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import {
  Typography,
  Button,
  Avatar,
  Space,
  Popover,
  DatePicker,
  Select,
} from "antd";
import { UserOutlined, FundTwoTone, LogoutOutlined } from "@ant-design/icons";

import AppService from "../services/AppService";
import Graph from "./graphs/Graph";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const dataDefault = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const graphsList = [
  {
    value: "USERS",
    texto: "Reportes por usuario",
    graph: (graphData) => <Graph data={graphData?.customers} />,
  },
  {
    value: "EMPLOYEES",
    texto: "Empleados con más reportes",
    graph: (graphData) => <Graph data={graphData?.employees} />,
  },
  {
    value: "EQUIPMENT",
    texto: "Equipos con más reportes",
    graph: (graphData) => <Graph data={graphData?.equipment} />,
  },
  {
    value: "TYPES",
    texto: "Tipos de incidentes más reportados",
    graph: (graphData) => <Graph data={graphData?.incidentTypes} />,
  },
];

const HomeGraphs = ({ history }) => {
  const [userData, setUserData] = useState(null);
  const [initialDate, setInitialDate] = useState(1609480483128);
  const [finalDate, setFinalDate] = useState(1640930083128);
  const [graphData, setGraphData] = useState({
    customers: null,
    employees: null,
    equipment: null,
    incidentTypes: null,
  });
  const [selectedGraph, setSelectedGraph] = useState("USERS");

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
      getGraphData(initialDate, finalDate);
    }
  };

  const getGraphData = (myInitialDate, myFinalDate) => {
    AppService.getGraphInformation(myInitialDate, myFinalDate).then(
      (response) => {
        const isSuccess = response && response.networkCode === 200;
        if (isSuccess) {
          delete response.networkCode;
          const { customers, employees, equipment, incidentTypes } = response;
          setGraphData({
            customers: {
              ...dataDefault,
              labels: customers.map(
                ({ name, firstSurname }) => name + " " + firstSurname
              ),
              datasets: [
                {
                  ...dataDefault.datasets[0],
                  label: "cantidad de reportes",
                  data: customers.map(({ reportNumber }) => reportNumber),
                },
              ],
            },
            employees: {
              ...dataDefault,
              labels: employees.map(
                ({ name, firstSurname }) => name + " " + firstSurname
              ),
              datasets: [
                {
                  ...dataDefault.datasets[0],
                  label: "cantidad de reportes",
                  data: employees.map(({ reportNumber }) => reportNumber),
                },
              ],
            },
            equipment: {
              ...dataDefault,
              labels: equipment.map(({ id }) => "Equipo: " + id),
              datasets: [
                {
                  ...dataDefault.datasets[0],
                  label: "cantidad de reportes",
                  data: equipment.map(({ reportNumber }) => reportNumber),
                },
              ],
            },
            incidentTypes: {
              ...dataDefault,
              labels: incidentTypes.map(({ name }) => name),
              datasets: [
                {
                  ...dataDefault.datasets[0],
                  label: "cantidad de reportes",
                  data: incidentTypes.map(({ reportNumber }) => reportNumber),
                },
              ],
            },
          });
        }
      }
    );
  };

  return (
    <Fragment>
      <div className="HomeMainContainer">
        <div className="topContainer">
          <div style={{ display: "flex", alignItems: "center" }}>
            <FundTwoTone
              style={{ fontSize: "50px", marginRight: "10px", margin: "10px" }}
            />
            <div style={{ minWidth: "200px" }}>
              <Title level={2} style={{ marginBottom: "-10px" }}>
                Service Desk
              </Title>
              <Text>
                Plataforma para <strong>Administradores</strong>
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

                <Avatar icon={<UserOutlined />} shape="circle" size="large" />
              </Space>
            </Popover>
          </div>
        </div>
        <div style={{ margin: "30px" }}>
          <div style={{ textAlign: "center" }}>
            <Select
              value={selectedGraph}
              style={{ width: 300, marginRight: "25px" }}
              onChange={(newValue) => setSelectedGraph(newValue)}
            >
              {graphsList.map(({ value, texto }) => (
                <Option value={value}>{texto}</Option>
              ))}
            </Select>
            <RangePicker
              onChange={(newDate) => {
                if (newDate) {
                  setInitialDate(newDate[0].valueOf());
                  setFinalDate(newDate[1].valueOf());
                  getGraphData(newDate[0].valueOf(), newDate[1].valueOf());
                } else {
                  setInitialDate(1609480483128);
                  setFinalDate(1640930083128);
                  getGraphData(1609480483128, 1640930083128);
                }
              }}
            />
          </div>
          <div>
            <div style={{ maxWidth: "800px", margin: "auto" }}>
              <p style={{ fontSize: "20px", marginTop: "25px" }}>
                {
                  graphsList.find((graph) => graph.value === selectedGraph)
                    .texto
                }
              </p>
              {graphsList
                .find((graph) => graph.value === selectedGraph)
                .graph(graphData)}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeGraphs;
