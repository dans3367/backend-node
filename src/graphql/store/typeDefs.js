export const StoreTypeDefs = `#graphql
    
    scalar JSON
    
    type Store {
        _id:String!
        name: String!
    }
    
    
    input AddStoreInput {
        name: String!
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
    
    type StoreEdge {
        cursor: String!
        node: Store!
    }

    type StoreConnection {
        data: [StoreEdge]!
        pageInfo: PageInfo!
    }
    
    type Response {
        success: Boolean!
        message: String
        store: Store
    }

    type RResponse {
        success: Boolean!
        message: String
    }

    input UpdateStoreInput {
        name: String 
    }
    
    type Query {
        stores: [Store]
        storeList(search: String, page: Int!, perPage: Int!, v: Int!): StoreConnection!
        getStoreById(storeId: String!): Store
    }

    type Mutation {
        addStore(data: AddStoreInput!): Store!
        updateStore(_id: ID!, input: UpdateStoreInput!): Response!
        deleteStore(_id: ID!): RResponse!
    }
    
    scalar Date

`;