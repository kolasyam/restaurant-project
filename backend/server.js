import express from "express";
import dotenv from "dotenv";
// import path from "path";
import cors from "cors";

import { connectDB } from "./config/db.js";
import Reservation from "./models/details.model.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
// const __dirname = path.resolve();
app.use(express.json());
app.use(cors());
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/.next")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", ".next", "index.html"));
// });
// }
app.get("/", (req, res) => {
  console.log("Hello world");
  res.send("Hello world");
});
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Reservation.find({});
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.log("error in feteching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
app.post("/api/create", async (req, res) => {
  const details = req.body;
  if (
    !details.user.name ||
    !details.user.contact.phone ||
    !details.user.contact.email ||
    !details.reservationDate ||
    !details.reservationTime ||
    !details.numberOfGuests
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide name fields" });
  }
  try {
    const existingBooking = await Reservation.findOne({
      reservationDate: details.reservationDate,
      reservationTime: details.reservationTime,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Reservation for this time already exists",
      });
    }
    const newBooking = new Reservation(details);

    await newBooking.save();
    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    console.log("Error in Create Booking:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
app.delete("/api/booking/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error in deleting products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
// console.log(process.env.MONGO_URI);
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
// RcNNK7D2iSNVr31X
