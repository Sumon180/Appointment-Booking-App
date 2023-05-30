import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

interface Appointment {
  doctor: Doctor;
  name: string;
  date: string;
}

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch appointments");
  }
};

export const createAppointment = async (data: Appointment) => {
  try {
    await axios.post(`${API_BASE_URL}/appointments`, data);
  } catch (error) {
    throw new Error("Failed to create appointment");
  }
};
