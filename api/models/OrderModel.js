import { DataTypes } from 'sequelize'

const OrderModel = (sequelize) => {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });
  return Order;
}


export default OrderModel
