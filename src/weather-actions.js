export const addLocation = id => {
    return {
        type: 'ADD_LOCATION',
        payload: id
    }
}

export const updateLocations = (locations) => {
    return {
        type: 'UPDATE_LOCATIONS',
        payload: locations
    }
}

export const removeLocation = id => {
    return {
        type: 'REMOVE_LOCATION',
        payload: id
    }
}