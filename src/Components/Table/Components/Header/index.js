import React from 'react'
import FieldIndicator from '../FieldIndicator'
import Row from '../Row'

const Header = () => {
    return (
        <thead>
            <Row>
                <FieldIndicator type='column' content='#' />
                <FieldIndicator type='column' content='Name' />
                <FieldIndicator type='column' content='Last Name' />
            </Row>
        </thead>
    )
}

export default Header