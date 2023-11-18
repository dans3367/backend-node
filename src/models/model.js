import mongoose from "mongoose";

export const modelSchema = (model_name, fields) => {
    
    for(let key in fields){
        if(fields[key].type === 'ObjectId'){
            fields[key].type = mongoose.Schema.Types.ObjectId
        }
    }
    const model = mongoose.model(model_name, mongoose.Schema(fields, {versionKey: false}));

    return {
        findByIdAndUpdate: async (id, data) => {
            return await model.findByIdAndUpdate(id, data, {new: true})
        },
        find: (obj = {},hideColumns = {}) => {
            //hideColumns['password'] = 0
            //hideColumns['_id'] = 0
            return model.find(obj, hideColumns).exec();
        },
        create: async (data) => {
            return await model.create(data);
        },
        findByIdAndRemove: async (id) => {
            return await model.findByIdAndRemove(id);
        },
        findOne: async (obj,hideColumns = {}) =>{
            //hideColumns['_id'] = 0
            return await model.findOne(obj,hideColumns)
        }
    }
};