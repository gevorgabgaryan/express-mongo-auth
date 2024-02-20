import models from "../models/sequelize";
import { startSession } from "mongoose";
import BasketService from "./BasketService";
import config from "../../config";
import ProductService from "./ProductService";
import UserModel from "../models/UserModel";

class OrderService {
  constructor(sequelize) {
    models(sequelize);
    this.client = sequelize;
    this.models = sequelize.models;
  }

  async add(userId) {
    const session = await startSession();
    session.startTransaction();

    try {
      const basket = new BasketService(config.redis.client, userId);
      const basketProducts = await basket.getAll();

      const products = await Promise.all(
        Object.keys(basketProducts).map(async (key) => {
          const product = await ProductService.getProduct(key);
          return {
            sku: product.sku,
            qty: basketProducts[key],
            price: product.price,
            name: product.name,
          };
        }),
      );

      if (!products.length) {
        throw new Error(`Products not found`);
      }

      let order;

      await this.inTransaction(async (t) => {
        order = await this.create(userId, products, t);

        await UserModel.updateOne(
          { _id: userId },
          { $push: { orders: order.id } },
          { session }
        );
      });

      await session.commitTransaction();
      await basket.empty();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async inTransaction(work) {
    const t = await this.client.transaction();
    try {
      await work(t);
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async create(userId, items, t) {
    try{
      const order = await this.models.Order.create(
        {
          userId: userId,
          status: "Not Shipped"
        },
        { transaction: t },
      );

      await Promise.all(
        items.map((item) =>
          this.models.OrderItem.create(
            {
              orderId: order.id,
              sku: item.sku,
              qty: item.qty,
              price: item.price,
              name: item.name,

            },
            { transaction: t }
          )
        )
      );

      return order;
     } catch(e) {
        console.log(e)
        throw e;
     }
  }

  async getAll() {
    return this.models.Order.findAll({
      include: [this.models.OrderItem],
    });
  }

  async setStatus(orderId, status) {
    return this.models.Order.update(
      { status },
      { where: { id: orderId } }
    );
  }
}

export default OrderService;