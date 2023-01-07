const client = require("./client");

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
        WHERE consoleId=$1;
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
            SELECT * from consoles
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




