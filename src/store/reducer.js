import { actionTypes } from './';
import { fromJS } from 'immutable';


const defaultState = fromJS({
  itemNumber:0,
  login:0,
  file:{},
  showFile:{}
})

export default (state = defaultState, action) => {
  switch(action.type){
    case actionTypes.ITEM_NUMBER:
      return state.set("itemNumber",action.value);

    case actionTypes.LOGIN:
      return state.set("login",action.value);

    case actionTypes.FILE:
      return state.set("file",action.value);

    case actionTypes.SHOWFILE:
        return state.set("showFile",action.value);
  }
  return state;
}