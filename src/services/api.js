import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/accounts";

// Signup
export const signupUser = async (userData) => {
  const res = await axios.post(`${API_URL}/register/`, userData);
  return res.data;
};

// Login
export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login/`, userData);
  // Save tokens and user info to localStorage
  localStorage.setItem("access", res.data.access);
  localStorage.setItem("refresh", res.data.refresh);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data;
};

// Get logged-in user
export const getUser = async () => {
  const token = localStorage.getItem("access");
  if (!token) throw new Error("No token found");
  const res = await axios.get(`${API_URL}/me/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
};
