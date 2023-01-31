const client = require('../client');

module.exports = {
    getAllAccessories,
    getAccessoryById,
    getAccessoriesByConsole,
    createAccessoryListing,
    deleteAccessoryListing,
    updateAccessoryListing
};


async function getAllAccessories() {
    const { rows: accessories } = await client.query(`
        SELECT * FROM accessories;
    `);

    return accessories;
}


async function getAccessoryById(accessoryId) {
    try {
        const { rows: [accessory] } = await client.query(`
            SELECT * FROM accessories
            WHERE "accessoryId"=$1;
        `, [accessoryId]);

        if (!accessory) {
            throw {
                name: 'ErrorAccessoryNotFound',
                message: 'Could not find an accessory by that accessoryId'
            };
        }

        return accessory;
    } catch (error) {
        throw error;
    }
}


async function getAccessoriesByConsole(console) {
    try {
        const { rows: [accessories] } = await client.query(`
            SELECT * FROM accessories
            WHERE console=$1;
        `, [console]);

        if (!accessories) {
            throw {
                name: 'ErrorAccessoriesNotFound',
                message: 'Could not find any accessories by that console'
            };
        }

        return accessories;
    } catch (error) {
        throw error;
    }
}


async function createAccessoryListing({ title, description, console, price }) {
    try {
        const { rows: [accessory] } = await client.query(`
            INSERT INTO accessories(title, description, console, price)
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [title, description, console, price]);

        return accessory;
    } catch (error) {
        throw error;
    }   
}


async function updateAccessoryListing(accessoryId, { title, description, console, price }) {
    try {
        const { rows: [accessory] } = await client.query(`
            UPDATE accessories
            SET title=$1, description=$2, console=$3, price=$4
            WHERE "accessoryId"=$5
            RETURNING *;
        `, [title, description, console, price, accessoryId]);

        return accessory;
    } catch (error) {
        throw error;
    }
}   


async function deleteAccessoryListing(accessoryId) {
    try {
        const { rows: [accessory] } = await client.query(`
            DELETE FROM accessories
            WHERE "accessoryId"=$1
            RETURNING *;
        `, [accessoryId]);

        return accessory;
    } catch (error) {
        throw error;
    }
}