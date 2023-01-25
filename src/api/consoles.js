import BASEURL from "./index";

export const fetchAllConsoles = async () => {
  try {
    const response = await fetch(`${BASEURL}/consoles`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    console.error("An error occured while attempting to fetch consoles", error);
  }
};

export const fetchConsoleById = async (consoleId) => {
  try {
    const response = await fetch(`${BASEURL}/consoles/${consoleId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    console.error(
      "An error occured while attempting to fetch the console by ID",
      error
    );
  }
};

export const fetchConsolesByYear = async (year) => {
  try {
    const response = await fetch(`${BASEURL}/consoles/year/${year}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    console.error(
      "An error occured while attempting to fetch consoles by year",
      error
    );
  }
};
