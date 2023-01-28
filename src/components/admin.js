import React from 'react';

// Admin.js is passed down userData from App.js
// This is to be used to check if "isAdmin" = true
const Admin = ({ userData }) => {
    // State to keep track of which action the admin wants to perform
    const [action, setAction] = React.useState(null);

    // State to keep track of form data
    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        console: '',
        year: '',
        price: ''
    });

    // If userData is not defined (no user logged in), return null for this component
    if (!userData) return null;

    // If userData is defined, check if "isAdmin" = true, if so, return the Admin component
    if (userData.isAdmin) {
        return (
            <div className='adminContainer'>
                <div className='adminCard'>
                    <form>
                        <label>
                            <h2>Select an option:</h2>
                            <select>
                                <option value='POST'>Add New</option>
                                <option value='UPDATE'>Edit Existing</option>
                                <option value='DELETE'>Delete Existing</option>
                            </select>
                        </label>
                        <input type='submit' value='Submit' />
                    </form>
                </div>
            </div>
        )
    }
}

export default Admin;