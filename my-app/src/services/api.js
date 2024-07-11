import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = async (credentials) => {
  const { data } = await axios.get(`${API_URL}/users`);
  return data.find(user => user.email === credentials.email && user.password === credentials.password);
};

export const getAppointments = async () => {
  const { data } = await axios.get(`${API_URL}/appointments`);
  return data;
};

export const getAppointment = async (id) => {
  const { data } = await axios.get(`${API_URL}/appointments/${id}`);
  return data;
};

export const saveAppointment = async (appointment) => {
  if (appointment.id) {
    await axios.put(`${API_URL}/appointments/${appointment.id}`, appointment);
  } else {
    await axios.post(`${API_URL}/appointments`, appointment);
  }
};

export const deleteAppointment = async (id) => {
  await axios.delete(`${API_URL}/appointments/${id}`);
};

export const getDiseases = async () => {
  const { data } = await axios.get(`${API_URL}/diseases`);
  return data;
};
