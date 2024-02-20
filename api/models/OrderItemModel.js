import { DataTypes } from 'sequelize'

const OrderItemModel = (sequelize) => {
  const OrderItem = sequelize.define('OrderItem', {
    sku: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    }
  });
  return OrderItem;
}

export default OrderItemModel
