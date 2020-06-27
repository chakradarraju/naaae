import { combineReducers, createStore } from 'redux';
import * as reducers from './reducers';
import throttle from 'lodash.throttle';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    console.log('got serialized state', serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

const persistedState = loadState();
const store = createStore(
  combineReducers(reducers), persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  console.log('got update')
  saveState(store.getState());
  /*throttle(() => {
    console.log('saving state');
  }, 1000);*/
});

export default store;