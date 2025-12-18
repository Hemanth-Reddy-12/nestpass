import { getUsername } from "../middleware/jwt.middleware.js";
import EventSchema from "../models/eventSchema.js";
import userSchema from "../models/userSchema.js";

export const getEvents = async (req, res) => {
  try {
    const events = await EventSchema.find();
    res.json({
      status: 200,
      message: "Events fetched successfully",
      data: events,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error",
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const newEvent = req.body;
    const addEvent = await EventSchema(newEvent);
    addEvent.save();
    res.json({
      status: 200,
      message: "Event added successfully",
      data: req.body,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error",
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const update = req.body;
    const updateEvent = await EventSchema.findByIdAndUpdate(eventId, update);
    res.json({
      status: 200,
      message: "Event updated successfully",
      data: updateEvent,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error",
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await EventSchema.findById(eventId);
    res.json({
      status: 200,
      message: "Event fetched successfully",
      data: event,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error",
    });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const username = getUsername(req);

    const organizer = await userSchema
      .findOne({
        username: username,
      })
      .select("_id");
    console.log(organizer._id);

    const myEvents = await EventSchema.find({ organizer: organizer._id });
    res.json({
      status: 200,
      message: "My events fetched successfully",
      data: myEvents,
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error" + error,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    await EventSchema.findByIdAndDelete(eventId);
    res.json({
      status: 200,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.json({
      status: 500,
      message: "Server Error",
    });
  }
};

export const updateEventStatus = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { status } = req.body;
    const updateStatus = await EventSchema.findByIdAndUpdate(eventId, {
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
      message: "Server Error",
    });
  }
};
