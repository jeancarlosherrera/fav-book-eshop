import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bookRoutes from './routes/bookRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import books from './data/books.js';

// import users from './data/users.js';
// import User from './models/userModel.js';
// import Book from './models/bookModel.js';
// import Order from './models/orderModel.js';

dotenv.config()

// MongoDB Connection
connectDB().catch((err) => console.log(err))
async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB Connected')
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

const app = express()
app.use(express.json())

// Routes
app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

// Error Handlers
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `)
})
