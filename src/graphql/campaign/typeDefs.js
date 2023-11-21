export const CampaignTypeDefs = `#graphql
    
    
    type EffectiveDates {
        startDate: Date!
        endDate: Date!
    }
    
    type DeliveryMethod {
        email: Boolean
        phone: Boolean
    }
    
    type Campaign {
        id: ID
        name: String!
        title: String!
        description: String
        effective_dates: EffectiveDates!
        delivery_method: DeliveryMethod!
        stores: [String!]!
        tags: [String!]!
    }
    
    input EffectiveDatesInput {
        startDate: String!
        endDate: String!
    }
    
    input DeliveryMethodInput {
        email: Boolean
        phone: Boolean
    }

    input AddCampaignInput {
        name: String!
        title: String!
        description: String
        effective_dates: EffectiveDatesInput!
        delivery_method: DeliveryMethodInput!
        stores: [String!]!
        tags: [String!]!
    }

    type Query {
        campaigns: [Campaign]
        getCampagin(id: ID): Campaign 
    }
    
    type Mutation {
        addCampaign(data: AddCampaignInput!): Campaign!
        deleteCampaign(id: ID): String
        updateCampaign(id: ID, data: AddCampaignInput): Campaign
    }
    
    scalar Date

`;
