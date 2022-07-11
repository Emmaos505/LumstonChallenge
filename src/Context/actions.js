import {
    LOADING_CURRENT_WEATHER,
    LOADING_EXTENDED_WEATHER,
    LOADING_USERS,
    LOADING_USER_SELECTED,
    USER_DETAILS
} from "./types";

export const selectAUser = (singleFullName) => {
    return {
        type: USER_DETAILS,
        payload: singleFullName
    }
};

export const loadingUsers = () => {
    return {
        type: LOADING_USERS
    }
};

export const loadingUserSelected = () => {
    return {
        type: LOADING_USER_SELECTED
    }
};

export const loadingCurrentWeather = () => {
    return {
        type: LOADING_CURRENT_WEATHER
    }
};

export const loadingExtendedWeather = () => {
    return {
        type: LOADING_EXTENDED_WEATHER
    }
};