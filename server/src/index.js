const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require("../serviceAccountKey.json"); // Path to your Firebase service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bookingapp-4d565.firebaseio.com", // Replace with your Firebase project URL
});

// Firebase Firestore instance
const db = admin.firestore();

// Routes
app.get("/appointments", async (req, res) => {
  try {
    const snapshot = await db.collection("appointments").get();
    const appointments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

app.post("/appointments", async (req, res) => {
  try {
    const { doctor, name, date } = req.body;

    const appointment = {
      doctor,
      name,
      date,
    };

    if (!name && !doctor && !date) {
      return res.status(400).json({ error: "Whole field is required" });
    }

    const docRef = await db.collection("appointments").add(appointment);
    const newAppointment = { id: docRef.id, ...appointment };
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
