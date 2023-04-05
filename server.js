import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const yelpApiKey = process.env.YELP_API_KEY;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/search", async (req, res) => {
  const apiKey = yelpApiKey;
  const radius = req.query.radius;
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const limit = req.query.limit;

  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}&radius=${radius}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
