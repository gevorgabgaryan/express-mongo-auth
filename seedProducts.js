import mongoose from 'mongoose';
import ProductModel from './api/models/ProductModel';
import config from './config';

const seedProducts = async () => {
 try{
  await mongoose.connect(`${config.mongoDB.url}/EXPRESS_APP_AUTH`);
  console.log('Connected to MongoDB');

  const products = Array.from({ length: 20 }).map((_, index) => ({
    sku: `SKU${index}`,
    name: `Product ${index}`,
    price: Math.floor(Math.random() * 150) + 50, // Prices between 50 and 200
    discountPercentage: Math.floor(Math.random() * 30), // Discounts between 0% and 30%
    count: Math.floor(Math.random() * 100), // Count between 0 and 100
    countՕfSold: Math.floor(Math.random() * 50), // Count of sold items between 0 and 50
    isVisible: true
  }));

  ProductModel.insertMany(products)
    .then(() => {
      console.log('Products seeded successfully');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error seeding products:', err);
      mongoose.connection.close();
    });
 }catch(e) {
  console.log(e)
 }
};

seedProducts();