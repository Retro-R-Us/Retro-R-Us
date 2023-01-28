import BASEURL from "./index";

export const userAction = async ({username, password, email, admin, action}) => {
    try {
        const response = await fetch(`${BASEURL}/user/${action}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                admin: admin
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getCurrentUser = async (token) => {
    try {
        const response = await fetch(`${BASEURL}/user/me`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const updateUserPass = async (token, username, oldPass, newPass) => {
    try {
        const response = await fetch(`${BASEURL}/user/update`, {
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
    } catch (error) {
        console.error(error);
    }
}

export const isAdmin = async (username) => {
    try {
        const response = await fetch(`${BASEURL}/user/update`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username
            }),
        });

        const data = await response.json();
        return data;
    } catch {
        console.error(error);
    }
}
