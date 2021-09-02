import axios from "axios";
class AppService {
  constructor() {
    axios.defaults.baseURL = "https://service-desk-324604.uc.r.appspot.com";
  }

  sendGETRequest = (query) => {
    return axios.get(query).then((response) => {
      if (response && response.data) {
        return { ...response.data, networkCode: response.status };
      }
    });
  };

  sendPOSTRequest = (query, payload) => {
    return axios.post(query, payload).then((response) => {
      if (response && response.data) {
        return { ...response.data, networkCode: response.status };
      }
    });
  };

  verifyUserID = (userID) => {
    return this.sendGETRequest("/employee/find-by-document?document=" + userID);
  };

  getListOfIncidents = (employeeId) => {
    return this.sendGETRequest(
      "/incident/find-by-employee-id?employeeId=" + employeeId
    );
  };

  addNewUser = (newUser) => {
    return this.sendPOSTRequest("/customer/save", newUser);
  };

  getNumberOfPendings = (employeeId, status) => {
    return this.sendGETRequest(
      "/incident/count-by-employee-id/?employeeId=" +
        employeeId +
        "&status=" +
        status
    );
  };

  getIncidentsType = () => {
    return this.sendGETRequest("/incident-type/find-all");
  };

  getAllCustomers = () => {
    return this.sendGETRequest("/customer/find-all");
  };

  saveNewIncident = (newIssue) => {
    return this.sendPOSTRequest("/incident/save", newIssue);
  };

  getEmployeesByRol = (rolId) => {
    return this.sendGETRequest("/employee/find-by-rol/?rolId=" + rolId);
  };

  saveComputerToPerson = (computerSpecs) => {
    return this.sendPOSTRequest("/equipment/save", computerSpecs);
  };
}

const myService = new AppService();
export default myService;
