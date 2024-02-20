import API from "./api";
import MongooseService from "./database/MongooseService";
import RedisService from "./database/RedisService";
import SequelizeService from "./database/SequelizeService";

(async () => {
    await MongooseService.init();
    await RedisService.init();
    await SequelizeService.init();
    await API.init();
})();