import React, { useState, useContext } from 'react'
import { loadingUserSelected, selectAUser } from '../../../../Context/actions';
import { DataContext } from '../../../../Context/data-context';
import Modal from '../../../Modal';
import SpinnerComponent from '../../../Spinner';
import Cell from '../Cell';
import FieldIndicator from '../FieldIndicator';
import Row from '../Row';

const Body = () => {

    const [isOpen, setIsOpen] = useState(false);
    const dataUsers = useContext(DataContext) || {};
    const { users = [], loadingUsers = false, dispatch = null } = dataUsers;
   
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const getUserDetails = (singleFullName) => {
        if (dispatch) {
            dispatch(loadingUserSelected());
            dispatch(selectAUser(singleFullName));
        };
        toggle();
    };

    if (loadingUsers) return (
        <SpinnerComponent />
    )

    return (
        <tbody>
            {users && !!users.length && users.map((user, index) => {
                const { name, Apellido } = user;
                return (
                    <Row key={index} onClick={() => getUserDetails({ name, Apellido })} >
                        <FieldIndicator type='row' content={`${index + 1}`} />
                        <Cell content={name} />
                        <Cell content={Apellido} />
                    </Row>
                )
            })}
            <Modal isOpen={isOpen} handleClick={toggle} />
        </tbody>
    )
}

export default Body;




