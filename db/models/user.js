// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt');
const SALT = 10;

module.exports = {
  getAllUsers,
  createUser,
  getUserByUsername,
  getUserById,
  newPassword,
  userLogin,
  getPass
};

async function createUser(userData) {
  const { username, email } = userData;
  const hashedPassword = await bcrypt.hash(userData.password, SALT);
  if (!userData.admin) {
    userData.admin = false;
  }
  try {
    const { rows: [user] } = await client.query(
      `
        INSERT INTO users (username, password, email, admin)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `, [username, hashedPassword, email, userData.admin]
    );

    if (!user) {
      return {
        Success: false,
        Message: "That user already exists! You can login instead"
      }
    } else {
        return {
          Success: true,
          Message: "User registration successful!"
        }
      }
  } catch (error) {
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

    if (user === undefined) {
      return {
        Success: false,
        Message: "User does not exist"
      }
    } else {
      delete user.password;
      return {
        Success: true,
        userData: user
      };
    }

    

  } catch (error) {
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
    throw error;
  }
}

async function getPass (username, password) {
  try {
    const { rows: [user] } = await client.query(
      `
        SELECT *
        FROM users
        WHERE username=$1;
      `,[username]
    )
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      const invalid = new Error('Old password is incorrect.')
      return {
        Success: false,
        Message: invalid
      }
    } else {
      return {
        Success: true
      }
    }

  } catch (error) {
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
    const isValid = await bcrypt.compare(oldPassword, user.password);
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
    throw error
  }
}


