const express = require("express");
const {
  createRequest,
  getRequests,
  getRequest,
  deleteRequest,
  updateRequest,
} = require("../controllers/requestController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

// GET all Requests
router.get("/", getRequests);

//GET a single Request
router.get("/:id", getRequest);

// POST a new Request
router.post("/", createRequest);

// DELETE a Request
router.delete("/:id", deleteRequest);

// UPDATE a Request
router.patch("/:id", updateRequest);

module.exports = router;
