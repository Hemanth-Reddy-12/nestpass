import mongoose from "mongoose";

/** @type {mongoose.Schema} */
const venueSchema = new mongoose.Schema(
  {
    venueName: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
      maxlength: [100, "Venue name cannot exceed 100 characters"],
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      minlength: [10, "Address must be at least 10 characters"],
      maxlength: [200, "Address cannot exceed 200 characters"],
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
      maxlength: [50, "City cannot exceed 50 characters"],
      index: true, // ← Index for fast city searches
    },

    locationUrl: {
      type: String,
      required: [true, "Location URL is required"],
      trim: true,
      match: [
        /^https?:\/\/(www\.)?(google\.com\/maps|maps\.app\.goo\.gl|goo\.gl\/maps).+/,
        "Please provide a valid Google Maps URL",
      ],
    },

    type: {
      type: String,
      required: [true, "Venue type is required"],
      enum: {
        values: ["indoor", "outdoor", "hybrid"],
        message:
          "{VALUE} is not a valid venue type. Must be: indoor, outdoor, or hybrid",
      },
    },

    idealFor: {
      type: [String],
      required: [true, "Please specify what events this venue is ideal for"],
      enum: {
        values: [
          "conference",
          "workshop",
          "seminar",
          "wedding",
          "concert",
          "sports",
          "exhibition",
          "meetup",
          "party",
          "corporate-event",
        ],
        message: "{VALUE} is not a valid event type",
      },

      validate: {
        validator: function (arr: any) {
          return arr && arr.length > 0 && arr.length <= 5;
        },
        message: "Please select 1 to 5 event types",
      },
    },

    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
      max: [100000, "Capacity cannot exceed 100,000"],
    },

    images: {
      type: [String],
      validate: {
        validator: function (arr: any) {
          return arr.length >= 1 && arr.length <= 10;
        },
        message: "Please provide between 1 and 10 images",
      },
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
  }
);

/** @type {mongoose.Model} */
const venue = mongoose.model("Venue", venueSchema);

export default venue;
