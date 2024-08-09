import mongoose from "mongoose";

const kpiSchema = mongoose.Schema(
  {
    
    salelocation: { type: String,  required: true  },
    KPIPPN: { type: Number },
    KPIBundle: { type: Number },
   KPITWD: { type: Number },
   KPIDPC: { type: Number },
    KPIACCGP: { type: Number },
    createdDate: { type: Date,  required: true },
    updatedBy: { type: String ,  required: true },
  },
  { timestamps: true }
);

const KPI = mongoose.model("KPITarget", kpiSchema);

export default KPI;
