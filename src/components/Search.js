import React, { useRef } from "react";

const Search = ({ data , setFilteredData }) => {
    const [search, setSearch] = React.useState("");

    
    const [lastSearch, setLastSearch] = React.useState("");

    
    const [hasResults, setHasResults] = React.useState(false);

    
    const timeoutRef = useRef(null);

    const handleSearch = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

       
        timeoutRef.current = setTimeout(() => {  
            const filteredData = data.filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredData(filteredData);
            setLastSearch(search);
            setHasResults(filteredData.length > 0);
        }, 500);
    }

    return (
        <div className="search">
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
            {lastSearch && <h2>{hasResults ? `Showing results for '${lastSearch}'` : `No search results for '${lastSearch}'`}</h2>}
        </div>
    );
}

export default Search;