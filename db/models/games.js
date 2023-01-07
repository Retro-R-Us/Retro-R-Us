const client = require('../client');

module.exports = {
    // add your database adapter fns here
    getAllGames
};

// get all games
async function getAllGames() {
    const { rows: [games] } = await client.query(`
        SELECT * FROM games;
    `);

    return games;
}
