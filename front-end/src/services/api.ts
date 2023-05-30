import axios from "axios";

const API_BASE_URL = "<YOUR_API_BASE_URL>";

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch appointments");
  }
};

export const createAppointment = async (data: { title: string }) => {
  try {
    await axios.post(`${API_BASE_URL}/appointments`, data);
  } catch (error) {
    throw new Error("Failed to create appointment");
  }
};
