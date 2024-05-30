import bcrypt from "bcrypt";
import { handleCreate } from "../utils/crudHelpers/Create.js";
import Admin from "../models/admin.js";


export const createAdmin = async (req, res) => {
  const { password } = req.body;
  const enteredPassword = password;
  try {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(enteredPassword, salt);
    const creatableData = { ...req.body, password: encryptedPassword };
    const storedAdmin = await handleCreate(
      Admin,
      { email: req.body.email },
      creatableData
    );
    // const { password, ...adminDetails } = storedAdmin._doc;
    return res.status(201).json({ message: "admin created successfully"});
  } catch (error) {
    if (error.message === "matched") {
      return res.status(409).json({ message: "admin already exists" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};