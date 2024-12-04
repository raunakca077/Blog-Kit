import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoutes from './routes/auth.js';
import listingRoutes from './routes/listing.js';
import bookingRoutes from './routes/booking.js';
import userRoutes from './routes/user.js';

const app=express()

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.use("/auth", authRoutes)
app.use("/properties", listingRoutes)
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

dotenv.config()
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED")
  })
  .catch((err) => console.log(`${err} did not connect`));
app.listen(process.env.PORT,()=>console.log(`Running on ${process.env.PORT}`))