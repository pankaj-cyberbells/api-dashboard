import { handleCreate } from "../utils/crudHelpers/Create.js";
import { handleUpdate } from "../utils/crudHelpers/Update.js";
import { handleDelete } from "../utils/crudHelpers/Delete.js";
import { handleGetAll } from "../utils/crudHelpers/Get.js";
import Target from "../models/target.js";

export const createTarget = async (req, res) => {
  const creatableData = { ...req.body };
  try {
    const storedTarget = await handleCreate(Target, null, creatableData);
    return res.status(201).json({ target: storedTarget });
  } catch (error) {
    if (error.message === "matched") {
      return res
        .status(409)
        .json({ message: "Matching Target already exists" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const updateTarget = async (req, res) => {
  const { id } = req.params;
  try {
    const updatableData = { ...req.body };
    const storedTarget = await handleUpdate(
      Target,
      { _id: id },
      updatableData
    );

    return res.status(200).json({ Target: storedTarget });
  } catch (error) {
    return res.status(501).json({ message: "something went wrong" });
  }
};

export const deleteTarget = async (req, res) => {
  const { id } = req.params;
  try {
    await handleDelete(Target, { _id: id });
  } catch (error) {
    return res.status(501).json({ message: "something went wrong" });
  }
};

export const getTargets = async (req, res) => {
  try {
    const storedtarget = await handleGetAll(Target);
    if (!storedtarget.length) {
      return res
        .status(404)
        .json({ message: "No target found for this user." });
    }
    return res.status(200).json({ target: storedtarget });
  } catch (error) {
    if (error.message === "Not Found") {
      return res
        .status(404)
        .json({ message: "No target found for this user." });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
