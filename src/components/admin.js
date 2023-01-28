import React from 'react';

// Admin.js is passed down userData from App.js
// This is to be used to check if "isAdmin" = true
const Admin = ({ userData }) => {

    // If userData is not defined (no user logged in), return null for this component
    if (!userData) return null;

    // If userData is defined, check if "isAdmin" = true, if so, return the Admin component
    if (userData.isAdmin) {
        return (
            <div>
                <h1>Admin Page</h1>
            </div>
        )
    }
}

export default Admin;