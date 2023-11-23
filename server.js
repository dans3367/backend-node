import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { config } from 'dotenv';
import { typeDefs,resolvers } from './src/graphql/index.js';
import connectDB from './src/config/db.js';
import { generateJWT, verifyJWT } from './src/helpers/jwt.js';
import authRouter from './src/controller/auth.js';
import { sendApiResponse } from './src/helpers/response.js';
import { GraphQLError } from 'graphql';



// for env file
config();


const app = express();

//connectDB();

let count = 0;




const httpServer = http.createServer(app);

// GraphQL apollo server initialize
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  //plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


await server.start()

const check = (req,res,next)=>{

  if(req?.headers?.authorization){
    const token = req?.headers?.authorization.replace('Bearer ', '') || '';
        const {payload} = verifyJWT(token);

        if(payload){
          req.headers['payload'] = payload;
          next()
          return;
        }
  }
  
  sendApiResponse(res,401,"Not accessible",{})

}

app.use(cors(),check);

app.use(
  '/api',
  express.json(),
  expressMiddleware(server, {
    context: ({ req }) => {
      const payload = req?.headers?.payload;
      if(payload){
        connectDB(payload.company_id);
        return payload 
      }

      throw new GraphQLError('User is not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      });

    }
  }),
);





// const jwt = generateJWT(payload);
// console.log(jwt);

// const r = verifyJWT(jwt)
// console.log(r);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: process.env.HOST_PORT }, resolve));
console.log(`Apollo server is listening at ${process.env.HOST_PORT} port`);
// app.listen(process.env.HOST_PORT,() => {

//   console.log(`Apollo server is listening at ${process.env.HOST_PORT} port`);

// })

