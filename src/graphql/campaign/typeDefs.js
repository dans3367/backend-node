export const CampaignTypeDefs = `#graphql
    
    scalar JSON
    
    type EffectiveDates {
        startDate: Date!
        endDate: Date!
    }
    
    type DeliveryMethod {
        email: Boolean
        phone: Boolean
    }
    
    type Campaign {
        _id:String!
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

    type PageInfo {
        total: Int!
        perPage: Int!
        currentPage: Int!
        lastPage: Int!
        hasNextPage: Boolean!
        hasPreviousPage: Boolean!
        startCursor: String
        endCursor: String
    }
    
    type CampaignEdge {
        cursor: String!
        node: Campaign!
    }

    type CampaignConnection {
        data: [CampaignEdge]!
        pageInfo: PageInfo!
    }
    
    type Response {
        success: Boolean!
        message: String
        campaign: Campaign
    }

    type RResponse {
        success: Boolean!
        message: String
    }

    input UpdateCampaignInput {
        name: String 
        title: String
        description: String
        effective_dates: EffectiveDatesInput
        delivery_method: DeliveryMethodInput
        stores: [String]
        tags: [String]
    }
    
    type Query {
        campaigns: [Campaign]
        campaignList(search: String, page: Int!, perPage: Int!): CampaignConnection!
        getCampaignById(campaignId: String!): Campaign
        deleteCampaignById(campaignId: String!): RResponse!
    }

    type Mutation {
        addCampaign(data: AddCampaignInput!): Campaign!
        updateCampaign(_id: ID!, input: UpdateCampaignInput!): Response!
        deleteCampaign(_id: ID!): RResponse!
    }
    
    scalar Date

`;