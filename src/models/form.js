import {modelSchema} from "./model.js";
import mongoose from "mongoose";

// form schema into mongodb 
export const form = modelSchema("Form",{
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