import React from "react";

const Search = ({ data , setFilteredData }) => {
    const [search, setSearch] = React.useState("");


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
                onChange={(event) => {
                    setSearch(event.target.value);
                }} 
            />
            <button onClick={handleSearch}>Search</button>
            {search && <h2>Showing results for '{search}'</h2>}
        </div>
    );
}

export default Search;