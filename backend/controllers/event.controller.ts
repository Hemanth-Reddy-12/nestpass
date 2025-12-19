import { Request, Response } from "express";
import { getLoggedUser } from "../middleware/jwt.middleware.js";
import eventSchema from "../models/event.model.js";
import userSchema from "../models/user.model.js";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await eventSchema.find({ status: "published" });
    res.json({
      status: 200,
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "server error",
      error: error,
    });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const newEvent = req.body;
    const addEvent = new eventSchema(newEvent);
    await addEvent.save();
    res.json({
      status: 200,
      message: "Event added successfully",
      data: req.body,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error create event",
      error: error,
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const update = req.body;
    const updateEvent = await eventSchema.findByIdAndUpdate(eventId, update);
    res.json({
      status: 200,
      message: "Event updated successfully",
      data: updateEvent,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error update event",
      error: error,
    });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const event = await eventSchema.findById(eventId);
    res.json({
      status: 200,
      message: "Event fetched successfully",
      data: event,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error get event by id",
      error: error,
    });
  }
};

export const getMyEvents = async (req: Request, res: Response) => {
  try {
    const loggedUser = getLoggedUser(req);

    const organizer = await userSchema.findOne(loggedUser._id).select("_id");
    if (!organizer) {
      return res.json({
        status: 404,
        message: "organizer not found",
      });
    }

    console.log(organizer._id);

    const myEvents = await eventSchema.find({ organizer: organizer._id });
    res.json({
      status: 200,
      message: "My events fetched successfully",
      data: myEvents,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error get my events",
      error: error,
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    await eventSchema.findByIdAndDelete(eventId);
    res.json({
      status: 200,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error delete event",
      error: error,
    });
  }
};

export const updateEventStatus = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const { status } = req.body;
    const updateStatus = await eventSchema.findByIdAndUpdate(eventId, {
      status: status,
    });
    res.json({
      status: 200,
      message: "Event status updated successfully",
      data: updateStatus,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error update event status",
      error: error,
    });
  }
};

export const searchEventByFilter = async (req: Request, res: Response) => {
  try {
    const filter = req.body;
    const events = await eventSchema.find(filter);
    const eventCount = await eventSchema.countDocuments(filter);
    res.json({
      status: 500,
      message: "search results ",
      count: eventCount,
      data: { events },
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "error search event by filter",
      error: error,
    });
  }
};
