// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');
const SALT = 10;

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserByUsername,
  getUserById,
  newPassword,
  userLogin
};

async function createUser(userData) { 
  const { username, password, email, admin, adminPass } = userData;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT);
    const { rows: [user] } = await client.query(
      `
        INSERT INTO users (username, password, email, admin, "adminPass")
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username) DO NOTHING;
      `, [username, hashedPassword, email, admin, adminPass]
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

async function userLogin ({username, password}) {
  try {
    const { rows: [user] } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1; 
      `, [username]
    );
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      const invalid = new Error('Username or Password was incorrect.');
      return {
        Success: false,
        Message: invalid
      }
    } else {
      delete user.password;
      return {
        Success: true,
        Message: 'Login Successful',
        userdata: user
      };
    }
  } catch (error) {
    console.log("Could not get user data.");
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
    );
    
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
        WHERE username=$1;
      `, [name]
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

async function newPassword ({username, oldPassword, newPassword}) {
  const hashedPassword = await bcrypt.hash(newPassword, SALT);
  try {
    const { rows: [ user ] } = await client.query(
      `
        SELECT (password)
        FROM users
        WHERE username=$1;
      `, [username]
    );
    const isValid = await bcrypt.compare(user.password, oldPassword);
    if (!isValid) {
      const invalid = new Error('Old password is incorrect.')
      return {
        Success: false,
        Message: invalid
      }
    } else {
      await client.query(
        `
          UPDATE users
          SET password=$1
          WHERE username=$2;
        `, [hashedPassword, username]
      );

      return {
        Success: true,
        Message: 'User password updated successfully.'
      }
    }

  } catch (error) {
    console.log("Could not change the user's password.");
    throw error
  }
}


