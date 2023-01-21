import BASEURL from "./index";

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

export const createConsoleListing = async({title, description, year, price}) => {
    try {
        const response = await fetch(`${BASEURL}/consoles`, {
            method: "POST",
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                year: parseFloat(year),
                price: parseFloat(price)

            })
        })
        const result = await response.json()
        return result 
    } catch(error) {
        console.error(error)
    }
}