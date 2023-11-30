import { campaign } from "../../models/campaign.js";
import { validate } from "../../validation/campaign.js";

export const CampaignResolver = {
  Query: {

    campaigns: async () => await campaign.find(),
    campaignList: async (_, { search, page, perPage }) => {

      return await campaign.paginate({ search }, page, perPage);
    },

    getCampaignById: async (_, { campaignId }) => {
      return await campaign.findById(campaignId);
    },

    deleteCampaignById: async (_, { campaignId }) => {

      return await campaign.deleteById(campaignId);

    },
  },

  Mutation: {
    addCampaign: async (_, { data }) => {

      const errors = validate(data)

      if (errors) return null

      const newCampaign = {
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

      //console.log('response',newCampaign)

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