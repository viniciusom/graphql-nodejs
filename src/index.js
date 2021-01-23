const { ApolloServer, gql } = require('apollo-server');

// Toda request é POST
// Toda request bate no mesmo MESMO endpoint (/graphql)

// Query => Obter informações (GET)
// Mutation => Manipular dados (POST, PUT, PATCH, DELETE)
// Scalar types => String, Int, Boolean, Float, ID

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }
  
  type Post {
    _id: ID!
    title: String!
    email: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const users = [
  { _id: String(Math.random()), name: 'Vinicius', email: 'viniciusom01@hotmail.com', active: true },
  { _id: String(Math.random()), name: 'Manoel', email: 'manoelsilva@hotmail.com', active: false },
  { _id: String(Math.random()), name: 'José', email: 'josealberto@hotmail.com', active: true },
]


const resolvers = {
  Query: {
    hello: () => 'Hello world',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find((user) => user.email === args.email);
    }
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name, 
        email: args.email,
        active: true,
      };
      users.push(newUser);
      return newUser;
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`Server started at: ${url}`));