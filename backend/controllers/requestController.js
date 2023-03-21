const Request = require("../models/requestModel");
const mongoose = require("mongoose");

// get all requests
const getRequests = async (req, res) => {
  const user_id = req.user._id;

  const requests = await Request.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(requests);
};

// get a single request
const getRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  const request = await Request.findById(id);

  if (!request) {
    return res.status(404).json({ error: "No such request" });
  }

  res.status(200).json(request);
};

// create new request
const createRequest = async (req, res) => {
  const { title, load, areas } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!areas) {
    emptyFields.push("areas");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const request = await Request.create({ title, load, areas, user_id });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a request
const deleteRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  const request = await Request.findOneAndDelete({ _id: id });

  if (!request) {
    return res.status(400).json({ error: "No such request" });
  }

  res.status(200).json(request);
};

// update a request
const updateRequest = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such request" });
  }

  const request = await Request.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!request) {
    return res.status(400).json({ error: "No such request" });
  }

  res.status(200).json(request);
};

module.exports = {
  getRequests,
  getRequest,
  createRequest,
  deleteRequest,
  updateRequest,
};
