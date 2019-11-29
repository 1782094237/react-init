import { actionTypes, actionCreator } from './';
import { fromJS } from 'immutable';


const defaultState = fromJS({
  itemNumber:0,
  login:0,
  file:{},
  showFile:{},
  newTask:false,
  changePeople:false,
  taskStation:false,
  taskData:{},
  peopleInfo:{},
  demandSmall:{},
  peopleSmall:{},
  notice:{},
  newNotice:false,
  personal:{},
  teamInfo:{},
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

    case actionTypes.SHOWTASK:
        return state.set("newTask",action.value)
        
    case actionTypes.CHANGEPEOPLE:
        return state.set("changePeople",action.value)

    case actionTypes.TASKSTATION:
      return state.set("taskStation",action.value)

    case actionTypes.TASKDATA:
      return state.set("taskData",action.value)

    case actionTypes.PEOPLEINFO:
      return state.set("peopleInfo",action.value)

    case actionTypes.DEMANDSMALL:
      return state.set("demandSmall",action.value)

    case actionTypes.PEOPLESMALL:
      return state.set("peopleSmall",action.value)

    case actionTypes.NOTICE:
        return state.set("notice",action.value)

    case actionTypes.NEWNOTICE:
        return state.set("newNotice",action.value)

    case actionTypes.PERSONAL:
        return state.set("personal",action.value)

    case actionTypes.TEAMINFO:
        return state.set("teamInfo",action.value)

  }
  return state;
}