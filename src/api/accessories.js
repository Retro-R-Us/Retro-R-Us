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