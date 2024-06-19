import mongoose from 'mongoose';

const targetSchema = mongoose.Schema({
  salelocation:{
    type:String,
    required:true
  },
  detr: {
    type: Number,
  },
  ppn: {
    type: Number,
  },
  bundel: {
    type: Number,
  },
  tmb: {
    type: Number,
  },
  tyro: {
    type: Number,
    
  },
  websitebas: {
    type: Number,
    
  },
  devicesecurity: {
    type: Number,
    
  },
  createdDate: { type: Date,  required: true },
}, { timestamps: true });

const Target = mongoose.model('Target', targetSchema);

export default Target;
