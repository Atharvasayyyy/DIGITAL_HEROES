import User from "../models/userModel.js";

export const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const findUserById = async (id) => {
  return User.findById(id).select("-password");
};

export const fetchUsers = async () => {
  return User.find({}).select("-password");
};

export const updateUserById = async (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select("-password");
};

export const deleteUserById = async (id) => {
  return User.findByIdAndDelete(id);
};
