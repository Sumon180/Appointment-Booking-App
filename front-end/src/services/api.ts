import axios from "axios";
import { Appointment } from "../types";

const API_BASE_URL = "http://localhost:5000";

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
