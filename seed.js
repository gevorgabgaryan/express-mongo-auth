import mongoose from 'mongoose';
import UserModel from './api/models/UserModel';
import config from './config';

const users = [
    {
        "firstName": "Vickie",
        "lastName": "Miller",
        "email": "cheyennebrown@lin-may.com",
        "password": "_^Boe2zHQ9Mv",
        "age": 27
      },
      {
        "firstName": "Amanda",
        "lastName": "Young",
        "email": "megan91@yahoo.com",
        "password": "04kUYocP(BTt",
        "age": 76
      },
      {
        "firstName": "Frank",
        "lastName": "Powell",
        "email": "martinkatherine@gmail.com",
        "password": "bj7vt^ph^@RS",
        "age": 71
      },
      {
        "firstName": "Matthew",
        "lastName": "Castillo",
        "email": "ewilson@yahoo.com",
        "password": "Ur3@GsRpw(+E",
        "age": 24
      },
      {
        "firstName": "Erin",
        "lastName": "Taylor",
        "email": "reynoldsmatthew@yahoo.com",
        "password": "2Y$3!CIyznqU",
        "age": 54
      },
      {
        "firstName": "David",
        "lastName": "Coxik",
        "email": "nlarson@thompson.com",
        "password": "3)+hXDl0YC_3",
        "age": 37
      },
      {
        "firstName": "Andrew",
        "lastName": "Adams",
        "email": "lopezrobert@gmail.com",
        "password": "(eF#1&L_7)Ea",
        "age": 46
      },
      {
        "firstName": "John",
        "lastName": "Bartlett",
        "email": "obrooks@yahoo.com",
        "password": "#1YJQutgOY%f",
        "age": 93
      },
      {
        "firstName": "Beverly",
        "lastName": "Hanson",
        "email": "plopez@gmail.com",
        "password": "0f56FzTu6#R0",
        "age": 61
      },
      {
        "firstName": "Lisa",
        "lastName": "Clark",
        "email": "robinkennedy@gmail.com",
        "password": "5S**eIk^_5O^",
        "age": 90
      }
];

async function seedUsers() {
  try {
    await mongoose.connect(`${config.mongoDB.url}/express_test_app_db`);
    console.log('Connected to MongoDB');

    // await UserModel.deleteMany({});

    for (const user of users) {
      const newUser = new UserModel(user);
      await newUser.save();
    }

    console.log('Successfully seeded users.');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedUsers();