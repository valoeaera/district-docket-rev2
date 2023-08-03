import express from "express";
import cors from "cors";

import * as controller from "./src/controllers/index.js";

// Create a new Express app
const app = express();

// Enable middleware
app.use(cors());
app.use(express.json());

// Define a route to get data from Firebase
app.get("/", async (req, res) => {
  res.status(200).send("Working!");
});

app.post("/event/new", controller.createEvent);

// Start the Express server
const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
