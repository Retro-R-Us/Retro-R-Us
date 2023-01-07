const client = require("./client");

module.exports = {
    getAllCollectibles,
    getCollectiblesById,
    getCollectiblesByConsole,
    createCollectibleListing,
};
async function getAllCollectibles() {
    const { rows: [collectibles] } = await client.query(`
        SELECT * FROM collectibles;
    `);

    return collectibles;
}