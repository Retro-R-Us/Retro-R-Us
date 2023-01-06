// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser
};

async function createUser(userData) { 
  const SALT = 10;
  const { username, password, email } = userData;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT);
    const { rows: [user] } = await client.query(
      `
        INSERT INTO users (username, password, email)
        VALUES ($1, $2, $3)
        ON CONFLICT (username, email) DO NOTHING
      `, [username, hashedPassword, email]
    );

    return {
      Success: true,
      Message: "User registration successful!"
    }
    
  } catch (error) {
    console.log("Could not create user.");
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
}
