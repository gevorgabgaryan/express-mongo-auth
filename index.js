import API from "./api";
import MongooseService from "./database/MongooseService";
import RedisService from "./database/RedisService";

(async () => {
    await MongooseService.init();
    await RedisService.init();
    await API.init();
})();