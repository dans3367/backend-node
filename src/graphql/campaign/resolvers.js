import connectDB from "../../config/db.js";
import { campaign } from "../../models/campaign.js";
import { validate } from "../../validation/campaign.js";

export const CampaignResolver = {
  Query: {
    campaignList: async (_, { page, perPage }) => {
      return await campaign.paginate({}, page, perPage);
    },
  },

  Mutation: {
    addCampaign: async (_, { data }, payload) => {
      const errors = validate(data);

      if (errors) return null;

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

      return await campaign.deleteById(campaignId);
    },

    updateCampaign: async (_, { _id, input }) => {
      const errors = validate(input);

      // Add your logic for updating the campaign using _id and input

      return updatedCampaign; // You need to implement the logic for updatedCampaign
    },
  },
};