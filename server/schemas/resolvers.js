const { AuthenticationError } = require('apollo-server-express');
const { User, Job } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    //creates new user in whatever is passed through args
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    saveJob: async (parent, args, context) => {
      if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              // $addToSet doesn't add the item if it already contains it
              //$push will add the given object to field whether it exists or not
              { $addToSet: { savedJobs: args.job } },
              { new: true }
          ).populate('savedJobs');

          return updatedUser;
      }

      throw new AuthenticationError('Need to be logged in to add a job to your list');
  },
  removeJob: async (parent, args, context) => {
      if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedJobs: { jobId: args.jobId } } },
              { new: true }
          ).populate('savedJobs');
          
          return updatedUser;
      }

      throw new AuthenticationError('Need to be logged in to add a job to your list');
  } 
}
};

module.exports = resolvers;