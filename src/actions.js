
export const addService = service => ({type: 'ADD_SERVICE', service});

export const updateService = (index, service) => ({type: 'UPDATE_SERVICE', index, service});

export const removeService = index => ({type: 'REMOVE_SERVICE', index});