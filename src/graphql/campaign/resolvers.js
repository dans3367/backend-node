import { campaign } from "../../models/campaign.js";
import { validate } from "../../validation/campaign.js";

export const CampaignResolver = {
    Query: {
        //campaigns: async () => await campaign.find(),
        campaignList: async (_, { page, perPage }) => {

          return await campaign.paginate({},page,perPage);

        }

        
    },

    Mutation: {
        addCampaign: async (root, args, { prisma }, info) => {
          const {data} = args;

          const errors = validate(data)

          if(errors) return {

          }
          
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

          if(errors){
              return {
                  success: false,
                  message: 'Invalid Date provided',
                  campaign: null
              };
          }

          const updateData = await campaign.findByIdAndUpdate(_id,input);
          
          console.log('updateData',updateData)

          return {
            success: true,
            message: 'Success',
            campaign: updateData
          };
        }
    },


  };