import React from 'react';
import { Table } from 'reactstrap';
import Body from './Components/Body';
import Header from './Components/Header';

const TableComponent = () => {
    return (
        <Table
            hover
            responsive
            size="sm"
        >
            <Header />
            <Body />
        </Table>
    )
}

export default TableComponent;