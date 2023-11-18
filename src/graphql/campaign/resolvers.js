import { campaign } from "../../models/campaign.js";

export const CampaignResolver = {
    Query: {
        campaigns: async () => await campaign.find(),
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

          //console.log('response',newCampaign)
    
          return newCampaign;
        },
    },


  };