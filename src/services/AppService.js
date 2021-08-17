import axios from "axios";
class AppService {
  constructor() {
    axios.defaults.baseURL =
      "http://servicedesk-env.eba-fsitwpw8.us-east-2.elasticbeanstalk.com";
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
}

const myService = new AppService();
export default myService;
