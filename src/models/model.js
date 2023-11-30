import mongoose from "mongoose";

export const modelSchema = (model_name, fields) => {

    for (let key in fields) {
        if (fields[key].type === 'ObjectId') {
            fields[key].type = mongoose.Schema.Types.ObjectId
        }
    }
    const model = mongoose.model(model_name, mongoose.Schema(fields, { versionKey: false,timestamps: true }));

    return {
        findById: async (id) => {
            return await model.findById(id)
        },
        findByIdAndUpdate: async (id, data) => {
            return await model.findByIdAndUpdate(id, data, { new: true })
        },
        find: (obj = {}, hideColumns = {}) => {
            //hideColumns['password'] = 0
            //hideColumns['_id'] = 0
            return model.find(obj, hideColumns).sort({ createdAt: -1 }).exec();
        },
        create: async (data) => {
            data['_id'] = new mongoose.Types.ObjectId();
            return await model.create(data);
        },
        findByIdAndRemove: async (id) => {
            return await model.findByIdAndDelete(id);
        },
        findOne: async (obj, hideColumns = {}) => {
            //hideColumns['_id'] = 0
            return await model.findOne(obj, hideColumns)
        },
        paginate: async (filter = {}, page = 1, perPage = 5) => {
            console.log('filter',filter)

            const conditions = [];
            let clause = {};
            if (filter?.search) {
                const regex = new RegExp(filter.search, 'i'); // Case-insensitive regex
                conditions.push({
                    $or: [
                        { name: { $regex: regex } },
                        { title: { $regex: regex } },
                        { description: { $regex: regex } },
                    ],
                });

                if (conditions.length > 0) {
                    clause = { $or: conditions }
                }
            }

            // Calculate skip and limit for pagination
            const skip = (page * 1 - 1) * perPage;
            const limit = perPage * 1;
            const query = await model.find(clause).sort({ createdAt: -1 }).skip(skip).limit(limit).exec();

            const total = await model.find(clause).countDocuments();

            if(query.length > 0)
            {
                total = await model.countDocuments();
                lastPage = Math.ceil(total / perPage);
            }

            const data = query
            //console.log('query',query)            
            const obj = {
                data: data,
                pageInfo: {
                    total,
                    perPage,
                    currentPage: page,
                    lastPage,
                    hasMorePages: page * perPage < total,
                },
            }
            console.log('obj',obj)
            return obj
        },
        findById: async (id) => {
            try {
                return await model.findById(id);
            } catch (e) {

            }

            return null
        },
        deleteById: async (id) => {
            
            const response = { 
                success:false,
                message: "Delete failed"
            }

            try {

                const result = await model.deleteOne({ _id: id });

                if (result.deletedCount === 0) {
                    throw new Error('Data not found');
                }

                response.message = 'Deleted successfully'
                response.success = true;
                
            } catch (e) {
                
                response.message = e.message;
                //console.log('Error deleting by ID:', message);
                
            }

            return response;
        }
    }
}