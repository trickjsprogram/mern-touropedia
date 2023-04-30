import UserModal from "../models/user.js";
import mongoose from "mongoose";

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await UserModal.findById(id);
    res.status(200).json(profile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, occupation, imageFile, mobile, address } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const updatedProfile = {
      name,
      occupation,
      imageFile,
      mobile,
      address,
      _id: id,
    };
    await UserModal.findByIdAndUpdate(id, updatedProfile, { new: true });
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
