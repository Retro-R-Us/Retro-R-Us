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
        "Content-type": "application/json",
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

export const fetchCreateCollectibleListing = async ({
  title,
  description,
  console,
  price,
}) => {
  try {
    const response = await fetch(`${BASEURL}/collectibles`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        console: console,
        price: Number(price),
      }),
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCreateGameListing = async ({
  title,
  description,
  console,
  year,
  price,
}) => {
  try {
    const response = await fetch(`${BASEURL}/games`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        console: console,
        year: Number(year),
        price: Number(price),
      }),
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
}

export const fetchCreateAccessoryListing = async ({
  title,
  description,
  console,
  price,
}) => {
  try {
    const response = await fetch(`${BASEURL}/accessories`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        console: console,
        price: Number(price),
      }),
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
}

export const fetchUpdateConsoleListing = async ({
  title,
  description,
  price,
}) => {
  try {
    const response = await fetch(`${BASEURL}/consoles/${consoleId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        price: Number(price),
      }),
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};


export const fetchUpdateCollectibleListing = async ({
  title,
  description,
  console,
  price,
}) => {
  try {
    const response = await fetch(`${BASEURL}/collectibles/${collectibleId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        console: console,
        price: Number(price),
      }),
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUpdateGameListing = async ({
  title,
  description,
  console,
  year,
  price,
}) => {
  try {
    const response = await fetch(`${BASEURL}/games/${gameId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        console: console,
        year: Number(year),
        price: Number(price),
      }),
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
}

export const fetchUpdateAccessoryListing = async ({
  title,
  description,
  console,
  price,
}) => {
  try {
    const response = await fetch(`${BASEURL}/accessories/${accessoryId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        console: console,
        price: Number(price),
      }),
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
}

export const fetchDeleteConsoleListing = async () => {
  try {
    const response = await fetch(`${BASEURL}/consoles/${consoleId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};


export const fetchDeleteCollectibleListing = async () => {
  try {
    const response = await fetch(`${BASEURL}/collectibles/${collectibleId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
};
