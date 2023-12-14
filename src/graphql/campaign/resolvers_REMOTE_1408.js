import { campaign } from "../../models/campaign.js";

export const CampaignResolver = {
    Query: {
      campaigns: async () => await campaign.find(),
      getCampaignById: async (_, { campaignId }) => {
        return await campaign.findById(campaignId);
      },
        campaignList: async (_, { search, page, perPage, v }) => {

          return await campaign.paginate({ search }, page, perPage, v);
        },
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
    },


  };