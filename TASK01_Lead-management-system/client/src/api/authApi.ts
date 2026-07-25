import api from "./axios";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/auth/users");
  return response.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: "admin" | "member";
}) => {
  const response = await api.post("/auth/users", data);
  return response.data;
};