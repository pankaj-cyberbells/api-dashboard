import { handleCreate } from "../utils/crudHelpers/Create.js";
import { handleUpdate } from "../utils/crudHelpers/Update.js";
import { handleDelete } from "../utils/crudHelpers/Delete.js";
import NPS from "../models/nps.js";


export const createNPS = async (req, res) => {
  const creatableData = { ...req.body };

  try {
    const storedNPS = await handleCreate(
      NPS,
      {
        salesrep: { $regex: new RegExp(req.body.salesrep, 'i') },
        salelocation: { $regex: new RegExp(req.body.storeLocation, 'i') }
      },
      creatableData
    );
    return res.status(201).json({
      NPS: storedNPS,
      message: `new NPS created for ${req.body.salelocation}`,
    });
  } catch (error) {
    if (error.message === "matched") {
      return res
        .status(409)
        .json({ message: "NPS already exists, may be with same store name" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const updateNPS = async (req, res) => {
  const { id } = req.params;
  try {
    const updatableData = { ...req.body };
    const storedNPS = await handleUpdate(NPS, { _id: id }, updatableData);

    return res.status(200).json({ NPS: storedNPS });
  } catch (error) {
    return res.status(501).json({ message: "something went wrong" });
  }
};


export const deleteNPS = async (req, res) => {
  const { id } = req.params;
  try {
    await handleDelete(NPS, { _id: id });
  } catch (error) {
    return res.status(501).json({ message: "something went wrong" });
  }
};

export const getNPS = async (req, res) => {
  try {
    const storedNPS = await NPS.findOne( {
      salesrep: { $regex: new RegExp(req.query.salesrep, 'i') },
      salelocation: { $regex: new RegExp(req.query.storeLocation, 'i') }
    },);
  
    return res.status(200).json({ NPS: storedNPS });
  } catch (error) {
    if (error.message === "Not Found") {
      return res
        .status(404)
        .json({ message: "No NPS found for this store." });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getAllNPS = async (req, res) => {
  try {
    const storedNPS = await NPS.find();
  
    return res.status(200).json({ NPSs: storedNPS });
  } catch (error) {
    if (error.message === "Not Found") {
      return res
        .status(404)
        .json({ message: "No NPS found for this user." });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
