import React from 'react';

const FieldIndicator = ({ content, type }) => {
    return (
        <th scope={`${type === 'row' ? 'row' : ''}`} >
            {content}
        </th>
    )
}

export default FieldIndicator;