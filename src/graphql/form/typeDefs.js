export const FormTypeDefs = `#graphql
    
    scalar JSON
    
    type Form {
        _id:String!
        name: String!
    }
    
    
    input AddFormInput {
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
    
    type FormEdge {
        cursor: String!
        node: Form!
    }

    type FormConnection {
        data: [Form]!
        pageInfo: PageInfo!
    }
    
    type Response {
        success: Boolean!
        message: String
        form: Form
    }

    type RResponse {
        success: Boolean!
        message: String
    }

    input UpdateFormInput {
        name: String 
    }
    
    type Query {
        forms: [Form]
        formList(search: String, page: Int!, perPage: Int!): FormConnection!
        getFormById(formId: String!): Form
    }

    type Mutation {
        addForm(data: AddFormInput!): Form!
        updateForm(_id: ID!, input: UpdateFormInput!): Response!
        deleteForm(_id: ID!): RResponse!
    }
    
    scalar Date

`;