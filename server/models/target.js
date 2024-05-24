import mongoose from 'mongoose';

const targetSchema = mongoose.Schema({
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
    
  }
}, { timestamps: true });

const Target = mongoose.model('Target', targetSchema);

export default Target;
