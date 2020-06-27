
export function services(state = [], action) {
  switch (action.type) {
    case 'ADD_SERVICE':
      return [...state, action.service];
    case 'UPDATE_SERVICE':
      return state.map((service, i) => {
        if (action.index !== i) return service;
        console.log('Updating', i, 'to', action.service);
        return {...service, ...action.service};
      });
    case 'REMOVE_SERVICE':
      return state.filter((service, i) => i !== action.index);
    default:
      return state;
  }
}