import {modelSchema} from "./model.js";

// campaign schema into mongodb 
export const campaign = modelSchema("Campaign",{
    name: {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        default:null
    },
    effective_dates:{
        startDate:{
            type: Date,
            required: true
        },
        endDate:{
            type: Date,
            required: true
        }
    },
    delivery_method:{
        email:{
            type:Boolean,
            default:false
        },
        phone:{
            type:Boolean,
            default:false
        }  
    },
    stores:{
        type: Array,
        required:true
    },
    tags:{
        type: Array,
        required:true
    }
});