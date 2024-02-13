import API from "./api";
import MongooseService from "./database/MongooseService";

(async () => {
    await MongooseService.init();
    await API.init();
})();