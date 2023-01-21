import BASEURL from './index';

export const fetchAllGames = async () => {
    try {
        const response = await fetch(`${BASEURL}/games`, {
            method: 'GET',
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