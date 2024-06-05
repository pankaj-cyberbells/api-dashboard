import mongoose from "mongoose";

const npsSchema = mongoose.Schema(
  {
    salesrep: { type: String },
    salelocation: { type: String },
    NPSVol: { type: Number },
    NPSScore: { type: Number },
    adv10_9: { type: Number },
    pass8_7: { type: Number },
    detr_less_6: { type: Number },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

const NPS = mongoose.model("NPS", npsSchema);

export default NPS;
