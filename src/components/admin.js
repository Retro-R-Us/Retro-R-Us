import React from 'react';
import * as adminFn from '../api/admin';

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
    - The form will be dynamically rendered based on the category selected
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
    const [formData, setFormData] = React.useState({});

    const handleActionSelect = (event) => {
        // Set the action state to the value of the selected option
        setAction(event.target.value);
    }

    const handleCategorySelect = (event) => {
        // Set the category state to the value of the selected option
        setCategory(event.target.value);
    }

    const handleFormChange = (event) => {
        // If the category is "consoles", update the form data state with the value of the input
        if (category === "consoles") {
            setFormData({
                ...formData,
                title: event.target.value,
                description: event.target.value,
                year: event.target.value,
                price: event.target.value
            });
        // If the category is "collectible", update the form data state with the value of the input, and so on for each category
        } else if (category === "collectible") {
            setFormData({
                ...formData,
                title: event.target.value,
                description: event.target.value,
                console: event.target.value,
                price: event.target.value
            });
        } else if (category === "game") {
            setFormData({
                ...formData,
                title: event.target.value,
                description: event.target.value,
                console: event.target.value,
                year: event.target.value,
                price: event.target.value
            });
        } else if (category === "accessory") {
            setFormData({
                ...formData,
                title: event.target.value,
                description: event.target.value,
                console: event.target.value,
                price: event.target.value
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform the action based on the category/action selected
        switch (category) {
            case 'consoles':
                switch (action) {
                    case 'POST':
                        adminFn.fetchCreateConsoleListing(formData);
                        break;
                    case 'UPDATE':
                        adminFn.fetchUpdateConsoleListing(formData);
                        break;
                    case 'DELETE':
                        adminFn.fetchDeleteConsoleListing(formData);
                        break;
                    default:
                        break;
                }
                break;
            case 'games':
                switch (action) {
                    case 'POST':
                        adminFn.fetchCreateGameListing(formData);
                        break;
                    case 'UPDATE':
                        adminFn.fetchUpdateGameListing(formData);
                        break;
                    case 'DELETE':
                        adminFn.fetchDeleteGameListing(formData);
                        break;
                    default:
                        break;
                }
                break;
            case 'accessories':
                switch (action) {
                    case 'POST':
                        adminFn.fetchCreateAccessoryListing(formData);
                        break;
                    case 'UPDATE':
                        adminFn.fetchUpdateAccessoryListing(formData);
                        break;
                    case 'DELETE':
                        adminFn.fetchDeleteAccessoryListing(formData);
                        break;
                    default:
                        break;
                }
                break;
            case 'collectibles':
                switch (action) {
                    case 'POST':
                        adminFn.fetchCreateCollectibleListing(formData);
                        break;
                    case 'UPDATE':
                        adminFn.fetchUpdateCollectibleListing(formData);
                        break;
                    case 'DELETE':
                        adminFn.fetchDeleteCollectibleListing(formData);
                        break;
                    default:
                        break;
                }
                break;
            default:
                break; 
        }
    }

    // If userData is not defined (no admin user logged in), return null for this component
    if (!userData) return null;

    // If userData is defined, check if "admin" = true, if so, return the Admin component
    if (userData.admin) {
        return (
            <div className='adminContainer'>
                <div className='adminCard'>
                    <form>
                        <label>
                            {/* This is a required dropdown to set which product to target */}
                            <h2>Select a category:</h2>
                            <select onChange={handleCategorySelect} required>
                                <option value='consoles'>Consoles</option>
                                <option value='games'>Games</option>
                                <option value='accessories'>Accessories</option>
                                <option value='collectibles'>Collectibles</option>
                            </select>
                        </label>
                        <label>
                            {/* This is a required dropdown to set what action will be performed */}
                            <h2>Select an option:</h2>
                            <select onChange={handleActionSelect} required>
                                <option value='POST'>Add New</option>
                                <option value='UPDATE'>Edit Existing</option>
                                <option value='DELETE'>Delete Existing</option>
                            </select>
                        </label>
                        <form className='adminForm'>
                            <label>
                                Title:
                                <input type='text' name='title' value={formData.title} onChange={handleFormChange}/>
                            </label>
                            <label>
                                Description:
                                <input type='text' name='description' value={formData.description} onChange={handleFormChange}/>
                            </label>
                            {/* If the category is "consoles", do not render the console field */}
                            {category === 'consoles' ? null : (
                            <label>
                                Console:
                                <input type='text' name='console' value={formData.console} onChange={handleFormChange}/>
                            </label>)}
                            {/* If the category is "collectibles" or "accessories", do not render the year field */}
                            {category === 'collectibles' || 'accessories' ? 
                                null : (
                            <label>
                                Year:
                                <input type='text' name='year' value={formData.year} onChange={handleFormChange}/>
                            </label>)}
                            <label>
                                Price:
                                <input type='text' name='price' value={formData.price} onChange={handleFormChange}/>
                            </label>
                        </form>
                        <input type='submit' value='Submit' onClick={handleSubmit}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Admin;