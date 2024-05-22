import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  customerid: {
    type: String,
   
  },
  coname: {
    type: String,
   
  },
  name: {
    type: String,
   
  },
  surname: {
    type: String,
   
  },
  shattention: {
    type: String,
    default: ''
  },
  shname: {
    type: String,
    default: ''
  },
  shadd: {
    type: String,
   
  },
  shadd1: {
    type: String,
    default: ''
  },
  shadd2: {
    type: String,
    default: ''
  },
  shsub: {
    type: String,
    default: ''
  },
  shpcode: {
    type: Number,
   
  },
  shstate: {
    type: String,
   
  },
  branchcode: {
    type: Number,
    default: 0
  },
  salelocation: {
    type: String,
    default: ''
  },
  saledate_rep_: {
    type: String,
   
  },
  salesrep: {
    type: String,
    default: ''
  },
  internalref: {
    type: String,
    default: ''
  },
  promotype: {
    type: String,
    default: ''
  },
  invoice: {
    type: Number,
    default: 0
  },
  mob: {
    type: String,
    default: ''
  },
  imei: {
    type: String,
    default: ''
  },
  orderref: {
    type: String,
    default: ''
  },
  connectref: {
    type: String,
    default: ''
  },
  accbarcode: {
    type: String,
    default: ''
  },
  accdesc: {
    type: String,
    default: ''
  },
  amt_rec: {
    type: Number,
    default: 0
  },
  purchprice: {
    type: Number,
    default: 0
  },
  saleprice: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  plancat: {
    type: String,
    default: ''
  },
  plantype: {
    type: String,
    default: ''
  },
  carrier: {
    type: String,
    default: ''
  },
  contractends_rep_: {
    type: String,
    default: 0
  },
  contractperiod: {
    type: Number,
    default: 0
  },
  phonetype: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  code: {
    type: Number,
    default: 0
  },
  stockgst: {
    type: Number,
    default: 0
  },
  salestax: {
    type: Number,
    default: 0
  },
  lastupdated: {
    type: String,
    default: ""
  },
  category: {
    type: String,
    default: ''
  },
  mastercategory: {
    type: String,
    default: ''
  },
  refundinvoice: {
    type: String,
    default: ''
  },
  refundrefcode: {
    type: String,
    default: ''
  },
  rebate: {
    type: Number,
    default: 0
  },
  rebaterecamt: {
    type: Number,
    default: 0
  },
  rebatedate: {
    type: String,
    default: ""
  },
  commission: {
    type: Number,
    default: 0
  },
  commrecamt: {
    type: Number,
    default: 0
  },
  commdate: {
    type: String,
    default: ""
  },
  bonus1: {
    type: Number,
    default: 0
  },
  bonusrecamt1: {
    type: Number,
    default: 0
  },
  bonus1receivedate: {
    type: String,
    default: ""
  },
  bonus2: {
    type: Number,
    default: 0
  },
  bonusrecamt2: {
    type: Number,
    default: 0
  },
  bonus2receivedate: {
    type: String,
    default: 0
  },
  repcommamt: {
    type: Number,
    default: 0
  },
  reppayamt: {
    type: Number,
    default: 0
  },
  paiddate: {
    type: String,
    default: ""
  },
  adddeddesc1: {
    type: String,
    default: ''
  },
  adddedamt1: {
    type: Number,
    default: 0
  },
  adddeddate1exp: {
    type: String,
    default: ''
  },
  adddedrecamt1: {
    type: Number,
    default: 0
  },
  adddeddate1: {
    type: String,
    default: ""
  },
  adddeddesc2: {
    type: String,
    default: ''
  },
  adddedamt2: {
    type: Number,
    default: 0
  },
  adddeddate2exp: {
    type: String,
    default: ''
  },
  adddedrecamt2: {
    type: Number,
    default: 0
  },
  adddeddate2: {
    type: String,
    default: ""
  },
  adddeddesc3: {
    type: String,
    default: ''
  },
  adddedamt3: {
    type: Number,
    default: 0
  },
  adddeddate3exp: {
    type: String,
    default: ''
  },
  adddedrecamt3: {
    type: Number,
    default: 0
  },
  adddeddate3: {
    type: String,
    default: ""
  },
  activedate: {
    type: String,
    default: ""
  },
  reconciliationnotes: {
    type: String,
    default: ''
  },
  productcommpercentage: {
    type: Number,
    default: 0
  }
}, { timestamps: true, versionKey: false });

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
