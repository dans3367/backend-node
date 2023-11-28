import {modelSchema} from "./model.js";
import mongoose from "mongoose";

// store schema into mongodb 
export const store = modelSchema("Store",{
    _id:{
        type:mongoose.ObjectId,
        required:false,
    },
    company_id:{
        type:Number,
        required:true,
    },
    user_id:{
        type:Number,
        required:true,
    },
    name: {
        type: String,
        required: true
    }
});