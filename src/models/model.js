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
            hideColumns['password'] = 0
            hideColumns['_id'] = 0
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
        },
        paginate: async (filter = {}, page = 1, perPage = 5) => {
            
            // Calculate skip and limit for pagination
            const skip = (page*1 - 1) * perPage;
            const limit = perPage*1;

            const query = await model.find().skip(skip).limit(limit).exec();

            const total = await model.countDocuments();
            

            const obj = {
                data: query.map((q) => ({
                    cursor: q._id.toString(),
                    node: q,
                  })),
                pageInfo: {
                    total,
                    perPage,
                    currentPage: page,
                    lastPage: Math.ceil(total / perPage),
                    hasMorePages: page * perPage < total,
                },
            }

            console.log('dddd',obj)
            return obj
        }
    }
};