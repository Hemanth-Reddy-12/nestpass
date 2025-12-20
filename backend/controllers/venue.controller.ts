import { Request, Response } from "express";
import venueSchema from "../models/venue.model.js";

export const getVenues = async (req: Request, res: Response) => {
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
      error: error,
    });
  }
};

export const addVenue = async (req: Request, res: Response) => {
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
      error: error,
    });
  }
};

export const getVenuesById = async (req: Request, res: Response) => {
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
      error: error,
    });
  }
};

export const updateVenue = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const reqBody = req.body;
    const updateVenue = await venueSchema.findByIdAndUpdate(id, { reqBody });
    if (!updateVenue) {
      return res.json({
        status: 404,
        message: "venue not found",
      });
    }
    res.json({
      status: 200,
      message: "update venue successfully",
      data: updateVenue,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error update venue",
      error: error,
    });
  }
};
