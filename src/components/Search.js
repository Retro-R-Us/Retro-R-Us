import React from "react";

const Search = ({ data , setFilteredData }) => {
    const [search, setSearch] = React.useState("");

    // This is the last search state, which is used to render the last search in the h2 'Showing results for...'
    const [lastSearch, setLastSearch] = React.useState("");

    // This is the timeout state, which is used to delay the search
    const [timeout, setTimeout] = React.useState(null);

    // When the user types in the input, handleSearchInput is called by onChange
    const handleSearchInput = (event) => {
        // Sets the search state to the value of the input
        setSearch(event.target.value);

        // If there is a timeout, clear it
        if (timeout) {
            clearTimeout(timeout);
        }

        // Set a new timeout, which calls handleSearch after 500ms
        // This is debouncing, which means the search is only called after the user has finished typing for 500ms
        setTimeout(setTimeout(() => {
            handleSearch();
            setLastSearch(search);
        }, 500));
    }

    const handleSearch = () => {
        // This filters the data, converts both the data and search to lowercase, and then checks if the data includes the search
        const filteredData = data.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredData(filteredData);
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search..." 
                value={search}
                onChange={handleSearchInput}
            />
            <button onClick={handleSearch}>Search</button>
            {lastSearch && <h2>Showing results for '{lastSearch}'</h2>}
        </div>
    );
}

export default Search;