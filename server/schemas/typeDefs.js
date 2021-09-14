const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    jobCount: Int
    savedJobs: [Job]
  }
  type Job {
    _id: ID
    jobId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
 
  }
  input jobSaving {
    jobId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveJob( job: jobSaving): User
    removeJob (jobId: String!): User
  }
`;

module.exports = typeDefs;