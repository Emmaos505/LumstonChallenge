import React from 'react';
import { Container } from 'reactstrap';
import { DataContextProvider } from './Context/data-context';
import Table from './Components/Table';

const App = () => {
  return (
    <DataContextProvider>
      <Container>
        <Table />
      </Container>
    </DataContextProvider>
  )
}

export default App
