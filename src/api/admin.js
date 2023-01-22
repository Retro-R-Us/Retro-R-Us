import BASEURL from "./index";

export const fetchCreateConsoleListing = async ({
  title,
  description,
  year,
  price,
}) => {
  try {
    const response = await fetch(`${BASEURL}/consoles`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        year: Number(year),
        price: Number(price),
      }),
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};
