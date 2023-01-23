import React from "react";

const Search = ({ data }) => {
    const [search, setSearch] = React.useState("");

    const handleSearch = () => {
        // This filters the data, converts both the data and search to lowercase, and then checks if the data includes the search
        const filteredData = data.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        }
    }

    return (
        <div>
            <input type="text" placeholder="Search..." />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search;