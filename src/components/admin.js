import React from 'react';
import adminFn from '../api/admin';

/* NOTE - Admin Tools Flow
    - Admin.js is passed down userData of logged in user from App.js
    - If userData is defined, check if "isAdmin" = true
    - If "isAdmin" = true, return the Admin component
    - Otherwise, return null for this component
    - Admin component has a form with 2 dropdowns
    - First dropdown is for selecting a category, and updating the state
        - The admin can select from "Consoles", "Games", "Accessories", or "Collectibles"
    - Second dropdown is for selecting an action, and updating the state
        - The admin can select from "Add New" AKA POST, "Edit Existing" AKA UPDATE, or "Delete Existing" AKA DELETE
    - Based on the category and action selected, the form will change
    - If the admin selects "Add New" for "Consoles", the form will have fields for "Title", "Description", "Console", "Year", and "Price"
    - If the admin selects "Edit Existing" for "Consoles", the form will have a dropdown for "Title", and fields for "Description", "Console", "Year", and "Price"
    - If the admin selects "Delete Existing" for "Consoles", the form will have a dropdown for "Title"
    - The form will have a submit button that will perform the action on the category selected

*/

// Admin.js is passed down userData from App.js
// This is to be used to check if "isAdmin" = true
const Admin = ({ userData }) => {
    // State to keep track of which action the admin wants to perform
    const [action, setAction] = React.useState(null);

    // State to keep track of which category the admin wants to perform the action on
    const [category, setCategory] = React.useState(null);

    // State to keep track of form data
    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        console: '',
        year: '',
        price: ''
    });

    const handleActionSelect = (event) => {
        // Set the action state to the value of the selected option
        setAction(event.target.value);
    }

    const handleCategorySelect = (event) => {
        // Set the category state to the value of the selected option
        setCategory(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        switch (action) {
            case 'POST':
                if(category === 'consoles') {
                    adminFn.fetchCreateConsoleListing(formData);
                } else if (category === 'games') {
                    adminFn.fetchCreateGameListing(formData);
                } else if (category === 'accessories') {
                    adminFn.fetchCreateAccessoryListing(formData);
                } else if (category === 'collectibles') {
                    adminFn.fetchCreateCollectibleListing(formData);
                }
                break;
            case 'UPDATE':
                if(category === 'consoles') {
                    adminFn.fetchUpdateConsoleListing(formData);
                } else if (category === 'games') {
                    adminFn.fetchUpdateGameListing(formData);
                } else if (category === 'accessories') {
                    adminFn.fetchUpdateAccessoryListing(formData);
                } else if (category === 'collectibles') {
                    adminFn.fetchUpdateCollectibleListing(formData);
                }
                break;
            case 'DELETE':
                if(category === 'consoles') {
                    // TODO - DELETE console
                } else if (category === 'games') {
                    // TODO - DELETE game
                } else if (category === 'accessories') {
                    // TODO - DELETE accessory
                } else if (category === 'collectibles') {
                    // TODO - DELETE collectible
                }
                break;
            default:
                break;
        }
    }

    // If userData is not defined (no user logged in), return null for this component
    if (!userData) return null;

    // If userData is defined, check if "isAdmin" = true, if so, return the Admin component
    if (userData.isAdmin) {
        return (
            <div className='adminContainer'>
                <div className='adminCard'>
                    <form>
                        <label>
                            <h2>Select a category:</h2>
                            <select onChange={handleCategorySelect}>
                                <option value='consoles'>Consoles</option>
                                <option value='games'>Games</option>
                                <option value='accessories'>Accessories</option>
                                <option value='collectibles'>Collectibles</option>
                            </select>
                        </label>
                        <label>
                            <h2>Select an option:</h2>
                            <select onChange={handleActionSelect}>
                                <option value='POST'>Add New</option>
                                <option value='UPDATE'>Edit Existing</option>
                                <option value='DELETE'>Delete Existing</option>
                            </select>
                        </label>
                        {/* TODO - FORM HERE */}
                        <input type='submit' value='Submit' />
                    </form>
                </div>
            </div>
        )
    }
}

export default Admin;