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
    const { doctor, name, date, time } = req.body;

    const appointment = {
      doctor,
      name,
      date,
      time,
    };

    const docRef = await db.collection("appointments").add(appointment);
    const newAppointment = { id: docRef.id, ...appointment };

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Failed to create appointment" });
  }
});

app.get("/appointments/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointmentDoc = await db
      .collection("appointments")
      .doc(appointmentId)
      .get();

    if (!appointmentDoc.exists) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const appointmentData = appointmentDoc.data();
    res.json({ id: appointmentId, ...appointmentData });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
});

// Update an appointment
app.put("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor, name, date, time } = req.body;

    const appointmentRef = db.collection("appointments").doc(id);
    const snapshot = await appointmentRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const updatedAppointment = {
      doctor,
      name,
      date,
      time,
    };

    await appointmentRef.update(updatedAppointment);

    res.json({ id, ...updatedAppointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Failed to update appointment" });
  }
});

// Delete an appointment
app.delete("/appointments/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const appointmentRef = db.collection("appointments").doc(id);
    const snapshot = await appointmentRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    await appointmentRef.delete();

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ error: "Failed to delete appointment" });
  }
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
