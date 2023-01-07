// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserByUsername,
  getUserById
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
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM users;
      `
    )
    
    rows.forEach(user => delete user.password)
    return rows;

  } catch (error) {
    console.log("Could not get all users.")
    throw error;
  }
}

async function getUserByUsername(name) { 
  try {
    const { rows: [user] } = await client.query(
      `
        SELECT *
        FROM users
        WHERE user=$1;
      `, [user]
    )

    delete user.password;
    return user;

  } catch (error) {
    console.log("Could not get user by name.");
    throw error;
  }
}

async function getUserById(id) {
  try {
    const { rows: [user] } = await client.query(
      `
        SELECT *
        FROM users
        WHERE id=$1;
      `, [id]
    )

    delete user.password;
    return user;

  } catch (error) {
    console.log("Could not get user by id.");
    throw error;
  }
}
