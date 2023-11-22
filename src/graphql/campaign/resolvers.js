import connectDB from "../../config/db.js";
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

<<<<<<< HEAD
          //console.log('response',newCampaign)
    
          return newCampaign;
=======
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
>>>>>>> ImranDev
        },

        updateCampaign: async (_, { _id, input }) => {
          
          const errors = validate(input)

<<<<<<< HEAD
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
=======
      return newCampaign;
>>>>>>> ImranDev
    },


  };