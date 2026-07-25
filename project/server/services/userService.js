import bcrypt from "bcrypt";
import {
  fetchUsers,
  findUserById,
  updateUserById,
  deleteUserById,
} from "../repositories/userRepository.js";

export const listUsers = async () => {
  return fetchUsers();
};

export const getUser = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
};

export const modifyUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  const user = await updateUserById(id, data);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
};

export const removeUser = async (id) => {
  const user = await deleteUserById(id);

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
};
