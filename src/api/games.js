import BASEURL from './index';

export const fetchAllGames = async () => {
    try {
        const response = await fetch(`${BASEURL}/games`, {
            headers: {
                'Content-Type': 'application/json'
                }
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occured while attempting to fetch games:", error);
    }
}

export const fetchGameById = async (gameId) => {
    try {
        const response = await fetch(`${BASEURL}/games/${gameId}`, {
            headers: {
                'Content-Type': 'application/json'
                }
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occured while attempting to fetch game by ID:", error);
    }
}

export const fetchGamesByConsole = async (console) => {
    try {
        const response = await fetch(`${BASEURL}/games/console/${console}`, {
            headers: {
                'Content-Type': 'application/json'
                }
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occured while attempting to fetch games by console:", error);
    }
}

export const fetchGamesByYear = async (year) => {
    try {
        const response = await fetch(`${BASEURL}/games/year/${year}`, {
            headers: {
                'Content-Type': 'application/json'
                }
            });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occured while attempting to fetch games by year:", error);
    }
}