const client = require("../client");

module.exports = {
    getAllCollectibles,
    getCollectibleById,
    getCollectiblesByConsole,
    createCollectibleListing,
    deleteCollectiblesListing,
    updateCollectiblesListing
};
async function getAllCollectibles() {
   try {
    const { rows: collectibles } = await client.query(`
        SELECT * FROM collectibles;
    `);

    return collectibles;
    
    } catch (error) {
    throw error;
   }
};

async function getCollectibleById(collectibleId) {
    try {
        const { rows: [collectibles] } = await client.query(`
            SELECT * FROM collectibles
            WHERE "collectibleId"=$1;
        `, [collectibleId]);

        if (!collectibles) {
            return undefined
        };

        return collectibles;
    } catch (error) {
        throw error;
    }
};

async function getCollectiblesByConsole(console) {
    try {
        const { rows: [collectibles] } = await client.query(`
            SELECT * FROM collectibles
            WHERE console=$1;
        `, [console]);

        if (!collectibles) {
            return undefined;
        }

        return collectibles;
    } catch (error) {
        throw error;
    }
};

async function createCollectibleListing({ title, description, console, price, image }) {
    try {
        const { rows: [collectibles] } = await client.query(`
            INSERT INTO collectibles (title, description, console, price, image)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `, [title, description, console, price, image]);

        return collectibles;
    } catch (error) {
        throw error;
    }   
};

async function deleteCollectiblesListing(collectibleId) {
    try {
        const { rows: [collectibles] } = await client.query(`
            DELETE FROM collectibles
            WHERE "collectibleId"=$1
            RETURNING *; 
        `, [collectibleId]);
        
        return collectibles;
    } catch (error) {
        throw(error);
    }
}

async function updateCollectiblesListing(collectibleId, { title, description, console, price }) {
    try {
        const { rows: [collectibles] } = await client.query(`
            UPDATE collectibles
            SET title=$1, description=$2, console=$3, price=$4
            WHERE "collectibleId"=$5
            RETURNING *;
        `, [title, description, console, price, collectibleId]);

        return collectibles;
    } catch (error) {
        throw error;
    }
}   



