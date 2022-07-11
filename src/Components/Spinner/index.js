import React from 'react';
import { Spinner, Container } from 'reactstrap';
import './spinner.css';

const SpinnerComponent = ({ color }) => {
    return (
        <div className='spinnerContainer' >
            <Spinner color={color} />
        </div>
    )
}

export default SpinnerComponent