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
const Admin = ({ userData, games, consoles, collectibles, accessories }) => {
    // State to keep track of which action the admin wants to perform
    const [action, setAction] = React.useState(null);

    // State to keep track of which category the admin wants to perform the action on
    const [category, setCategory] = React.useState(null);

    // State to keep track of the listing ID for UPDATE and DELETE actions
    const [listingID, setListingID] = React.useState(null);

    // State to keep track of form data
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        console: "",
        year: "",
        price: ""
    });

    const handleActionSelect = (event) => {
        // Set the action state to the value of the selected option
        setAction(event.target.value);
    }

    const handleCategorySelect = (event) => {
        // Set the category state to the value of the selected option
        setCategory(event.target.value);
    }

    const handleListingID = (event) => {
        // Set the listingID state to the value of the selected option
        setListingID(event.target.value);
    }

    React.useEffect(() => {
        // No side-effect operations
        // This ensures the component is re-rendered when the category state is updated
    }, [category]);

    React.useEffect(() => {
        // No side-effect operations
        // This ensures the component is re-rendered when the action state is updated
    }, [action]);

    React.useEffect(() => {
        // No side-effect operations
    }, [listingID]);

    // Lookup table for admin actions
    const adminActions = {
        consoles: {
            POST: adminFn.fetchCreateConsoleListing,
            UPDATE: adminFn.fetchUpdateConsoleListing,
            DELETE: adminFn.fetchDeleteConsoleListing,
        },
        games: {
            POST: adminFn.fetchCreateGameListing,
            UPDATE: adminFn.fetchUpdateGameListing,
            DELETE: adminFn.fetchDeleteGameListing,
        },
        accessories: {
            POST: adminFn.fetchCreateAccessoryListing,
            UPDATE: adminFn.fetchUpdateAccessoryListing,
            DELETE: adminFn.fetchDeleteAccessoryListing,
        },
        collectibles: {
            POST: adminFn.fetchCreateCollectibleListing,
            UPDATE: adminFn.fetchUpdateCollectibleListing,
            DELETE: adminFn.fetchDeleteCollectibleListing,
        },
    };

    const handleFormChange = (event) => {
        // Update the form data state with the value of the input
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Perform the action based on the category/action selected
        const adminAction = adminActions[category][action];

        if (action === "UPDATE") {
            // if lookup is successful, and action is UPDATE, pass in the listingID
            adminAction(formData, listingID)
        } else if (action === "POST") {
            // if lookup is successful, and action is POST, do not pass in the listingID
            adminAction(formData);
        } else {
            // if lookup is successful, and action is DELETE, pass in the listingID
            adminAction(listingID);
        }

        // Reset the form data state
        setFormData({
            title: "",
            description: "",
            console: "",
            year: "",
            price: ""
        });
    }

    // If userData is not defined (no admin user logged in), return null for this component
    // if (!userData) return null;

    // If userData is defined, check if "admin" = true, if so, return the Admin component
    // if (userData.admin) {
        return (
            <div className='adminContainer'>
                <div className='adminCard'>
                    <form className='adminOptions'>
                        <label>
                            {/* This is a required dropdown to set which product to target */}
                            <h2>Select a category:</h2>
                            <select onChange={handleCategorySelect} required>
                                <option value=''>Select a category</option>
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
                                <option value=''>Select an action</option>
                                <option value='POST'>Add New</option>
                                <option value='UPDATE'>Edit Existing</option>
                                <option value='DELETE'>Delete Existing</option>
                            </select>
                        </label>
                    </form>
                    {action === 'UPDATE' || action === 'DELETE' ? (
                        <div>
                            <h2>Select a listing to {action}:</h2>
                            <select onChange={handleListingID}>
                                <option value=''>Select a listing</option>
                                {/* Depending on the category state, it could be any of four different arrays of objects, map the array of objects*/}
                                {category === 'consoles' ? consoles.map((console) => {
                                    return (
                                        <option value={console.consoleId}>{console.title}</option>
                                    )
                                }) : null}
                                {category === 'games' ? games.map((game) => {
                                    return (
                                        <option value={game.gameId}>{game.title}</option>
                                    )
                                }) : null}
                                {category === 'accessories' ? accessories.map((accessory) => {
                                    return (
                                        <option value={accessory.accessoryId}>{accessory.title}</option>
                                    )
                                }) : null}
                                {category === 'collectibles' ? collectibles.map((collectible) => {
                                    return (
                                        <option value={collectible.collectibleId}>{collectible.title}</option>
                                    )
                                }) : null}
                            </select>
                            {/* If the action is "DELETE", render the delete button */}
                            {action === 'DELETE' ? (
                                <button onClick={handleSubmit}>Delete</button>
                            ) : null}
                        </div>
                    ) : null}
                    {action === 'POST' || action === 'UPDATE' ? 
                    (<form className='adminForm'>
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
                        {category === 'collectibles' || category === 'accessories' ? null : (
                        <label>
                            Year:
                            <input type='text' name='year' value={formData.year} onChange={handleFormChange}/>
                        </label>)}
                        <label>
                            Price:
                            <input type='text' name='price' value={formData.price} onChange={handleFormChange}/>
                        </label>
                        <input type='submit' value='Submit' onClick={handleSubmit}/>
                    </form>) : null}
                </div>
            </div>
        )
    }
// }

export default Admin;