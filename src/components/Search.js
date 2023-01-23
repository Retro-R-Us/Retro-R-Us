import React from "react";

const Search = () => {
    const [search, setSearch] = React.useState("");

    return (
        <div>
            <input type="text" placeholder="Search..." />
            <button>Search</button>
        </div>
    );
}

export default Search;