class AppService {
  verifyUserID = (userID) => {
    console.log("Verificando user ID ", userID);
  };
}

const myService = new AppService();
export default myService;
