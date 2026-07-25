import { listUsers, getUser, modifyUser, removeUser } from "../services/userService.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await listUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await modifyUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await removeUser(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
