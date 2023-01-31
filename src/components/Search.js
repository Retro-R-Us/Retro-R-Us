import React, { useRef } from "react";

const Search = ({ data , setFilteredData }) => {
    const [search, setSearch] = React.useState("");

    // This is the last search state, which is used to render the last search in the h2 'Showing results for...'
    const [lastSearch, setLastSearch] = React.useState("");

    // This is used to check if there are any results, which is used to render the h2 'No results found'
    const [hasResults, setHasResults] = React.useState(false);

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
            setHasResults(filteredData.length > 0);
        }, 500);
    }

    return (
        <div className="ui left icon input search">
            <input 
                type="text" 
                placeholder="Search..." 
                required
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
                
            />
            <i class="search icon"></i>
            <button onClick={handleSearch}>
                <i class="arrow circle right icon"></i>
            </button>
            {lastSearch && <h2>{hasResults ? `Showing results for '${lastSearch}'` : `No search results for '${lastSearch}'`}</h2>}
        </div>
    );
}

export default Search;