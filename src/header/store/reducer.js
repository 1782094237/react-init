import { actionTypes } from './';
import { fromJS } from 'immutable';


const defaultState = fromJS({
  personInfo:"1"
})

export default (state = defaultState, action) => {
  // switch(action.type){
  //   case actionTypes.PERSON_INFO :
  //     return state.set("personInfo",0)
  // }
  return state.set("personInfo",0)
}