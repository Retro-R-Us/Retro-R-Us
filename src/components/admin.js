import React from 'react';
import * as adminFn from '../api/admin';




const Admin = ({ userData, games, consoles, collectibles, accessories }) => {
    
    const [action, setAction] = React.useState(null);

    
    const [category, setCategory] = React.useState(null);

   
    const [listingID, setListingID] = React.useState(null);

    
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        console: "",
        year: "",
        price: ""
    });

    const handleActionSelect = (event) => {
        setAction(event.target.value);
    }

    const handleCategorySelect = (event) => {
        setCategory(event.target.value);
    }

    const handleListingID = (event) => {
        setListingID(event.target.value);
    }

    React.useEffect(() => { 
    }, [category]);

    React.useEffect(() => { 
    }, [action]);

    React.useEffect(() => {
    }, [listingID]);

   
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
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        
        const adminAction = adminActions[category][action];

        if (action === "UPDATE") {
           
            adminAction(formData, listingID)
        } else if (action === "POST") {
            
            adminAction(formData);
        } else {
            
            adminAction(listingID);
        }

        
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
                        
                        {category === 'consoles' ? null : (
                        <label>
                            Console:
                            <input type='text' name='console' value={formData.console} onChange={handleFormChange}/>
                        </label>)}
                        
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