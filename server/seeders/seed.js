const faker = require('faker');

const db = require('../config/connection');
const { User } = require('../models/User');
const { job } = require('../models/job');

db.once('open', async () => {
  await job.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);


  // create jobss
  let createdjobs = [];
  for (let i = 0; i < 100; i += 1) {
    const jobText = faker.lorem.words(Math.round(Math.random() * 10) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdjob = await job.create({ jobText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { jobs: createdjob._id } }
    );

    createdjobs.push(createdjob);
  }

  console.log('all done!');
  process.exit(0);
})

.catch(error => {
  console.error(error);
});