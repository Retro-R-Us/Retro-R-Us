import BASEURL from ".";

export const userAction = async (username, password, action) => {
    try {
        const response = await fetch(`${BASEURL}/users/${action}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("There was an error registering the user", error);
    }
};

export const getCurrentUser = async (username, token) => {
    try {
        const response = await fetch(`${BASEURL}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                username: username,
            }),
        });

        const data = await response.json();
        return data;
    } catch {
        console.error("Could not retrieve user", error);
    }
};

export const updateUserPass = async (token, username, oldPass, newPass) => {
    try {
        const response = await fetch(`${BASEURL}/users/update`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                username: username,
                oldPassword: oldPass,
                newPassword: newPass
            }),
        });

        const data = await response.json();
        return data;
    } catch {
        console.error("Could not retrieve user", error);
    }
}
