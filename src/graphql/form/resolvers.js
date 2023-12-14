import connectDB from "../../config/db.js";
import { form } from "../../models/form.js";
import { validate } from "../../validation/form.js";

export const FormResolver = {
  Query: {
    forms: async () => await form.find(),
    formList: async (_, { search, page, perPage, v }) => {
      return await form.paginate({ search }, page, perPage, v);
    },

    getFormById: async (_, { formId }) => {
      return await form.findById(formId);

    }
  },

  Mutation: {
    addForm: async (_, { data },payload) => {
      
      const errors = validate(data)

      if (errors) return null

      const newForm = {
        company_id: payload.company_id,
        user_id: payload.user_id,
        name: data.name
      };

      const response = await form.create(newForm);

      return newForm;
    },

    deleteForm: async (_, { _id },payload) => {

      return await form.deleteById(_id);

    },
    
    updateForm: async (_, { _id, input }) => {

      const errors = validate(input)

      if (errors) {
        return {
          success: false,
          message: 'Invalid Input provided',
          form: null
        };
      }

      const updateData = await form.findByIdAndUpdate(_id, input);

      return {
        success: true,
        message: 'Success',
        form: updateData
      };
    }
  },


};