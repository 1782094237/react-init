import { actionTypes } from './';
import { fromJS } from 'immutable';


const defaultState = fromJS({
  itemNumber:0
})

export default (state = defaultState, action) => {
  switch(action.type){
    case actionTypes.ITEM_NUMBER:
      return state.set("itemNumber",action.value);
  }
  return state;
}