import BASEURL from "./index";

export const fetchAllCollectibles = async () => {
    try {
      const response = await fetch(`${BASEURL}/collectibles`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await response.json();
      return results;
    } catch (error) {
      console.error("An error occured while attempting to fetch collectibles", error);
    }
  };
