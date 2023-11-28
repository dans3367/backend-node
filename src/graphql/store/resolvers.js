import connectDB from "../../config/db.js";
import { store } from "../../models/store.js";
import { validate } from "../../validation/store.js";

export const StoreResolver = {
  Query: {
    stores: async () => await store.find(),
    storeList: async (_, { search, page, perPage }) => {
      return await store.paginate({ search }, page, perPage);
    },

    getStoreById: async (_, { storeId }) => {
      return await store.findById(storeId);

    }
  },

  Mutation: {
    addStore: async (_, { data },payload) => {
      
      const errors = validate(data)

      if (errors) return null
      console.log('newStore', payload)
      const newStore = {
        company_id: payload.company_id,
        user_id: payload.user_id,
        name: data.name
      };

      const response = await store.create(newStore);

      return newStore;
    },

    deleteStore: async (_, { _id },payload) => {

      return await store.deleteById(_id);

    },
    
    updateStore: async (_, { _id, input }) => {

      const errors = validate(input)

      if (errors) {
        return {
          success: false,
          message: 'Invalid Input provided',
          store: null
        };
      }

      const updateData = await store.findByIdAndUpdate(_id, input);

      return {
        success: true,
        message: 'Success',
        store: updateData
      };
    }
  },


};