import { combineReducers } from 'redux';
import home from './home';
import dashboard from './dashboard';

const rootReducer = combineReducers({
  home,
  dashboard,
});

export default rootReducer;
