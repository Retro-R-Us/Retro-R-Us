import BASEURL from "./index";

export const fetchAllAccessories = async () => {
    try {
        const response = await fetch(`${BASEURL}/accessories`, {
        headers: {
            "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occured while attempting to fetch accessories:", error);
    }
}

export const fetchAccessoryById = async (accessoryId) => {
    try {
        const response = await fetch(`${BASEURL}/accessories/${accessoryId}`, {
        headers: {
            "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occured while attempting to fetch accessory by ID:", error);
    }
}

export const fetchAccessoriesByConsole = async (console) => {
    try {
        const response = await fetch(`${BASEURL}/accessories/console/${console}`, {
        headers: {
            "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("An error occured while attempting to fetch accessories by console:", error);
    }
}