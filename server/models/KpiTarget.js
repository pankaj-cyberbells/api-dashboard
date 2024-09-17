import mongoose from "mongoose";

const kpiSchema = mongoose.Schema(
  {
    
    salelocation: { type: String,  required: true  },
    KPIPPN: { type: Number },
    KPIBundle: { type: Number },
    KPITMB:{ type: Number },
   KPITWD: { type: Number },
   KPIDPC: { type: Number },
    KPIACCGP: { type: Number },
    KPIMAIN:{type:Number},
    NPSVoltarget: { type: Number, default: 6 },
    NPSScoreTarget: { type: Number, default: 75 },
    GPCommissionPercentage: { type: Number, default: 7 },
    NPSMultiplierTargetAchiever: { type: Number, default: 1.5 },
    NPSMultiplierNotAchievedTarget: { type: Number, default: 0.5 },
    createdDate: { type: Date,  required: true },
    updatedBy: { type: String ,  required: true },
  },
  { timestamps: true }
);

const KPI = mongoose.model("KPITarget", kpiSchema);

export default KPI;
