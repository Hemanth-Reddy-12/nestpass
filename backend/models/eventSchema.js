import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      enum: ["conference", "workshop", "seminar", "concert", "sports", "other"],
      required: [true, "Event category is required"],
    },
    startTime: {
      type: Date,
      required: [true, "Event start time is required"],
    },
    endTime: {
      type: Date,
      required: [true, "Event end time is required"],
      validate: {
        validator: function (value) {
          return value > this.startTime;
        },
        message: "End time must be after start time",
      },
    },
    registerationDeadline: {
      type: Date,
      required: [true, "Registration deadline is required"],
    },
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "venues",
      required: [true, "Venue ID is required"],
    },
    capacity: {
      type: Number,
      required: [true, "Event capacity is required"],
      min: 1,
    },
    availableTickets: {
      type: Number,
      required: [true, "Available tickets are required"],
    },
    ticketPrice: {
      type: Number,
      required: [true, "Ticket price is required"],
      min: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "draft",
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Organizer ID is required"],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("events", eventSchema);

export default Event;
