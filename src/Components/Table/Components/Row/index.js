import React from 'react';

const Row = ({ children, onClick }) => {
    return (
        <tr style={{ cursor: 'pointer' }} onClick={onClick} >
            {children}
        </tr>
    )
}

export default Row;