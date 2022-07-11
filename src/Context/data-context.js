import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { GET_CURRENT_WEATHER, GET_EXTENDED_WEATHER, GET_USERS } from './types';
import { loadingCurrentWeather, loadingExtendedWeather, loadingUsers } from './actions';
import { dataReducer, initialState } from './reducer';

const apiKey = process.env.REACT_APP_APIKEY;

export const DataContext = createContext(initialState);

export const DataContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dataReducer);
    const { userSelected = [] } = state || {};

    const getUsers = async () => {
        dispatch(loadingUsers());
        const keyName = 'usersInLocalStorage';
        const usersInLocalStorage = localStorage.getItem(keyName);
        if (usersInLocalStorage) {
            const data = JSON.parse(usersInLocalStorage);
            return dispatch({
                type: GET_USERS,
                payload: data
            });
        }
        try {
            const { data: { users } } = await axios.get('https://dev.vidanta-ws.lumstondev.com/userListExample');
            localStorage.setItem(keyName, JSON.stringify(users));
            return dispatch({
                type: GET_USERS,
                payload: users
            });
        } catch (error) {
            console.error('Error on users request', error);
        }
    };

    const getCurrentWeather = async (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=sp&units=metric`;
        const { data } = await axios.get(url);
        if (data) {
            return dispatch({
                type: GET_CURRENT_WEATHER,
                payload: data
            });
        }
    };

    const getExtendedWeather = async (lat, lon) => {
        const url = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${apiKey}&cnt=1&lang=sp&units=metric`;
        const { data } = await axios.get(url);
        if (data) {
            return dispatch({
                type: GET_EXTENDED_WEATHER,
                payload: data
            });
        }
    };

    const contextValue = {
        ...state,
        dispatch
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        const { lat = null, lon = null } = userSelected[0] || {};
        if (lat && lon) {
            try {
                dispatch(loadingCurrentWeather());
                dispatch(loadingExtendedWeather());
                getCurrentWeather(lat, lon);
                getExtendedWeather(lat, lon);
            } catch (error) {
                console.error('Error in weather request', error);
            }
        }
    }, [userSelected]);

    return (
        <DataContext.Provider value={state && contextValue}>
            {children}
        </DataContext.Provider>
    )
}