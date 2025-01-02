import mongoose from "mongoose";
const detailsSchema = new mongoose.Schema(
  {
    // reservationDateTime: {
    //   type: Date,
    //   required: true,
    // },
    reservationDate: {
      type: Date,
      required: true,
    },
    reservationTime: {
      type: String,
      required: true,
      //   match: [
      //     /^(?:[01]\d|2[0-3]):[0-5]\d$/,
      //     "Please provide a valid time in HH:mm format",
      //   ],
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1, // Ensure at least one guest
    },
    user: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      contact: {
        phone: {
          type: String,
          required: true,
          //   match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"],
        },
        email: {
          type: String,
          required: true,
          match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },
      },
    },
  },
  { timestamps: true }
);
const Reservation = mongoose.model("details", detailsSchema);
export default Reservation;
