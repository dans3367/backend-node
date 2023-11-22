import { campaign } from "../../models/campaign.js";
import { validate } from "../../validation/campaign.js";

export const CampaignResolver = {
<<<<<<< HEAD
  Query: {

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
=======
    Query: {
        campaigns: async () => await campaign.find(),
        getCampagin: async (_,{ id }, { prisma }, info) => {
          return await campaign.findById(id);
        }
    },

    Mutation: {
        addCampaign: async (root, args, { prisma }, info) => {
          const {data} = args;
          console.log('params',root, args, { prisma }, info)
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
          return newCampaign;
        },
        deleteCampaign: async (root, args, { prisma }, info) => {
          const { id } = args;
          await campaign.findByIdAndRemove(id);
          return "Campaign is removed";
        },
        updateCampaign: async (root, args, { prisma }, info) => {
          const {data} = args;
          const { id } = args;
          console.log('params',root, args, { prisma }, info)
          const campaignData = {
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

          const response = await campaign.findByIdAndUpdate(id, campaignData, {new: true});    
          return response;
        }
>>>>>>> feature_worktype
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