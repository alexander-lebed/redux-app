import uid from './helpers/id-generator';

export const addCity = (city) => {
    return {
        type: 'ADD_CITY',
        payload: {
            id: uid(),
            city
        }
    }
}

// export const updateCity = ()

export const removeCity = id => {
    return {
        type: 'REMOVE_CITY',
        payload: id
    }
}