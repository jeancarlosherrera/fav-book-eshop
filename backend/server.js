import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes.js';

// import users from './data/users.js';
// import User from './models/userModel.js';
// import Book from './models/bookModel.js';
// import Order from './models/orderModel.js';

dotenv.config();

// MongoDB Connection
connectDB().catch((err) => console.log(err));
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB Connected');
}

// Data Seeder
// const importData = async () => {
//   try {
//     await Order.deleteMany();
//     await Book.deleteMany();
//     await User.deleteMany();
//     const createdUsers = await User.insertMany(users);
//     const adminUser = createdUsers[0]._id;
//     const sampleBooks = books.map((book) => {
//       return { ...book, user: adminUser };
//     });
//     await Book.insertMany(sampleBooks);
//     console.log('Data Imported!');
//   } catch (error) {}
// };

// const destroyData = async () => {
//   try {
//     await Order.deleteMany();
//     await Book.deleteMany();
//     await User.deleteMany();
//     console.log('Data Destroyed!');
//   } catch (error) {}
// };

// importData();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} `
  );
});
