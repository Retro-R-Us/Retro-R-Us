import React from 'react';

const Consoles = ({ consoles }) => {
    return (
        <div className='consolesPage'>
        <div className='consolesContainer'>
            {consoles && consoles.map(console => {
                return (
                    <div className='consoleCard' key={console.consoleId}>
                        <h1>{console.title}</h1>
                        <h2>{console.description}</h2>
                        <h3>{console.year}</h3>
                        <h2>{console.price}</h2>
                    </div>
                );
            })}
        </div>
    </div>
    )
}

export default Consoles;