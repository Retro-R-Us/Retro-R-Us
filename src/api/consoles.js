import BASEURL from ".";

export const getAllConsoles = async() => {
    try {
        const response = await fetch(`${BASEURL}/consoles`)
        const result = await response.json()
        console.log("results from consoles", result)
        return result
    } catch(error) {
        console.error(error)
    }
};