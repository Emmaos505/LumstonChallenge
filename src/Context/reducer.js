import {
    GET_CURRENT_WEATHER,
    GET_EXTENDED_WEATHER,
    GET_USERS,
    LOADING_CURRENT_WEATHER,
    LOADING_EXTENDED_WEATHER,
    LOADING_USERS,
    LOADING_USER_SELECTED,
    USER_DETAILS
} from "./types";

export const initialState = {
    users: [],
    loadingUsers: false,
    userSelected: [],
    loadingUserSelected: false,
    currentWeatherData: null,
    extendedWeatherData: null,
    loadingCurrentWeatherData: false,
    loadingExtendedWeatherData: false,
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS: {
            return {
                ...state,
                users: action.payload,
                loadingUsers: false
            }
        }
        case USER_DETAILS: {
            const { payload: singleFullName } = action;
            const { name: payloadName, Apellido: payloadApellido } = singleFullName;
            const { users } = state;
            const selectUser = users.filter(user => {
                const { name: allUsersName, Apellido: allUsersApellido } = user
                if (allUsersName === payloadName && allUsersApellido === payloadApellido) return user;
            });
            
            return {
                ...state,
                userSelected: selectUser,
                loadingUserSelected: false
            }
        }
        case GET_CURRENT_WEATHER: {
            
            return {
                ...state,
                currentWeatherData: action.payload,
                loadingCurrentWeatherData: false
            }
        }
        case GET_EXTENDED_WEATHER: {
            
            return {
                ...state,
                extendedWeatherData: action.payload,
                loadingExtendedWeatherData: false
            }
        }
        case LOADING_USERS: {
            return {
                ...state,
                loadingUsers: true
            }
        }
        case LOADING_USER_SELECTED: {
            return {
                ...state,
                loadingUserSelected: true
            }
        }
        case LOADING_CURRENT_WEATHER: {
            return {
                ...state,
                loadingCurrentWeatherData: true
            }
        }
        case LOADING_EXTENDED_WEATHER: {
            return {
                ...state,
                loadingExtendedWeatherData: true
            }
        }
        default: {
            return state;
        }
    }
}