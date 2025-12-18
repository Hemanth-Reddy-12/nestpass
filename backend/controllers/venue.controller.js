import venueSchema from "../models/venueSchema.js";

export const getVenues = async (req, res) => {
  try {
    const venues = await venueSchema.find();
    res.json({
      status: 200,
      message: "Venues fetched successfully",
      data: venues,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error fetching venues",
      error: error.message,
    });
  }
};

export const addVenue = async (req, res) => {
  try {
    const newVenue = new venueSchema(req.body);
    await newVenue.save();
    res.json({
      status: 201,
      message: "Venue added successfully",
      data: newVenue,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error adding venue",
    });
  }
};

export const getVenuesById = async (req, res) => {
  try {
    const venueId = req.params.id;
    const venue = await venueSchema.findById(venueId);
    res.json({
      status: 200,
      message: "Venue fetched successfully",
      data: venue,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Error fetching venue",
    });
  }
};
