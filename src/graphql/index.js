import { CampaignResolver } from "./campaign/resolvers.js"
import { CampaignTypeDefs } from "./campaign/typeDefs.js"
import { FormResolver } from "./form/resolvers.js"
import { FormTypeDefs } from "./form/typeDefs.js"
import { StoreResolver } from "./store/resolvers.js"
import { StoreTypeDefs } from "./store/typeDefs.js"


export const typeDefs = [
    CampaignTypeDefs,
    FormTypeDefs,
    StoreTypeDefs

]

export const resolvers = [
    CampaignResolver,
    FormResolver,
    StoreResolver
]