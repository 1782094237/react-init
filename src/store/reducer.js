import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../layout/store'

const reducer = combineReducers({
  header: headerReducer
});

export default reducer;