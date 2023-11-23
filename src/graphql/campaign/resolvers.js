import connectDB from "../../config/db.js";
import { campaign } from "../../models/campaign.js";
import { validate } from "../../validation/campaign.js";

export const CampaignResolver = {
  Query: {

    campaignList: async (_, { search, page, perPage },payload) => {
      if(page == 0)
      {
        page = 1
      }
      const result = await campaign.paginate({ search }, page, perPage)
      return result;
    },

    getCampaignById: async (_, { campaignId }) => {

      return await campaign.findById(campaignId);

    },

    deleteCampaignById: async (_, { campaignId }) => {

      return await campaign.deleteById(campaignId);

    },
  },

  Mutation: {
    addCampaign: async (_, { data },payload) => {
      
      const errors = validate(data)

      if (errors) return null

     // console.log('payload',payload)

      const newCampaign = {
        company_id: payload.company_id,
        user_id: payload.user_id,
        name: data.name,
        title: data.title,
        description: data.description || null,
        effective_dates: {
          startDate: data.effective_dates.startDate,
          endDate: data.effective_dates.endDate,
        },
        delivery_method: {
          email: data.delivery_method.email || false,
          phone: data.delivery_method.phone || false,
        },
        stores: data.stores,
        tags: data.tags,
      };

      const response = await campaign.create(newCampaign);

      return newCampaign;
    },

    updateCampaign: async (_, { _id, input }) => {

      const errors = validate(input)

      if (errors) {
        return {
          success: false,
          message: 'Invalid Date provided',
          campaign: null
        };
      }

      const updateData = await campaign.findByIdAndUpdate(_id, input);

      console.log('updateData', updateData)

      return {
        success: true,
        message: 'Success',
        campaign: updateData
      };
    }
  },


};