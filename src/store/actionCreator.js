import { actionTypes, actionCreator } from './';
import axios from 'axios';
import { fromJS } from 'immutable';
//fromJS(res.data)

export const setItemNumber = (key) => ({
  type: actionTypes.ITEM_NUMBER,
  value:key,
});

export const setLogin = (key) => ({
  type: actionTypes.LOGIN,
  value:key,
});

export const setFile = (key) => ({
  type: actionTypes.FILE,
  value:key,
});

export const setShowFile = (key) => ({
  type: actionTypes.SHOWFILE,
  value:key,
});

export const setShowTask = (key) => ({
  type:actionTypes.SHOWTASK,
  value: key,
})

export const setChangePeople = (key) => ({
  type:actionTypes.CHANGEPEOPLE,
  value: key,
})

export const setTaskStation = (key) => ({
  type:actionTypes.TASKSTATION,
  value: key,
})

export const setTaskData = (key) => ({
  type:actionTypes.TASKDATA,
  value: key
})

export const setPeopleInfo = (key) => ({
  type:actionTypes.PEOPLEINFO,
  value: key
})

export const setDemandSmall = (key) => ({
  type:actionTypes.DEMANDSMALL,
  value: key
})

export const setPeopleSmall = (key) => ({
  type:actionTypes.PEOPLESMALL,
  value: key
})

export const setNotice = (key) => ({
  type:actionTypes.NOTICE,
  value: key
})

export const setNewNotice = (key) => ({
  type:actionTypes.NEWNOTICE,
  value: key
})

export const setPersonal = (key) => ({
  type:actionTypes.PERSONAL,
  value: key
})

export const setTeamInfo = (key) => ({
  type:actionTypes.TEAMINFO,
  value:key
})

export const setSecondLogin = (key) => ({
  type:actionTypes.SECONDLOGIN,
  value:key
})

export const setLoginValue = (key) => ({
  type:actionTypes.LOGINVALUE,
  value:key
})

export const setLoginVisible = (key) => ({
  type:actionTypes.LOGINVISIBLE,
  value:key
})

export const setTeacherItem = (key) => ({
  type:actionTypes.TEACHERITEM,
  value:key
})

export const setTeacherGroup = (key) => ({
  type:actionTypes.TEACHERGROUP,
  value:key
})

export const setTeacherNotice = (key) => ({
  type:actionTypes.TEACHERNOTICE,
  value:key
})

export const setTeacherNewNotice = (key) => ({
  type:actionTypes.TEACHERNEWNOTICE,
  value:key
})

export const setLoginRole = (key) => ({
  type:actionTypes.LOGINROLE,
  value:key
})


export const setTeacherToStudent = (key) => ({
  type:actionTypes.TEACHERTOSTUDENT,
  value:key
})


export const setTeacherId = (key) => ({
  type:actionTypes.TEACHERID,
  value:key
})




