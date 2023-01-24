import React, { useRef } from "react";

const Search = ({ data , setFilteredData }) => {
    const [search, setSearch] = React.useState("");

    // This is the last search state, which is used to render the last search in the h2 'Showing results for...'
    const [lastSearch, setLastSearch] = React.useState("");

    // This is used to store the current timeout, which is used to delay the search
    const timeoutRef = useRef(null);

    const handleSearch = () => {
        // If there is a timeout, clear it
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {  
            // This filters the data, converts both the data and search to lowercase, and then checks if the data includes the search
            const filteredData = data.filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredData(filteredData);
            setLastSearch(search);
        }, 500);
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search..." 
                required
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            />
            <button onClick={handleSearch}>Search</button>
            {lastSearch && <h2>Showing results for '{lastSearch}'</h2>}
        </div>
    );
}

export default Search;