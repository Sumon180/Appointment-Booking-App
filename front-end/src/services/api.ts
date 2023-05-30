import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch appointments");
  }
};

export const createAppointment = async (data: {
  doctor: doctor.name;
  name: string;
  date: string;
}) => {
  try {
    await axios.post(`${API_BASE_URL}/appointments`, data);
  } catch (error) {
    throw new Error("Failed to create appointment");
  }
};
