const client = require("../client");

module.exports = {
    getAllConsoles,
    getConsolesById,
    getConsolesByYear,
    createConsoleListing,
    deleteConsoleListing,
    updateConsoleListing
};

async function getAllConsoles() {
    try {
        const { rows: consoles } = await client.query(`
        SELECT * FROM consoles;
        `);
        return consoles;
    } catch(error) {
        throw error;
    }
};

async function getConsolesById(consoleId) {
    try {
        const {
            rows: [consoles],
        } = await client.query(`
        SELECT * FROM consoles
        WHERE "consoleId"=$1;
        `,
        [consoleId]
        );
        if (!consoles) {
            return undefined;
        }
        return consoles;
    }  catch(error) {
        throw error;
    }
};

async function getConsolesByYear(year) {
    try {
        const { rows: [consoles],
         } = await client.query(`
            SELECT * FROM consoles
            WHERE year=$1;
        `, [year]);

        if (!consoles) {
            return undefined;
        }

        return consoles;
    } catch (error) {
        throw error;
    }
};

async function createConsoleListing({ title, description, year, price, image }) {
    try {
        const { rows: [consoles] } = await client.query(`
            INSERT INTO consoles (title, description, year, price, image)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `, [title, description, year, price, image]);
 
        return consoles;
    } catch (error) {
        throw error;
    }
};

async function deleteConsoleListing(consoleId) {
    try {
        const { rows: [consoles] } = await client.query(`
            DELETE FROM consoles
            WHERE "consoleId"=$1
            RETURNING *; 
        `, [consoleId]);
        
        return consoles;
    } catch (error) {
        throw(error);
    }
}

async function updateConsoleListing(consoleId, { title, description, price }) {
    try {
        const { rows: [consoles] } = await client.query(`
            UPDATE consoles
            SET title=$1, description=$2, price=$3
            WHERE "consoleId"=$4
            RETURNING *;
        `, [title, description, price, consoleId]);

        return consoles;
    } catch (error) {
        throw error;
    }
}   




